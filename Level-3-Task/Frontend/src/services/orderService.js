import api from "./api";

export const createOrder = (orderData) => api.post("/orders", orderData);
export const getUserOrders = () => api.get("/orders");
export const confirmOrder = (orderData) =>
  api.post("/orders/confirm", orderData);
export const createPaymentOrder = (amount) =>
  api.post("/orders/create-payment", { amount });
