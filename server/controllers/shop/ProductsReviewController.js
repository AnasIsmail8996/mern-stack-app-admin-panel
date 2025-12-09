import ProductReview from "../../models/Review.js";
import Order from "../../models/Order.js";
import Product from "../../models/Products.js";

const addProductsReview = async (req, res) => {
  try {
    const { productId, userId, userName, reviewMessage, reviewValue } = req.body;

    // Ensure the user bought the product
    const order = await Order.findOne({
      userId,
      "cartItems.productId": productId,
      orderStatus: "confirmed",
    });

    if (!order) {
      return res.status(403).json({
        success: false,
        message: "You cannot review this product (order not found)",
      });
    }

    // Check if review already exists
    const checkExistsReview = await ProductReview.findOne({ productId, userId });

    if (checkExistsReview) {
      return res.status(403).json({
        success: false,
        message: "You already reviewed this product",
      });
    }

    // Create review
    const newReview = new ProductReview({
      productId,
      userId,
      userName,
      reviewMessage,
      reviewValue,
    });

    await newReview.save();

    // Recalculate average rating
    const reviews = await ProductReview.find({ productId });
    const totalReviews = reviews.length;
    const averageReview = reviews.reduce((sum, r) => sum + r.reviewValue, 0) / totalReviews;

    await Product.findByIdAndUpdate(productId, { averageReview });

    res.status(200).json({
      success: true,
      data: newReview,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while reviewing product",
      error: error.message,
    });
  }
};

const getProductsReview = async (req, res) => {
  try {
    const { productId } = req.params;

    const reviews = await ProductReview.find({ productId });

    res.status(200).json({
      success: true,
      data: reviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while fetching reviews",
      error: error.message,
    });
  }
};

export { addProductsReview, getProductsReview };
