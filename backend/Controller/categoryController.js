import Category from "../Models/Category.js";
import Product from "../Models/Product.js";

const makeSlug = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.aggregate([
      { $sort: { createdAt: -1 } },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "category",
          as: "products",
        },
      },
      {
        $project: {
          name: 1,
          slug: 1,
          description: 1,
          status: 1,
          featured: 1,
          createdAt: 1,
          updatedAt: 1,
          productCount: { $size: "$products" },
        },
      },
    ]);

    res.json(categories);
  } catch (error) {
    next(error);
  }
};

export const createCategory = async (req, res, next) => {
  try {
    const { name, description = "", status = "Active", featured = false } = req.body;
    const slug = req.body.slug ? makeSlug(req.body.slug) : makeSlug(name || "");

    const category = await Category.create({
      name,
      slug,
      description,
      status,
      featured,
    });

    res.status(201).json({ ...category.toObject(), productCount: 0 });
  } catch (error) {
    next(error);
  }
};

export const updateCategory = async (req, res, next) => {
  try {
    const payload = { ...req.body };

    if (payload.slug) payload.slug = makeSlug(payload.slug);
    if (!payload.slug && payload.name) payload.slug = makeSlug(payload.name);

    const category = await Category.findByIdAndUpdate(req.params.id, payload, {
      new: true,
      runValidators: true,
    });

    if (!category) return res.status(404).json({ message: "Category not found" });

    const productCount = await Product.countDocuments({ category: category._id });
    res.json({ ...category.toObject(), productCount });
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (req, res, next) => {
  try {
    const linkedProducts = await Product.countDocuments({ category: req.params.id });

    if (linkedProducts > 0) {
      return res.status(400).json({
        message: "Category has products. Move or delete products first.",
      });
    }

    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) return res.status(404).json({ message: "Category not found" });

    res.json({ message: "Category deleted" });
  } catch (error) {
    next(error);
  }
};
