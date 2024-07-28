import Order from "../models/Orders.model.js";
import { generateCode } from "../utils/generateRandomCode.js";

const createOrder = (bodyOrder) => {
  const orderCode = generateCode(9);
  const orderData = {
    ...bodyOrder,
    orderCode: "#" + orderCode,
    voucher: bodyOrder.voucher === "" ? null : bodyOrder.voucher,
  };
  return Order.create(orderData);
};

const getOrders = (filter, options) => {
  return Order.paginate(filter, options);
};

const getOrderByID = (orderID) => {
  return Order.findById(orderID);
};

const updateOrder = (orderID, bodyOrder) => {
  return Order.findByIdAndUpdate(orderID, bodyOrder, { new: true });
};

const orderService = {
  createOrder,
  getOrders,
  getOrderByID,
  updateOrder,
};

export default orderService;
