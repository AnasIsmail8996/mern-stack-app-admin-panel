import express from "express";
import { addProductsReview, getProductsReview } from "../../controllers/shop/ProductsReviewController.js";

const router = express.Router();

router.post('/add', addProductsReview);
router.get('/:productId', getProductsReview); 

export default router;
