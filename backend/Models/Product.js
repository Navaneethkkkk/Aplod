import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    sku: {
      type: String,
      trim: true,
      sparse: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    imageUrl: {
      type: String,
      default: "",
      trim: true,
    },
    images: {
      type: [String],
      default: [],
      validate: {
        validator: (value) => value.length <= 12,
        message: "You can add up to 12 photos or videos only",
      },
    },
    status: {
      type: String,
      enum: ["Active", "Draft"],
      default: "Active",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
