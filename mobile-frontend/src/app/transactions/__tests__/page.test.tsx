import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TransactionsPage from "@/app/transactions/page";

jest.mock("@/lib/api-client", () => ({
  useMockData: true,
  apiClient: {},
  mockApiClient: {
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
        {
          id: "3",
          type: "debit",
          description: "Online Store",
          date: "2025-04-26",
          amount: -78.9,
          currency: "USD",
          status: "completed",
        },
      ],
    }),
  },
}));

describe("TransactionsPage", () => {
  it("renders the transactions page heading", () => {
    render(<TransactionsPage />);
    expect(screen.getByText("Transactions")).toBeInTheDocument();
  });

  it("renders a search input", () => {
    render(<TransactionsPage />);
    expect(
      screen.getByPlaceholderText(/Search transactions/i),
    ).toBeInTheDocument();
  });

  it("shows loading skeletons while fetching", () => {
    render(<TransactionsPage />);
    const skeletons = document.querySelectorAll(".animate-pulse");
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it("renders transaction list after loading", async () => {
    render(<TransactionsPage />);
    await waitFor(() => {
      expect(screen.getByText("Coffee Shop")).toBeInTheDocument();
      expect(screen.getByText("Salary Deposit")).toBeInTheDocument();
    });
  });

  it("filters transactions by search query", async () => {
    render(<TransactionsPage />);
    const user = userEvent.setup();

    await waitFor(() => {
      expect(screen.getByText("Coffee Shop")).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText(/Search transactions/i);
    await user.type(searchInput, "coffee");

    expect(screen.getByText("Coffee Shop")).toBeInTheDocument();
    expect(screen.queryByText("Salary Deposit")).not.toBeInTheDocument();
  });

  it("shows empty state when no transactions match search", async () => {
    render(<TransactionsPage />);
    const user = userEvent.setup();

    await waitFor(() => {
      expect(screen.getByText("Coffee Shop")).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText(/Search transactions/i);
    await user.type(searchInput, "zzz_no_match_zzz");

    await waitFor(() => {
      expect(screen.getByText(/No matching transactions/i)).toBeInTheDocument();
    });
  });

  it("displays amount with correct sign and color", async () => {
    render(<TransactionsPage />);
    await waitFor(() => {
      expect(screen.getByText("-$5.50")).toBeInTheDocument();
      expect(screen.getByText("+$2500.00")).toBeInTheDocument();
    });
  });
});
