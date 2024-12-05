import { Router } from "express";
import {
  addCar,
  deleteCar,
  getAllCar,
  getCar,
  updateCar,
} from "../core/car/car.service.js";

const carRouter = Router();

carRouter.post("/", addCar);
carRouter.get("/", getAllCar);
carRouter.get("/:id", getCar);
carRouter.put("/:id", updateCar);
carRouter.delete("/:id", deleteCar);

export default carRouter;
