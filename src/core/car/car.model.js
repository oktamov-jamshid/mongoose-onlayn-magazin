import mongoose, { Schema } from "mongoose";

const carSchema = new Schema({
  company_name: { type: String, require: true },
  model: { type: String, require: true },
  unit_price: { type: Number, require: true },
  color: { type: String },
  year: { type: Date },
});

export const CarModel = mongoose.model("cars", carSchema);
