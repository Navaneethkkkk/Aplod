import Product from "../Models/Product.js";

export const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find()
      .populate("category", "name slug")
      .sort({ createdAt: -1 });

    res.json(products);
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const payload = {
      ...req.body,
      images: Array.isArray(req.body.images)
        ? req.body.images.filter(Boolean).slice(0, 4)
        : req.body.imageUrl
          ? [req.body.imageUrl]
          : [],
    };
    const product = await Product.create(payload);
    const populated = await product.populate("category", "name slug");

    res.status(201).json(populated);
  } catch (error) {
    next(error);
  }
};

export const getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).populate("category", "name slug");

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json(product);
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const payload = {
      ...req.body,
      images: Array.isArray(req.body.images)
        ? req.body.images.filter(Boolean).slice(0, 4)
        : req.body.imageUrl
          ? [req.body.imageUrl]
          : [],
    };
    const product = await Product.findByIdAndUpdate(req.params.id, payload, {
      new: true,
      runValidators: true,
    }).populate("category", "name slug");

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json(product);
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json({ message: "Product deleted" });
  } catch (error) {
    next(error);
  }
};
