// Reconstructed module. The original lib/api-client was missing from the repository.
// The exported surface (types, methods, response envelope) is derived from how the
// app and AuthContext consume it. The real client's endpoint paths are a reasonable
// first pass and are finalized during the integration phase against the API gateway;
// the app defaults to the mock client in development, so it runs without a backend.

import AsyncStorage from "@react-native-async-storage/async-storage";

// ----- Types -----

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
}

export interface Transaction {
  id: string;
  type: "credit" | "debit";
  amount: number;
  date: string;
  description: string;
  status: "completed" | "pending" | "failed";
}

export interface BalanceData {
  balance: number;
  currency: string;
}

export interface ApiError {
  message: string;
  code?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
}

export interface PayNextApi {
  login(
    email: string,
    password: string,
  ): Promise<ApiResponse<{ token: string; user: User }>>;
  register(data: {
    name: string;
    email: string;
    password: string;
  }): Promise<ApiResponse<{ user: User }>>;
  loadToken(): Promise<void>;
  setToken(token: string): Promise<void>;
  clearToken(): Promise<void>;
  getUserProfile(): Promise<ApiResponse<User>>;
  updateUserProfile(data: {
    name?: string;
    email?: string;
    phone?: string;
  }): Promise<ApiResponse<User>>;
  getBalance(): Promise<ApiResponse<BalanceData>>;
  getTransactions(limit?: number): Promise<ApiResponse<Transaction[]>>;
  sendPayment(data: {
    recipient: string;
    amount: number;
    memo?: string;
  }): Promise<ApiResponse<{ transactionId: string }>>;
  requestPayment(data: {
    amount: number;
    memo?: string;
  }): Promise<ApiResponse<{ requestId: string }>>;
}

// ----- Configuration -----

const TOKEN_KEY = "auth_token";

const BASE_URL =
  process.env.EXPO_PUBLIC_API_GATEWAY_URL ?? "http://localhost:8002/api";

// Mock data is used unless the app is explicitly running against a real backend.
export const useMockData =
  (process.env.EXPO_PUBLIC_ENV ?? "development") === "development";

// ----- Real client -----

// Shape the payment-service returns for a payment record. Mapped to the app's
// Transaction shape, which uses different field names (date vs paymentDate) and
// normalized lowercase statuses.
interface BackendPayment {
  id: number | string;
  amount: number | string;
  paymentDate?: string;
  date?: string;
  status?: string;
  description?: string;
  recipient?: string;
  type?: string;
}

function toTransaction(p: BackendPayment): Transaction {
  const amount = Number(p.amount ?? 0);
  const type: "credit" | "debit" =
    p.type === "credit" || p.type === "debit"
      ? p.type
      : amount >= 0
        ? "credit"
        : "debit";
  const rawStatus = (p.status ?? "").toLowerCase();
  const status: "completed" | "pending" | "failed" =
    rawStatus === "completed" || rawStatus === "success"
      ? "completed"
      : rawStatus === "failed" || rawStatus === "error"
        ? "failed"
        : "pending";
  return {
    id: String(p.id),
    type,
    amount,
    date: p.paymentDate ?? p.date ?? "",
    description: p.description ?? p.recipient ?? "Payment",
    status,
  };
}

class ApiClient implements PayNextApi {
  private token: string | null = null;

  async loadToken(): Promise<void> {
    this.token = await AsyncStorage.getItem(TOKEN_KEY);
  }

  async setToken(token: string): Promise<void> {
    this.token = token;
    await AsyncStorage.setItem(TOKEN_KEY, token);
  }

  async clearToken(): Promise<void> {
    this.token = null;
    await AsyncStorage.removeItem(TOKEN_KEY);
  }

  private async request<T>(
    path: string,
    options: { method?: string; body?: unknown } = {},
  ): Promise<ApiResponse<T>> {
    try {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      if (this.token) {
        headers.Authorization = `Bearer ${this.token}`;
      }
      const response = await fetch(`${BASE_URL}${path}`, {
        method: options.method ?? "GET",
        headers,
        body: options.body ? JSON.stringify(options.body) : undefined,
      });
      const text = await response.text();
      const parsed = text ? JSON.parse(text) : null;
      if (!response.ok) {
        const message =
          parsed && typeof parsed.error === "string"
            ? parsed.error
            : `Request failed with status ${response.status}`;
        return { success: false, error: { message } };
      }
      return { success: true, data: parsed as T };
    } catch (error) {
      return {
        success: false,
        error: {
          message: error instanceof Error ? error.message : "Network error",
        },
      };
    }
  }

  async login(
    email: string,
    password: string,
  ): Promise<ApiResponse<{ token: string; user: User }>> {
    const res = await this.request<{ token: string; user: User }>(
      "/users/login",
      { method: "POST", body: { username: email, password } },
    );
    return res;
  }

  async register(data: {
    name: string;
    email: string;
    password: string;
  }): Promise<ApiResponse<{ user: User }>> {
    return this.request<{ user: User }>("/users/register", {
      method: "POST",
      body: data,
    });
  }

  async getUserProfile(): Promise<ApiResponse<User>> {
    return this.request<User>("/users/profile");
  }

  async updateUserProfile(data: {
    name?: string;
    email?: string;
    phone?: string;
  }): Promise<ApiResponse<User>> {
    return this.request<User>("/users/profile", { method: "PUT", body: data });
  }

  async getBalance(): Promise<ApiResponse<BalanceData>> {
    const res = await this.request<{
      balance: number | string;
      currency?: string;
    }>("/payments/balance");
    if (res.success && res.data) {
      return {
        success: true,
        data: {
          balance: Number(res.data.balance ?? 0),
          currency: res.data.currency ?? "USD",
        },
      };
    }
    return { success: false, error: res.error };
  }

  async getTransactions(limit = 20): Promise<ApiResponse<Transaction[]>> {
    const res = await this.request<BackendPayment[]>(
      `/payments?limit=${limit}`,
    );
    if (res.success && res.data) {
      return { success: true, data: res.data.map(toTransaction) };
    }
    return { success: false, error: res.error };
  }

  async sendPayment(data: {
    recipient: string;
    amount: number;
    memo?: string;
  }): Promise<ApiResponse<{ transactionId: string }>> {
    const res = await this.request<BackendPayment>("/payments", {
      method: "POST",
      body: {
        recipient: data.recipient,
        amount: data.amount,
        description: data.memo,
        type: "debit",
        status: "PENDING",
      },
    });
    if (res.success && res.data) {
      return { success: true, data: { transactionId: String(res.data.id) } };
    }
    return { success: false, error: res.error };
  }

  async requestPayment(data: {
    amount: number;
    memo?: string;
  }): Promise<ApiResponse<{ requestId: string }>> {
    const res = await this.request<{ id: number | string }>(
      "/payments/requests",
      {
        method: "POST",
        body: { amount: data.amount, description: data.memo },
      },
    );
    if (res.success && res.data) {
      return { success: true, data: { requestId: String(res.data.id) } };
    }
    return { success: false, error: res.error };
  }
}

export const apiClient = new ApiClient();

// ----- Mock client -----

const MOCK_USER: User = {
  id: "u_1001",
  name: "Alex Morgan",
  email: "alex.morgan@example.com",
  phone: "+1 555 0142",
};

const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: "tx_1",
    type: "credit",
    amount: 2850.0,
    date: "2026-06-01T09:15:00Z",
    description: "Salary payment",
    status: "completed",
  },
  {
    id: "tx_2",
    type: "debit",
    amount: -54.2,
    date: "2026-06-02T18:42:00Z",
    description: "Coffee shop",
    status: "completed",
  },
  {
    id: "tx_3",
    type: "debit",
    amount: -1200.0,
    date: "2026-06-03T08:00:00Z",
    description: "Rent payment",
    status: "completed",
  },
  {
    id: "tx_4",
    type: "credit",
    amount: 320.5,
    date: "2026-06-04T14:05:00Z",
    description: "Refund",
    status: "completed",
  },
  {
    id: "tx_5",
    type: "debit",
    amount: -15.99,
    date: "2026-06-05T12:30:00Z",
    description: "Subscription",
    status: "pending",
  },
  {
    id: "tx_6",
    type: "debit",
    amount: -200.0,
    date: "2026-06-06T16:20:00Z",
    description: "Transfer to savings",
    status: "completed",
  },
  {
    id: "tx_7",
    type: "credit",
    amount: 940.0,
    date: "2026-06-07T10:10:00Z",
    description: "Freelance payment",
    status: "completed",
  },
];

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

let mockUser: User = { ...MOCK_USER };

class MockApiClient implements PayNextApi {
  async loadToken(): Promise<void> {
    await apiClient.loadToken();
  }

  async setToken(token: string): Promise<void> {
    await apiClient.setToken(token);
  }

  async clearToken(): Promise<void> {
    await apiClient.clearToken();
  }

  async login(
    email: string,
    password: string,
  ): Promise<ApiResponse<{ token: string; user: User }>> {
    await delay(300);
    if (!email || !password) {
      return {
        success: false,
        error: { message: "Email and password are required" },
      };
    }
    mockUser = { ...MOCK_USER, email };
    return {
      success: true,
      data: { token: "mock-token-" + Date.now(), user: mockUser },
    };
  }

  async register(data: {
    name: string;
    email: string;
    password: string;
  }): Promise<ApiResponse<{ user: User }>> {
    await delay(300);
    if (!data.email || !data.password || !data.name) {
      return {
        success: false,
        error: { message: "All fields are required" },
      };
    }
    mockUser = { ...MOCK_USER, name: data.name, email: data.email };
    return { success: true, data: { user: mockUser } };
  }

  async getUserProfile(): Promise<ApiResponse<User>> {
    await delay(150);
    return { success: true, data: mockUser };
  }

  async updateUserProfile(data: {
    name?: string;
    email?: string;
    phone?: string;
  }): Promise<ApiResponse<User>> {
    await delay(200);
    mockUser = { ...mockUser, ...data };
    return { success: true, data: mockUser };
  }

  async getBalance(): Promise<ApiResponse<BalanceData>> {
    await delay(200);
    return { success: true, data: { balance: 12450.75, currency: "USD" } };
  }

  async getTransactions(limit = 20): Promise<ApiResponse<Transaction[]>> {
    await delay(250);
    return { success: true, data: MOCK_TRANSACTIONS.slice(0, limit) };
  }

  async sendPayment(data: {
    recipient: string;
    amount: number;
    memo?: string;
  }): Promise<ApiResponse<{ transactionId: string }>> {
    await delay(400);
    if (!data.recipient || !(data.amount > 0)) {
      return {
        success: false,
        error: { message: "A recipient and amount are required" },
      };
    }
    return { success: true, data: { transactionId: "tx_" + Date.now() } };
  }

  async requestPayment(data: {
    amount: number;
    memo?: string;
  }): Promise<ApiResponse<{ requestId: string }>> {
    await delay(400);
    if (!(data.amount > 0)) {
      return {
        success: false,
        error: { message: "An amount is required" },
      };
    }
    return { success: true, data: { requestId: "req_" + Date.now() } };
  }
}

export const mockApiClient = new MockApiClient();
