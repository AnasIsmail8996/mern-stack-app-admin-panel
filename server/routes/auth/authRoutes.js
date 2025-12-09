import express from "express"
import { loginUser, registerUser, logoutUser, authMiddleware } from "../../controllers/auth/auth-controller.js"


const authRoutes= express.Router()

authRoutes.post('/register', registerUser)
authRoutes.post('/login', loginUser)
authRoutes.post('/logout', logoutUser)
authRoutes.get("/check-auth", authMiddleware, (req, res) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    message: "Authenticated user!",
    user,
  });
});







export default authRoutes