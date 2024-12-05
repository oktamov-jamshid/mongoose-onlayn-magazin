import mongoose, { Schema, mongo } from "mongoose";
import { OrderModel } from "./order.model.js";
import { PaymentModel } from "../payment/payment.model.js";
import { CarModel } from "../car/car.model.js";

export async function addOrder(req, res) {
  try {
    const newData = req.body;
    const order = await OrderModel.create(newData.order);
    const { amount } = newData.payment;
    const order_id = order._id;
    console.log("order_id", order_id);
    const payment = await PaymentModel.create({ order_id, amount });
    res.send({ order, payment });
  } catch (err) {
    res.send("Hatolik boldi" + err.message);
  }
}
async function findDebts(orders, request_date) {
  const debts = [];
  for (const order of orders) {
    const { order_date } = order;
    const time_pass =
      (new Date(request_date).getTime() - new Date(order_date).getTime()) /
      (1000 * 60 * 60 * 24 * 30);
    console.log(order);
    const car = await CarModel.findById(order.car._id);
    if (order.mounth === 1) {
      var due_amount = car.unit_price * 0.2;
      if (time_pass > 30) {
        due_amount = due_amount + car.unit_price * 0.8 * 1.15;
      }
    }
    if (order.mounth === 3) {
      var due_amount = car.unit_price * 0.2;
      for (let i = 1; i < time_pass; i++) {
        due_amount = due_amount + (car.unit_price * 0.8 * 1.3) / 3;
      }
    }

    if (order.mounth === 6) {
      var due_amount = car.unit_price * 0.2;
      for (let i = 1; i < time_pass; i++) {
        due_amount = due_amount + (car.unit_price * 0.8 * 1.55) / 6;
      }
    }

    for (const payment of order.payments) {
      due_amount = due_amount - payment.amount;
    }
    if (due_amount > 0) {
      debts.push({
        customer: order.customer,
        due_amount,
      });
    }
    return debts;
  }
}
export async function getAllOrder(req, res) {
  try {
    const { request_date } = req.query;
    const orders = await OrderModel.aggregate([
      {
        $lookup: {
          from: "customers",
          localField: "customer_id",
          foreignField: "_id",
          as: "customer",
        },
      },
      {
        $unwind: "$customer",
      },
      {
        $lookup: {
          from: "cars",
          localField: "car_id",
          foreignField: "_id",
          as: "car",
        },
      },
      {
        $unwind: "$car",
      },
      {
        $lookup: {
          from: "payments",
          localField: "_id",
          foreignField: "order_id",
          as: "payments",
        },
      },
      {
        $project: {
          percent: "$percent",
          mounth: "$mounth",
          order_date: "$order_date",
          customer: {
            first_name: "$customer.first_name",
            second_name: "$customer.second_name",
          },
          car: {
            _id: "$car._id",
            company_name: "$car.company_name",
            model: "$car.model",
            unit_price: "$car.unit_price",
            color: "$car.color",
            year: "$car.year",
          },
          payments: {
            $map: {
              input: "$payments",
              as: "payment",
              in: {
                amount: "$$payment.amount",
                payment_date: "$$payment.payment_date",
              },
            },
          },
        },
      },
    ]);
    res.send(await findDebts(orders, request_date));
  } catch (err) {
    res.send("Hatolik boldi" + err.message);
  }
}
export async function getOrder(req, res) {
  try {
    const { id } = req.params;
    const result = await OrderModel.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } },
      {
        $lookup: {
          from: "customers",
          localField: "customer_id",
          foreignField: "_id",
          as: "customer",
        },
      },
      {
        $unwind: "$customer",
      },
      {
        $lookup: {
          from: "cars",
          localField: "car_id",
          foreignField: "_id",
          as: "car",
        },
      },
      {
        $unwind: "$car",
      },
      {
        $project: {
          percent: "$percent",
          mounth: "$mounth",
          customer: {
            first_name: "$customer.first_name",
            second_name: "$customer.second_name",
          },
          car: {
            company_name: "$car.company_name",
            model: "$car.model",
            unit_price: "$car.unit_price",
            color: "$car.color",
            year: "$car.year",
          },
        },
      },
    ]);
    res.send(result);
  } catch (err) {
    res.send("Hatolik boldi" + err.message);
  }
}
export async function updateOrder(req, res) {
  try {
    const { id } = req.params;
    const newOrder = req.body;
    const result = await OrderModel.findByIdAndUpdate(id, newOrder);
    res.send(result);
  } catch (err) {
    res.send("Hatolik boldi" + err.message);
  }
}
export async function deleteOrder(req, res) {
  try {
    const { id } = req.params;
    const result = await OrderModel.deleteOne({ _id: id });
    res.send(result);
  } catch (err) {
    res.send("Hatolik boldi" + err.message);
  }
}
