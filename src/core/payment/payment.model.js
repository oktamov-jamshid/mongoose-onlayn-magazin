import mongoose, { Schema } from "mongoose";

const paymentSchema = new Schema({
  order_id: { type: Schema.Types.ObjectId, ref: "orders", require: true },
  amount: { type: Number, require: true },
  payment_date: { type: Date, default: Date.now },
});

export const PaymentModel = mongoose.model("payments", paymentSchema);
