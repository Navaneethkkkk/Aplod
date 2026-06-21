import Order from "../Models/Order.js";
import Product from "../Models/Product.js";

const makeOrderNumber = () =>
  `APL-${new Date().getFullYear()}-${Date.now().toString().slice(-7)}`;

const formatAddress = (address = {}) =>
  [address.line1, address.line2, address.city, address.state, address.pincode, address.country]
    .filter(Boolean)
    .join(", ");

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
    const incomingItems = Array.isArray(req.body.items) ? req.body.items : [];
    const customer = {
      name: req.body.customer?.name || req.body.customerName,
      email: req.body.customer?.email || req.body.customerEmail || "",
      phone: req.body.customer?.phone || req.body.customerPhone,
    };
    const shippingAddress = req.body.shippingAddress || {
      line1: req.body.address || "",
      city: req.body.city || "",
      state: req.body.state || "",
      pincode: req.body.pincode || "",
      country: req.body.country || "India",
    };

    if (!incomingItems.length) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    if (!customer.name || !customer.phone) {
      return res.status(400).json({ message: "Customer name and phone are required" });
    }

    const requiredAddressFields = ["line1", "city", "state", "pincode"];
    const missingAddressField = requiredAddressFields.find((field) => !shippingAddress[field]);
    if (missingAddressField) {
      return res.status(400).json({ message: "Complete shipping address is required" });
    }

    const items = [];

    for (const item of incomingItems) {
      const productId = item.product || item.productId || item.id;
      const quantity = Number(item.quantity || 1);

      if (!productId || quantity < 1) {
        return res.status(400).json({ message: "Each cart item needs a product and quantity" });
      }

      const product = await Product.findById(productId);
      if (!product || product.status !== "Active") {
        return res.status(404).json({ message: `${item.name || "Product"} is not available` });
      }

      if (product.stock < quantity) {
        return res.status(400).json({
          message: `${product.name} has only ${product.stock} item(s) left`,
        });
      }

      items.push({
        product: product._id,
        name: product.name,
        quantity,
        price: product.price,
        image: product.images?.[0] || product.imageUrl || "",
        selectedModel: item.selectedModel || item.subtitle || "",
        selectedColor: item.selectedColor || item.color?.name || "",
      });
    }

    const subtotal = items.reduce(
      (sum, item) => sum + Number(item.price) * Number(item.quantity),
      0
    );
    const shippingFee = subtotal >= 499 ? 0 : 49;
    const discount = Number(req.body.discount || 0);
    const totalAmount = Math.max(subtotal + shippingFee - discount, 0);

    const order = await Order.create({
      orderNumber: req.body.orderNumber || makeOrderNumber(),
      customer,
      customerName: customer.name,
      customerEmail: customer.email,
      customerPhone: customer.phone,
      shippingAddress,
      address: formatAddress(shippingAddress),
      items,
      subtotal,
      shippingFee,
      discount,
      totalAmount,
      paymentMethod: req.body.paymentMethod || "COD",
      paymentStatus: req.body.paymentStatus || "Pending",
      notes: req.body.notes || "",
    });

    await Promise.all(
      items.map((item) =>
        Product.findByIdAndUpdate(item.product, {
          $inc: { stock: -item.quantity },
        })
      )
    );

    const populated = await order.populate("items.product", "name sku stock images");
    res.status(201).json(populated);
  } catch (error) {
    next(error);
  }
};

export const updateOrderStatus = async (req, res, next) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status,
        ...(req.body.paymentStatus ? { paymentStatus: req.body.paymentStatus } : {}),
      },
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
