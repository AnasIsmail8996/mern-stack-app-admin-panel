import Address from "../../models/address.js";

// ADD ADDRESS
const addAddress = async (req, res) => {
  try {
    const { userId, address, city, pincode, phone, notes } = req.body;

    if (!userId || !address || !city || !pincode || !phone || !notes) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const newAddress = new Address({
      userId,
      address,
      city,
      pincode,
      phone,
      notes,
    });

    await newAddress.save();

    res.status(200).json({
      success: true,
      data: newAddress,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in addAddress",
      error: error.message,
    });
  }
};

// GET ALL ADDRESSES FOR A USER
const getAllAddress = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const addressList = await Address.find({ userId });

    res.status(200).json({
      success: true,
      data: addressList,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in getAllAddress",
      error: error.message,
    });
  }
};

// UPDATE ADDRESS
const editAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;

    if (!userId || !addressId) {
      return res.status(400).json({
        success: false,
        message: "User ID and Address ID are required",
      });
    }

    const updatedAddress = await Address.findOneAndUpdate(
      { _id: addressId, userId },
      req.body,
      { new: true }
    );

    if (!updatedAddress) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    res.status(200).json({
      success: true,
      data: updatedAddress,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in editAddress",
      error: error.message,
    });
  }
};

// DELETE ADDRESS
const deleteAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;

    if (!userId || !addressId) {
      return res.status(400).json({
        success: false,
        message: "User ID and Address ID are required",
      });
    }

    const deleted = await Address.findOneAndDelete({
      _id: addressId,
      userId,
    });

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Address deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in deleteAddress",
      error: error.message,
    });
  }
};

export { addAddress, getAllAddress, editAddress, deleteAddress };
