import { render, screen, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";

// Mock api-client
jest.mock("@/lib/api-client", () => ({
  useMockData: false,
  apiClient: {
    setToken: jest.fn(),
    clearToken: jest.fn(),
    login: jest.fn(),
    register: jest.fn(),
    getUserProfile: jest.fn(),
    updateUserProfile: jest.fn(),
  },
  mockApiClient: {
    getUserProfile: jest.fn().mockResolvedValue({
      success: true,
      data: {
        id: "user_123",
        name: "Alex Johnson",
        email: "alex@example.com",
        avatarUrl: "",
      },
    }),
    updateUserProfile: jest.fn().mockResolvedValue({ success: true, data: {} }),
  },
}));

import { apiClient, mockApiClient } from "@/lib/api-client";

// A test consumer component
const TestConsumer = () => {
  const {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    register,
    updateProfile,
  } = useAuth();
  return (
    <div>
      <div data-testid="loading">{isLoading ? "loading" : "ready"}</div>
      <div data-testid="authenticated">{isAuthenticated ? "yes" : "no"}</div>
      <div data-testid="user-name">{user?.name || "none"}</div>
      <button onClick={() => login("a@b.com", "pw")}>Login</button>
      <button onClick={() => logout()}>Logout</button>
      <button onClick={() => register("Alice", "a@b.com", "pw123")}>
        Register
      </button>
      <button onClick={() => updateProfile({ name: "New Name" })}>
        Update
      </button>
    </div>
  );
};

describe("AuthContext", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
    (apiClient.getUserProfile as jest.Mock).mockResolvedValue({
      success: false,
      data: null,
    });
  });

  it("throws if useAuth is used outside AuthProvider", () => {
    const spy = jest.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<TestConsumer />)).toThrow(
      "useAuth must be used within an AuthProvider",
    );
    spy.mockRestore();
  });

  it("starts in loading state then transitions to ready", async () => {
    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>,
    );
    expect(screen.getByTestId("loading").textContent).toBe("loading");
    await waitFor(() => {
      expect(screen.getByTestId("loading").textContent).toBe("ready");
    });
  });

  it("initializes with no authenticated user when no token stored", async () => {
    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>,
    );
    await waitFor(() => {
      expect(screen.getByTestId("authenticated").textContent).toBe("no");
      expect(screen.getByTestId("user-name").textContent).toBe("none");
    });
  });

  it("refreshes user on mount when token exists in localStorage", async () => {
    localStorage.setItem("auth_token", "existing_token");
    (apiClient.getUserProfile as jest.Mock).mockResolvedValue({
      success: true,
      data: { id: "u1", name: "Bob", email: "bob@x.com" },
    });

    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId("user-name").textContent).toBe("Bob");
    });
  });

  it("login sets user and calls apiClient.login", async () => {
    (apiClient.login as jest.Mock).mockResolvedValue({
      success: true,
      data: {
        token: "jwt_abc",
        user: { id: "u2", name: "Carol", email: "carol@x.com" },
      },
    });

    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>,
    );
    await waitFor(() =>
      expect(screen.getByTestId("loading").textContent).toBe("ready"),
    );

    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "Login" }));

    await waitFor(() => {
      expect(screen.getByTestId("authenticated").textContent).toBe("yes");
      expect(screen.getByTestId("user-name").textContent).toBe("Carol");
    });
    expect(apiClient.setToken).toHaveBeenCalledWith("jwt_abc");
  });

  it("login shows error toast on failure", async () => {
    (apiClient.login as jest.Mock).mockResolvedValue({
      success: false,
      error: { message: "Invalid credentials", status: 401 },
    });

    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>,
    );
    await waitFor(() =>
      expect(screen.getByTestId("loading").textContent).toBe("ready"),
    );

    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "Login" }));

    await waitFor(() => {
      expect(screen.getByTestId("authenticated").textContent).toBe("no");
    });
  });

  it("logout clears user and calls apiClient.clearToken", async () => {
    (apiClient.login as jest.Mock).mockResolvedValue({
      success: true,
      data: {
        token: "jwt_abc",
        user: { id: "u2", name: "Carol", email: "carol@x.com" },
      },
    });

    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>,
    );
    await waitFor(() =>
      expect(screen.getByTestId("loading").textContent).toBe("ready"),
    );

    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "Login" }));
    await waitFor(() =>
      expect(screen.getByTestId("authenticated").textContent).toBe("yes"),
    );

    await user.click(screen.getByRole("button", { name: "Logout" }));
    await waitFor(() => {
      expect(screen.getByTestId("authenticated").textContent).toBe("no");
      expect(screen.getByTestId("user-name").textContent).toBe("none");
    });
    expect(apiClient.clearToken).toHaveBeenCalled();
  });

  it("register calls apiClient.register with correct args", async () => {
    (apiClient.register as jest.Mock).mockResolvedValue({ success: true });

    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>,
    );
    await waitFor(() =>
      expect(screen.getByTestId("loading").textContent).toBe("ready"),
    );

    const user = userEvent.setup();
    await act(async () => {
      await user.click(screen.getByRole("button", { name: "Register" }));
    });

    expect(apiClient.register).toHaveBeenCalledWith({
      name: "Alice",
      email: "a@b.com",
      password: "pw123",
    });
  });

  it("updateProfile merges new data into user state", async () => {
    (apiClient.login as jest.Mock).mockResolvedValue({
      success: true,
      data: {
        token: "jwt_abc",
        user: { id: "u2", name: "Carol", email: "carol@x.com" },
      },
    });
    (apiClient.updateUserProfile as jest.Mock).mockResolvedValue({
      success: true,
    });

    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>,
    );
    await waitFor(() =>
      expect(screen.getByTestId("loading").textContent).toBe("ready"),
    );

    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "Login" }));
    await waitFor(() =>
      expect(screen.getByTestId("user-name").textContent).toBe("Carol"),
    );

    await user.click(screen.getByRole("button", { name: "Update" }));
    await waitFor(() => {
      expect(screen.getByTestId("user-name").textContent).toBe("New Name");
    });
  });
});
