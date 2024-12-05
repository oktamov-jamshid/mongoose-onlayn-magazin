import { Router } from "express";
import {
  addOrder,
  deleteOrder,
  getAllOrder,
  getOrder,
  updateOrder,
} from "../core/order/order.service.js";

const orderRouter = Router();

orderRouter.post("/", addOrder);
orderRouter.get("/", getAllOrder);
orderRouter.get("/:id", getOrder);
orderRouter.put("/:id", updateOrder);
orderRouter.delete("/:id", deleteOrder);

export default orderRouter;
