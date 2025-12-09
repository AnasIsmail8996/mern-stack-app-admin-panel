import express from "express";
import {
  addAddress,
  getAllAddress,
  editAddress,
  deleteAddress,
} from "../../controllers/shop/addressController.js";

const router = express.Router();

router.post("/add", addAddress);
router.get("/get/:userId", getAllAddress);
router.put("/update/:userId/:addressId", editAddress);
router.delete("/delete/:userId/:addressId", deleteAddress);

export default router;
