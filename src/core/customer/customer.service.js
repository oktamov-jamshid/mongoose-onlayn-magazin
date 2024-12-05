import { CustomerModel } from "./customer.model.js";

export async function addCustomer(req, res) {
  try {
    const newCustomer = req.body;
    const result = await CustomerModel.create(newCustomer);
    res.send(result);
  } catch (err) {
    res.send("Hatolik boldi" + err.message);
  }
}

export async function getAllCustomer(req, res) {
  try {
    const result = await CustomerModel.find();
    res.send(result);
  } catch (err) {
    res.send("Hatolik boldi" + err.message);
  }
}
export async function getCustomer(req, res) {
  try {
    const { id } = req.params;
    const result = await CustomerModel.findById(id);
    res.send(result);
  } catch (err) {
    res.send("Hatolik boldi" + err.message);
  }
}
export async function updateCustomer(req, res) {
  try {
    const { id } = req.params;
    const newCustomer = req.body;
    const result = await CustomerModel.findByIdAndUpdate(id, newCustomer);
    res.send(result);
  } catch (err) {
    res.send("Hatolik boldi" + err.message);
  }
}
export async function deleteCustomer(req, res) {
  try {
    const { id } = req.params;
    const result = await CustomerModel.deleteOne({ _id: id });
    res.send(result);
  } catch (err) {
    res.send("Hatolik boldi" + err.message);
  }
}
