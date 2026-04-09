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

const getBalance = async () => {
  const response = await api.get(`${API_BASE}/balance`);
  return response.data;
};

const getPaymentMethods = async () => {
  const response = await api.get(`${API_BASE}/methods`);
  return response.data;
};

const addPaymentMethod = async (methodData) => {
  const response = await api.post(`${API_BASE}/methods`, methodData);
  return response.data;
};

const PaymentService = {
  createPayment,
  makePayment,
  getPaymentHistory,
  getPaymentById,
  getBalance,
  getPaymentMethods,
  addPaymentMethod,
};

export default PaymentService;
