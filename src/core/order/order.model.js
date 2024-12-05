import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema({
  customer_id: {
    type: Schema.Types.ObjectId,
    ref: "customers",
    require: true,
  },
  car_id: {
    type: Schema.Types.ObjectId,
    ref: "cars",
    require: true,
  },
  percent: { type: Number, require: true },
  mounth: { type: Number, require: true },
  order_date: { type: Date, default: Date.now },
});

export const OrderModel = mongoose.model("orders", orderSchema);
