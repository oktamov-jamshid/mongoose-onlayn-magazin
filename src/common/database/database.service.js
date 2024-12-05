import mongoose from "mongoose";
import getConfig from "../config/config.service.js";

export default async function initDatabase() {
  await connectToDb();
}

async function connectToDb() {
  try {
    await mongoose.connect(getConfig("MONGO_CONNECTION_URL"));
    console.log("Bazaga ulandi");
  } catch (err) {
    console.log("Bazaga ulanishda hatolik boldi", err.message);
  }
}
