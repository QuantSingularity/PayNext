import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import SendMoney from "../SendMoney";

jest.mock("../../services/api", () => ({
  simulateApiCall: jest.fn((data) => Promise.resolve({ data })),
}));

const MockSendMoney = () => (
  <BrowserRouter>
    <SendMoney />
  </BrowserRouter>
);

describe("SendMoney Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders page title", () => {
    render(<MockSendMoney />);
    expect(screen.getByText("Send Money")).toBeInTheDocument();
  });

  test("renders recipient search field", () => {
    render(<MockSendMoney />);
    expect(
      screen.getByPlaceholderText(/Search by name or email/i),
    ).toBeInTheDocument();
  });

  test("renders list of recent recipients", () => {
    render(<MockSendMoney />);
    expect(screen.getByText("John Smith")).toBeInTheDocument();
    expect(screen.getByText("Sarah Johnson")).toBeInTheDocument();
    expect(screen.getByText("Michael Chen")).toBeInTheDocument();
  });

  test("shows error if trying to continue without selecting a recipient", async () => {
    render(<MockSendMoney />);
    const continueButton = screen.getByRole("button", { name: /Continue/i });
    fireEvent.click(continueButton);
    await waitFor(() => {
      expect(
        screen.getByText(/Please select a recipient/i),
      ).toBeInTheDocument();
    });
  });

  test("filters recipients when searching", () => {
    render(<MockSendMoney />);
    const searchField = screen.getByPlaceholderText(/Search by name or email/i);
    fireEvent.change(searchField, { target: { value: "John" } });
    expect(screen.getByText("John Smith")).toBeInTheDocument();
    expect(screen.queryByText("Sarah Johnson")).not.toBeInTheDocument();
  });

  test("shows stepper with 4 steps", () => {
    render(<MockSendMoney />);
    expect(screen.getByText("Select Recipient")).toBeInTheDocument();
    expect(screen.getByText("Enter Amount")).toBeInTheDocument();
    expect(screen.getByText("Select Payment Method")).toBeInTheDocument();
    expect(screen.getByText("Review & Confirm")).toBeInTheDocument();
  });
});
