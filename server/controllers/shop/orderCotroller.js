import { stripe } from "../../db/stripPayment.js";
import Order from "../../models/Order.js";
import Cart from "../../models/Cart.js";
import Product from "../../models/Products.js"

const createOrder = async (req, res) => {
  try {
    const {
      userId,
      cartId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
      paymentId,
      payerId,
    } = req.body;

    // ---------- STRIPE CHECKOUT SESSION ----------
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",

     
      success_url: "http://localhost:5173/shop/strip-retrun?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "http://localhost:5173/shop/strip-cancel",

      line_items: cartItems.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.title,
            metadata: { productId: item.productId },
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),
    });

    // ---------- SAVE ORDER ----------
    const newOrderCreated = new Order({
      userId,
      cartId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
      paymentId: session.id,   
      payerId,
    });

    await newOrderCreated.save();
        
    return res.status(200).json({
      success: true,
      message: "Stripe checkout session created",
      sessionId: session.id,
      url: session.url,
       
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while creating the order",
    });
  }
};






const capturePayment = async (req, res) => {
  try {
    const { session_id } = req.body;

    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (!session) {
      return res.status(400).json({ success: false, message: "Invalid session" });
    }

    if (session.payment_status !== "paid") {
      return res.status(400).json({ success: false, message: "Payment not completed" });
    }

    const order = await Order.findOne({ paymentId: session_id });

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    order.paymentStatus = "paid";
    order.orderStatus = "confirmed";
    order.paymentId = session.payment_intent;
 
    for(let item of order.cartItems ){
      let product = await Product.findById(item.productId)
      if(!product){
        return res.status(400).json({
          success: false,
          message : `Stock is end now ${product.title} `
        })
      }
      product.totalStock -= item.quantity

      await product.save()
    }

    if (order.cartId) {
      await Cart.findByIdAndDelete(order.cartId);
    }

    await order.save();

    return res.status(200).json({
      success: true,
      message: "Payment captured successfully",
      session,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong capturing payment",
    });
  }
};


const getAllOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await Order.find({ userId }).sort({ createdAt: -1 });

    if (!orders.length) {
      return res.status(404).json({
        success: false,
        message: "No orders found",
      });
    }

    return res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
    });
  }
};

const getOrdersDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: order,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch order details",
    });
  }
};


export { createOrder, capturePayment , getAllOrdersByUser, getOrdersDetails};
