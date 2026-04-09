import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import TransactionHistory from "../TransactionHistory";

jest.mock("../../services/api", () => ({
  simulateApiCall: jest.fn((data) => Promise.resolve({ data })),
}));

const MockTransactionHistory = () => (
  <BrowserRouter>
    <TransactionHistory />
  </BrowserRouter>
);

describe("TransactionHistory Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders page title", async () => {
    render(<MockTransactionHistory />);
    await waitFor(() => {
      expect(screen.getByText("Transaction History")).toBeInTheDocument();
    });
  });

  test("renders summary cards", async () => {
    render(<MockTransactionHistory />);
    await waitFor(() => {
      expect(screen.getByText(/Total Received/i)).toBeInTheDocument();
      expect(screen.getByText(/Total Sent/i)).toBeInTheDocument();
      expect(screen.getByText(/Net Flow/i)).toBeInTheDocument();
    });
  });

  test("renders filter dropdown", async () => {
    render(<MockTransactionHistory />);
    await waitFor(() => {
      expect(screen.getByLabelText(/Filter/i)).toBeInTheDocument();
    });
  });

  test("displays transactions after loading", async () => {
    render(<MockTransactionHistory />);
    await waitFor(() => {
      expect(screen.getByText("Salary payment")).toBeInTheDocument();
      expect(screen.getByText("Coffee shop")).toBeInTheDocument();
    });
  });
});
