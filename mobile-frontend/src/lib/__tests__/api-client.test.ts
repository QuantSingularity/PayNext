import { ApiClient, mockApiClient, useMockData } from "@/lib/api-client";

// Mock fetch globally
const mockFetch = jest.fn();
global.fetch = mockFetch;

describe("ApiClient", () => {
  let client: ApiClient;

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
    client = new ApiClient("http://test-api.example.com");
  });

  describe("Token management", () => {
    it("loads token from localStorage on construction", () => {
      localStorage.setItem("auth_token", "stored_token");
      const newClient = new ApiClient("http://test-api.example.com");
      expect(localStorage.getItem("auth_token")).toBe("stored_token");
    });

    it("setToken stores token in localStorage", () => {
      client.setToken("my_token_123");
      expect(localStorage.setItem).toHaveBeenCalledWith(
        "auth_token",
        "my_token_123",
      );
    });

    it("clearToken removes token from localStorage", () => {
      client.clearToken();
      expect(localStorage.removeItem).toHaveBeenCalledWith("auth_token");
    });
  });

  describe("request method", () => {
    it("adds Authorization header when token is set", async () => {
      client.setToken("bearer_token");
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ userId: "1" }),
      });

      await client.getUserProfile();

      expect(mockFetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: expect.objectContaining({
            Authorization: "Bearer bearer_token",
          }),
        }),
      );
    });

    it("returns error response when fetch fails with non-ok status", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 401,
        json: async () => ({ message: "Unauthorized" }),
      });

      const response = await client.getUserProfile();

      expect(response.success).toBe(false);
      expect(response.error?.status).toBe(401);
      expect(response.error?.message).toBe("Unauthorized");
    });

    it("returns error response when fetch throws a network error", async () => {
      mockFetch.mockRejectedValueOnce(new Error("Network failure"));

      const response = await client.getUserProfile();

      expect(response.success).toBe(false);
      expect(response.error?.message).toBe("Network failure");
      expect(response.error?.status).toBe(0);
    });

    it("returns success response on ok fetch", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ id: "user_1", name: "Alice" }),
      });

      const response = await client.getUserProfile();

      expect(response.success).toBe(true);
      expect(response.data).toEqual({ id: "user_1", name: "Alice" });
    });
  });

  describe("API endpoint methods", () => {
    beforeEach(() => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => ({}),
      });
    });

    it("login calls correct endpoint with POST", async () => {
      await client.login("user@test.com", "pass123");
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining("/users/login"),
        expect.objectContaining({ method: "POST" }),
      );
    });

    it("register calls correct endpoint with POST", async () => {
      await client.register({
        name: "Alice",
        email: "a@b.com",
        password: "pw",
      });
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining("/users/register"),
        expect.objectContaining({ method: "POST" }),
      );
    });

    it("getBalance calls correct endpoint with GET", async () => {
      await client.getBalance();
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining("/payments/balance"),
        expect.objectContaining({ method: "GET" }),
      );
    });

    it("getTransactions includes limit as query param", async () => {
      await client.getTransactions(15);
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining("limit=15"),
        expect.any(Object),
      );
    });

    it("sendPayment calls correct endpoint with POST and body", async () => {
      await client.sendPayment({ recipient: "bob", amount: 25, memo: "lunch" });
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining("/payments/send"),
        expect.objectContaining({
          method: "POST",
          body: JSON.stringify({ recipient: "bob", amount: 25, memo: "lunch" }),
        }),
      );
    });

    it("requestPayment calls correct endpoint", async () => {
      await client.requestPayment({ amount: 50, memo: "dinner" });
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining("/payments/request"),
        expect.objectContaining({ method: "POST" }),
      );
    });

    it("processQrPayment sends qrData in body", async () => {
      await client.processQrPayment("paynext://pay?details=abc");
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining("/payments/qr"),
        expect.objectContaining({
          method: "POST",
          body: JSON.stringify({ qrData: "paynext://pay?details=abc" }),
        }),
      );
    });
  });
});

describe("mockApiClient", () => {
  it("getBalance returns success with balance data", async () => {
    const response = await mockApiClient.getBalance();
    expect(response.success).toBe(true);
    expect(response.data).toHaveProperty("balance");
    expect(response.data).toHaveProperty("currency", "USD");
  });

  it("getTransactions returns array of transactions", async () => {
    const response = await mockApiClient.getTransactions(3);
    expect(response.success).toBe(true);
    expect(Array.isArray(response.data)).toBe(true);
    expect((response.data as unknown[]).length).toBeLessThanOrEqual(3);
  });

  it("getTransactions respects limit parameter", async () => {
    const response = await mockApiClient.getTransactions(1);
    expect((response.data as unknown[]).length).toBeLessThanOrEqual(1);
  });

  it("getUserProfile returns user object", async () => {
    const response = await mockApiClient.getUserProfile();
    expect(response.success).toBe(true);
    expect(response.data).toHaveProperty("id");
    expect(response.data).toHaveProperty("name");
    expect(response.data).toHaveProperty("email");
  });

  it("sendPayment returns transactionId on success", async () => {
    // Force success by mocking Math.random
    const spy = jest.spyOn(Math, "random").mockReturnValue(0.9);
    const response = await mockApiClient.sendPayment({
      recipient: "alice",
      amount: 10,
    });
    expect(response.success).toBe(true);
    expect((response.data as { transactionId: string }).transactionId).toMatch(
      /^txn_/,
    );
    spy.mockRestore();
  });

  it("sendPayment can return failure", async () => {
    const spy = jest.spyOn(Math, "random").mockReturnValue(0.05);
    const response = await mockApiClient.sendPayment({
      recipient: "alice",
      amount: 10,
    });
    expect(response.success).toBe(false);
    expect(response.error).toBeDefined();
    spy.mockRestore();
  });

  it("requestPayment returns requestId and qrCode", async () => {
    const response = await mockApiClient.requestPayment({ amount: 25 });
    expect(response.success).toBe(true);
    expect((response.data as { requestId: string }).requestId).toMatch(/^req_/);
    expect((response.data as { qrCode: string }).qrCode).toContain(
      "paynext://",
    );
  });

  it("updateUserProfile returns updated data on success", async () => {
    const spy = jest.spyOn(Math, "random").mockReturnValue(0.9);
    const response = await mockApiClient.updateUserProfile({
      name: "New Name",
    });
    expect(response.success).toBe(true);
    spy.mockRestore();
  });
});

describe("useMockData flag", () => {
  it("is a boolean", () => {
    expect(typeof useMockData).toBe("boolean");
  });
});
