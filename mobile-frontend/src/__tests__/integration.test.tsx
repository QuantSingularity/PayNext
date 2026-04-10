/**
 * Integration tests for PayNext Mobile Frontend
 */

import { mockApiClient } from "@/lib/api-client";

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn(), replace: jest.fn() }),
  useSearchParams: () => ({ get: jest.fn() }),
  usePathname: () => "/",
}));

describe("PayNext Integration Tests", () => {
  describe("API Client - mockApiClient", () => {
    it("fetches balance with required fields", async () => {
      const response = await mockApiClient.getBalance();
      expect(response.success).toBe(true);
      expect(response.data).toHaveProperty("balance");
      expect(response.data).toHaveProperty("currency", "USD");
      expect(typeof (response.data as { balance: number }).balance).toBe(
        "number",
      );
    });

    it("fetches up to N transactions and respects limit", async () => {
      const response = await mockApiClient.getTransactions(2);
      expect(response.success).toBe(true);
      expect(Array.isArray(response.data)).toBe(true);
      expect((response.data as unknown[]).length).toBeLessThanOrEqual(2);
    });

    it("transaction objects include all required fields", async () => {
      const response = await mockApiClient.getTransactions(1);
      const tx = (response.data as Array<Record<string, unknown>>)[0];
      expect(tx).toHaveProperty("id");
      expect(tx).toHaveProperty("type");
      expect(tx).toHaveProperty("description");
      expect(tx).toHaveProperty("date");
      expect(tx).toHaveProperty("amount");
      expect(tx).toHaveProperty("currency");
    });

    it("sends payment and returns transactionId on success", async () => {
      const spy = jest.spyOn(Math, "random").mockReturnValue(0.9);
      const response = await mockApiClient.sendPayment({
        recipient: "alice",
        amount: 100,
        memo: "test",
      });
      expect(response.success).toBe(true);
      expect(
        (response.data as { transactionId: string }).transactionId,
      ).toMatch(/^txn_/);
      spy.mockRestore();
    });

    it("creates payment request with requestId and qrCode", async () => {
      const response = await mockApiClient.requestPayment({
        amount: 50,
        memo: "dinner",
      });
      expect(response.success).toBe(true);
      const data = response.data as { requestId: string; qrCode: string };
      expect(data.requestId).toMatch(/^req_/);
      expect(data.qrCode).toContain("paynext://");
    });

    it("fetches user profile with full user shape", async () => {
      const response = await mockApiClient.getUserProfile();
      expect(response.success).toBe(true);
      const user = response.data as { id: string; name: string; email: string };
      expect(user.id).toBeDefined();
      expect(user.name).toBeDefined();
      expect(user.email).toBeDefined();
    });

    it("updateUserProfile returns success", async () => {
      const spy = jest.spyOn(Math, "random").mockReturnValue(0.9);
      const response = await mockApiClient.updateUserProfile({
        name: "New",
        email: "n@x.com",
      });
      expect(response.success).toBe(true);
      spy.mockRestore();
    });
  });

  describe("Error Handling", () => {
    it("sendPayment can fail with correct error shape", async () => {
      const spy = jest.spyOn(Math, "random").mockReturnValue(0.0);
      const response = await mockApiClient.sendPayment({
        recipient: "x",
        amount: 1,
      });
      expect(response.success).toBe(false);
      expect(response.error).toHaveProperty("message");
      expect(response.error).toHaveProperty("status");
      spy.mockRestore();
    });

    it("updateUserProfile can fail with error shape", async () => {
      const spy = jest.spyOn(Math, "random").mockReturnValue(0.0);
      const response = await mockApiClient.updateUserProfile({ name: "x" });
      expect(response.success).toBe(false);
      expect(response.error).toHaveProperty("message");
      spy.mockRestore();
    });
  });

  describe("QR code data format", () => {
    it("requestPayment qrCode is a valid paynext:// URL", async () => {
      const response = await mockApiClient.requestPayment({
        amount: 25,
        memo: "split",
      });
      const qrCode = (response.data as { qrCode: string }).qrCode;
      expect(() => new URL(qrCode)).not.toThrow();
    });
  });
});
