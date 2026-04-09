import api from "../api";
import PaymentService from "../PaymentService";

jest.mock("../api", () => ({
  post: jest.fn(),
  get: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
  interceptors: {
    request: { use: jest.fn() },
    response: { use: jest.fn() },
  },
}));

describe("PaymentService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("createPayment / makePayment", () => {
    it("should call POST /payments with correct payment data", async () => {
      const paymentData = {
        recipient: "recipient@example.com",
        amount: 100,
        currency: "USD",
      };
      const mockResponse = { data: { success: true, transactionId: "txn_123" } };
      api.post.mockResolvedValue(mockResponse);

      await PaymentService.createPayment(paymentData);

      expect(api.post).toHaveBeenCalledTimes(1);
      expect(api.post).toHaveBeenCalledWith("/payments", paymentData);
    });

    it("should return transaction details on successful payment", async () => {
      const paymentData = { recipient: "recipient@example.com", amount: 100 };
      const mockResponse = { data: { success: true, transactionId: "txn_123" } };
      api.post.mockResolvedValue(mockResponse);

      const result = await PaymentService.createPayment(paymentData);

      expect(result).toEqual(mockResponse.data);
    });

    it("makePayment should be an alias for createPayment", async () => {
      const paymentData = { recipient: "user@example.com", amount: 50 };
      const mockResponse = { data: { success: true } };
      api.post.mockResolvedValue(mockResponse);

      await PaymentService.makePayment(paymentData);

      expect(api.post).toHaveBeenCalledWith("/payments", paymentData);
    });

    it("should throw an error on payment API failure", async () => {
      const errorMessage = "Insufficient funds";
      api.post.mockRejectedValue(new Error(errorMessage));

      await expect(
        PaymentService.createPayment({ amount: 9999 }),
      ).rejects.toThrow(errorMessage);
    });
  });

  describe("getPaymentHistory", () => {
    it("should call GET /payments endpoint", async () => {
      const mockResponse = { data: { success: true, payments: [] } };
      api.get.mockResolvedValue(mockResponse);

      await PaymentService.getPaymentHistory();

      expect(api.get).toHaveBeenCalledTimes(1);
      expect(api.get).toHaveBeenCalledWith("/payments");
    });

    it("should return payment history data on successful fetch", async () => {
      const mockPayments = [
        { id: "1", amount: 50, status: "completed" },
        { id: "2", amount: 100, status: "pending" },
      ];
      const mockResponse = { data: { success: true, payments: mockPayments } };
      api.get.mockResolvedValue(mockResponse);

      const result = await PaymentService.getPaymentHistory();

      expect(result).toEqual(mockResponse.data);
    });

    it("should throw an error on payment history API failure", async () => {
      const errorMessage = "Failed to fetch history";
      api.get.mockRejectedValue(new Error(errorMessage));

      await expect(PaymentService.getPaymentHistory()).rejects.toThrow(
        errorMessage,
      );
    });
  });

  describe("getPaymentById", () => {
    it("should call GET /payments/:id with the correct id", async () => {
      const mockResponse = { data: { id: "42", amount: 75 } };
      api.get.mockResolvedValue(mockResponse);

      await PaymentService.getPaymentById("42");

      expect(api.get).toHaveBeenCalledWith("/payments/42");
    });

    it("should return payment data on success", async () => {
      const mockResponse = { data: { id: "42", amount: 75, status: "completed" } };
      api.get.mockResolvedValue(mockResponse);

      const result = await PaymentService.getPaymentById("42");

      expect(result).toEqual(mockResponse.data);
    });

    it("should throw on not found", async () => {
      api.get.mockRejectedValue(new Error("Payment not found"));

      await expect(PaymentService.getPaymentById("999")).rejects.toThrow(
        "Payment not found",
      );
    });
  });
});
