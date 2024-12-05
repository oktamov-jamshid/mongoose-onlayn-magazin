import { CarModel } from "./car.model.js";

export async function addCar(req, res) {
  try {
    const newCar = req.body;
    const result = await CarModel.create(newCar);
    res.send(result);
  } catch (err) {
    res.send("Hatolik boldi" + err.message);
  }
}

export async function getAllCar(req, res) {
  try {
    const result = await CarModel.find();
    res.send(result);
  } catch (err) {
    res.send("Hatolik boldi" + err.message);
  }
}
export async function getCar(req, res) {
  try {
    const { id } = req.params;
    const result = await CarModel.findById(id);
    res.send(result);
  } catch (err) {
    res.send("Hatolik boldi" + err.message);
  }
}
export async function updateCar(req, res) {
  try {
    const { id } = req.params;
    const newCar = req.body;
    const result = await CarModel.findByIdAndUpdate(id, newCar);
    res.send(result);
  } catch (err) {
    res.send("Hatolik boldi" + err.message);
  }
}
export async function deleteCar(req, res) {
  try {
    const { id } = req.params;
    const result = await CarModel.deleteOne({ _id: id });
    res.send(result);
  } catch (err) {
    res.send("Hatolik boldi" + err.message);
  }
}
