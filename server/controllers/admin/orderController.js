import Order from "../../models/Order.js";

const getAllOrdersOfAllUsers = async (req, res) => {
  try {

    const orders = await Order.find();

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

const getOrdersDetailsForAdmin = async (req, res) => {
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



const updateOrderStatus = async (req, res) => {
  try {
const { id } = req.params;
const {orderStatus}=req.body;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

   await Order.findByIdAndUpdate(id, {orderStatus})

    return res.status(200).json({
      success: true,
      message : "Order Status is updated SuccessFully"
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch order details",
    });
  }
};

export { getAllOrdersOfAllUsers, getOrdersDetailsForAdmin, updateOrderStatus}