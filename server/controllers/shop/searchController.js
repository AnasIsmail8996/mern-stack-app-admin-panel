import Product from "../../models/Products.js";

 const searchProducts = async (req, res) => {
  try {
    const { keyword } = req.params;

    if (!keyword || typeof keyword !== "string") {
      return res.status(400).json({
        success: false,
        message: "Keyword is required"
      });
    }


    const reEx = new RegExp(keyword, "i");

    const searchQuery = {
      $or: [
        { title: reEx },
        { description: reEx },
        { brand: reEx },
        { category: reEx },
      ],
    };

    const results = await Product.find(searchQuery);

    if (results.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No products found",
      });
    }

    return res.status(200).json({
      success: true,
      count: results.length,
      data: results,
    });
  } catch (error) {
    console.error("Search Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while searching products",
      error: error.message,
    });
  }
};


export { searchProducts  }