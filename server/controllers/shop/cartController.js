import Cart from "../../models/Cart.js";
import Product from "../../models/Products.js";

// -------------------- Add To Cart --------------------
const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId || !quantity) {
      return res.status(400).json({ success: false, message: "Invalid Data Provided" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product Not Found" });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const index = cart.items.findIndex(item => item.productId.toString() === productId);

    if (index === -1) {
      cart.items.push({ productId, quantity });
    } else {
      cart.items[index].quantity += quantity;
    }

    await cart.save();

    return res.status(200).json({ success: true, data: cart });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

// -------------------- Fetch Cart Items --------------------
const fetchCartItems = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ success: false, message: "User Not Found" });
    }

    const cart = await Cart.findOne({ userId }).populate({
      path: "items.productId",
      select: "image title price salePrice"
    });

    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart Not Found" });
    }

    const validItems = cart.items.filter(i => i.productId);

    if (validItems.length !== cart.items.length) {
      cart.items = validItems;
      await cart.save();
    }

    const populatedItems = validItems.map(item => ({
      productId: item.productId._id,
      image: item.productId.image,
      title: item.productId.title,
      price: item.productId.price,
      salePrice: item.productId.salePrice,
      quantity: item.quantity
    }));

    return res.status(200).json({
      success: true,
      data: { ...cart._doc, items: populatedItems }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

// -------------------- Update Cart Quantity --------------------
const updateCartItemsQty = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId || quantity == null) {
      return res.status(400).json({ success: false, message: "Invalid Data Provided" });
    }

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart Not Found" });
    }

    const index = cart.items.findIndex(item => item.productId.toString() === productId);

    if (index === -1) {
      return res.status(404).json({ success: false, message: "Product Not Found In Cart" });
    }

    cart.items[index].quantity = quantity;
    await cart.save();

    await cart.populate({ path: "items.productId", select: "image title price salePrice" });

    const populatedItems = cart.items.map(item => ({
      productId: item.productId?._id ?? null,
      image: item.productId?.image ?? null,
      title: item.productId?.title ?? "Product Not Found",
      price: item.productId?.price ?? null,
      salePrice: item.productId?.salePrice ?? null,
      quantity: item.quantity
    }));

    return res.status(200).json({ success: true, data: { ...cart._doc, items: populatedItems } });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Something went wrong" });
  }
};


const deleteCartItems = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    if (!userId || !productId) {
      return res.status(400).json({
        success: false,
        message: "Invalid Data Provided"
      });
    }

    const cart = await Cart.findOne({ userId }).populate({
      path: "items.productId",
      select: "image title price salePrice"
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart Not Found"
      });
    }

    // Remove product
    cart.items = cart.items.filter(
      item => item?.productId?._id.toString() !== productId
    );

    await cart.save();

    // Repopulate after delete
    await cart.populate({
      path: "items.productId",
      select: "image title price salePrice"
    });

    const populatedItems = cart.items.map(item => ({
      productId: item.productId?._id ?? null,
      image: item.productId?.image ?? null,
      title: item.productId?.title ?? "Product Not Found",
      price: item.productId?.price ?? null,
      salePrice: item.productId?.salePrice ?? null,
      quantity: item.quantity
    }));

    return res.status(200).json({
      success: true,
      data: { ...cart._doc, items: populatedItems }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong"
    });
  }
};


export { addToCart, deleteCartItems, updateCartItemsQty, fetchCartItems };