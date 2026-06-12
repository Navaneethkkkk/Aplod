import express from "express";
import {
  createOrder,
  deleteOrder,
  getOrders,
  updateOrderStatus,
} from "../Controller/orderController.js";

const router = express.Router();

router.route("/").get(getOrders).post(createOrder);
router.route("/:id").patch(updateOrderStatus).delete(deleteOrder);

export default router;
