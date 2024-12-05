import mongoose, { Schema } from "mongoose";

const customerSchema = new Schema({
  first_name: { type: String, require: true },
  second_name: { type: String, require: true },
});

export const CustomerModel = mongoose.model("customers", customerSchema);
