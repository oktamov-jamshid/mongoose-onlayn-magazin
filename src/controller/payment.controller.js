import { Router } from "express";
import {
  addPayment,
  deletePayment,
  getAllPayment,
  getPayment,
  updatePayment,
} from "../core/payment/payment.service.js";

const paymentRouter = Router();

paymentRouter.post("/", addPayment);
paymentRouter.get("/", getAllPayment);
paymentRouter.get("/:id", getPayment);
paymentRouter.put("/:id", updatePayment);
paymentRouter.delete("/:id", deletePayment);

export default paymentRouter;
