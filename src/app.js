import express from "express";
import getConfig from "./common/config/config.service.js";
import initDatabase from "./common/database/database.service.js";
import carRouter from "./controller/cars.controller.js";
import customerRouter from "./controller/customer.controller.js";
import orderRouter from "./controller/order.controller.js";
import paymentRouter from "./controller/payment.controller.js";

const app = express();

const PORT = getConfig("EXPRESS_PORT") || 3000;
function initRoutes() {
  app.use("/car", carRouter);
  app.use("/customer", customerRouter);
  app.use("/order", orderRouter);
  app.use("/payment", paymentRouter);
}
async function init() {
  app.use(express.json());

  initRoutes();
  await initDatabase();
  app.listen(PORT, () => console.log(`Server ${PORT} da ishladi`));
}

init();
