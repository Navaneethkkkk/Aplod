import Order from "../Models/Order.js";

const makeOrderNumber = () => `ORD-${Date.now().toString().slice(-8)}`;

export const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find()
      .populate("items.product", "name sku")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    next(error);
  }
};

export const createOrder = async (req, res, next) => {
  try {
    const items = req.body.items || [];
    const totalAmount =
      req.body.totalAmount ??
      items.reduce((sum, item) => sum + Number(item.price) * Number(item.quantity), 0);

    const order = await Order.create({
      ...req.body,
      orderNumber: req.body.orderNumber || makeOrderNumber(),
      totalAmount,
    });

    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
};

export const updateOrderStatus = async (req, res, next) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true }
    );

    if (!order) return res.status(404).json({ message: "Order not found" });

    res.json(order);
  } catch (error) {
    next(error);
  }
};

export const deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) return res.status(404).json({ message: "Order not found" });

    res.json({ message: "Order deleted" });
  } catch (error) {
    next(error);
  }
};
