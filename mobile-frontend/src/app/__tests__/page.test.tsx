import { render, screen, waitFor } from "@testing-library/react";
import HomePage from "@/app/page";
import { useAuth } from "@/contexts/AuthContext";

jest.mock("@/contexts/AuthContext");
jest.mock("@/lib/api-client", () => ({
  useMockData: true,
  apiClient: {},
  mockApiClient: {
    getBalance: jest.fn().mockResolvedValue({
      success: true,
      data: { balance: 1234.56, currency: "USD" },
    }),
    getTransactions: jest.fn().mockResolvedValue({
      success: true,
      data: [
        {
          id: "1",
          type: "debit",
          description: "Coffee Shop",
          date: "2025-04-28",
          amount: -5.5,
          currency: "USD",
          status: "completed",
        },
        {
          id: "2",
          type: "credit",
          description: "Salary Deposit",
          date: "2025-04-27",
          amount: 2500.0,
          currency: "USD",
          status: "completed",
        },
      ],
    }),
  },
}));
jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

describe("HomePage Component", () => {
  const mockUser = {
    id: "user123",
    name: "Test User",
    email: "test@example.com",
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useAuth as jest.Mock).mockReturnValue({
      user: mockUser,
      isAuthenticated: true,
      isLoading: false,
    });
  });

  it("renders the home page with balance section", async () => {
    render(<HomePage />);
    await waitFor(() => {
      expect(screen.getByText("Available Balance")).toBeInTheDocument();
    });
  });

  it("displays loading skeletons while fetching data", () => {
    render(<HomePage />);
    const skeletons = document.querySelectorAll(".animate-pulse");
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it("renders quick action buttons", async () => {
    render(<HomePage />);
    await waitFor(() => {
      expect(screen.getByText("Send")).toBeInTheDocument();
      expect(screen.getByText("Request")).toBeInTheDocument();
      expect(screen.getByText("Scan QR")).toBeInTheDocument();
    });
  });

  it("displays recent activity section", async () => {
    render(<HomePage />);
    await waitFor(() => {
      expect(screen.getByText("Recent Activity")).toBeInTheDocument();
    });
  });

  it("displays user welcome message when user is authenticated", async () => {
    render(<HomePage />);
    await waitFor(() => {
      expect(screen.getByText(/Welcome back, Test/)).toBeInTheDocument();
    });
  });

  it("formats balance correctly", async () => {
    render(<HomePage />);
    await waitFor(() => {
      expect(screen.getByText("$1234.56")).toBeInTheDocument();
    });
  });

  it("renders View All link for transactions", async () => {
    render(<HomePage />);
    await waitFor(() => {
      const viewAllLink = screen.getByRole("link", { name: /View All/i });
      expect(viewAllLink).toBeInTheDocument();
      expect(viewAllLink).toHaveAttribute("href", "/transactions");
    });
  });

  it("displays transaction descriptions after loading", async () => {
    render(<HomePage />);
    await waitFor(() => {
      expect(screen.getByText("Coffee Shop")).toBeInTheDocument();
      expect(screen.getByText("Salary Deposit")).toBeInTheDocument();
    });
  });

  it("renders empty state when no transactions", async () => {
    const { mockApiClient } = require("@/lib/api-client");
    mockApiClient.getTransactions.mockResolvedValueOnce({
      success: true,
      data: [],
    });

    render(<HomePage />);
    await waitFor(() => {
      expect(screen.getByText(/No transactions yet/i)).toBeInTheDocument();
    });
  });
});
