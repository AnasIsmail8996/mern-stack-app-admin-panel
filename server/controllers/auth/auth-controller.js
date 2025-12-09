import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../../models/users.js";

// ================= REGISTER =================
const registerUser = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    // Validate request
    if (!userName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide username, email, and password",
      });
    }

    // Check if user already exists
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    // Hash password
    const hashPassword = await bcrypt.hash(password, 12);

    // Create new user
    const newUser = new User({
      userName,
      email,
      password: hashPassword,
    });

    await newUser.save();

    return res.status(201).json({
      success: true,
      message: "Registration successful",
      user: {
        id: newUser._id,
        userName: newUser.userName,
        email: newUser.email,
      },
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      success: false,
      message: "Server error during registration",
    });
  }
};

// ================= LOGIN =================
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate request
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Check if user exists
    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Compare password
    const comparePass = await bcrypt.compare(password, checkUser.password);
    if (!comparePass) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: checkUser._id, role: checkUser.role, email: checkUser.email, userName: checkUser.userName },
      process.env.SECRET_KEY,
      { expiresIn: "7d" }
    );

    // Send cookie + response
    res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60 * 1000, 
      })
      .json({
        success: true,
        message: "Login successful",
        user: {
          id: checkUser._id,
          userName: checkUser.userName,
          email: checkUser.email,
          role: checkUser.role,
        },
        token,
      });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      success: false,
      message: "Server error during login",
    });
  }
};



const logoutUser=(req, res)=>{
  res.clearCookie('token').json({
    success: true,
    message: "Logged out successFully"
  })
}
const authMiddleware = (req, res, next) => {
  try {
    const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized user: No token provided",
      });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    req.user = decoded;
    next();
  } catch (error) {
    console.error("AuthMiddleware error:", error);
    return res.status(401).json({
      success: false,
      message: "Unauthorized user: Invalid token",
    });
  }
};

export { registerUser, loginUser, logoutUser, authMiddleware };
