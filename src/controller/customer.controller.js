import { Router } from "express";
import {
  addCustomer,
  deleteCustomer,
  getAllCustomer,
  getCustomer,
  updateCustomer,
} from "../core/customer/customer.service.js";

const customerRouter = Router();

customerRouter.post("/", addCustomer);
customerRouter.get("/", getAllCustomer);
customerRouter.get("/:id", getCustomer);
customerRouter.put("/:id", updateCustomer);
customerRouter.delete("/:id", deleteCustomer);

export default customerRouter;
