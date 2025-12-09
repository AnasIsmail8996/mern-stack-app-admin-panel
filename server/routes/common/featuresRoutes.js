import express from "express";
import {
 getFeatureImage, addFeatureImage
} from "../../controllers/common/featureController.js";

const router = express.Router();

router.post('/add' , addFeatureImage )
router.get('/get' , getFeatureImage)

export default router