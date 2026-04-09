import api from "./api";

const API_BASE = "/payments";

const createPayment = async (paymentData) => {
  const response = await api.post(API_BASE, paymentData);
  return response.data;
};

const makePayment = async (paymentData) => {
  const response = await api.post(API_BASE, paymentData);
  return response.data;
};

const getPaymentHistory = async () => {
  const response = await api.get(API_BASE);
  return response.data;
};

const getPaymentById = async (id) => {
  const response = await api.get(`${API_BASE}/${id}`);
  return response.data;
};

const PaymentService = {
  createPayment,
  makePayment,
  getPaymentHistory,
  getPaymentById,
};

export default PaymentService;
