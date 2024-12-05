import { PaymentModel } from "./payment.model.js";

export async function addPayment(req, res) {
  try {
    const newPayment = req.body;
    const result = await PaymentModel.create(newPayment);
    res.send(result);
  } catch (err) {
    res.send("Hatolik boldi" + err.message);
  }
}

export async function getAllPayment(req, res) {
  try {
    const result = await PaymentModel.find();
    res.send(result);
  } catch (err) {
    res.send("Hatolik boldi" + err.message);
  }
}
export async function getPayment(req, res) {
  try {
    const { id } = req.params;
    const result = await PaymentModel.findById(id);
    res.send(result);
  } catch (err) {
    res.send("Hatolik boldi" + err.message);
  }
}
export async function updatePayment(req, res) {
  try {
    const { id } = req.params;
    const newPayment = req.body;
    const result = await PaymentModel.findByIdAndUpdate(id, newPayment);
    res.send(result);
  } catch (err) {
    res.send("Hatolik boldi" + err.message);
  }
}
export async function deletePayment(req, res) {
  try {
    const { id } = req.params;
    const result = await PaymentModel.deleteOne({ _id: id });
    res.send(result);
  } catch (err) {
    res.send("Hatolik boldi" + err.message);
  }
}
