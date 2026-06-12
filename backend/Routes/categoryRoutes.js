import express from "express";
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../Controller/categoryController.js";

const router = express.Router();

router.route("/").get(getCategories).post(createCategory);
router.route("/:id").put(updateCategory).delete(deleteCategory);

export default router;
