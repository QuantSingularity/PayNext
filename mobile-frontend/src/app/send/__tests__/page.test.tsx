import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useSearchParams } from "next/navigation";
import SendPage from "@/app/send/page";

jest.mock("next/navigation", () => ({
  useSearchParams: jest.fn(),
  useRouter: () => ({ push: jest.fn() }),
}));

jest.mock("@/lib/api-client", () => ({
  useMockData: true,
  apiClient: {},
  mockApiClient: {
    sendPayment: jest.fn().mockResolvedValue({
      success: true,
      data: { transactionId: "txn_test_123", status: "completed" },
    }),
  },
}));

describe("SendPage Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn().mockReturnValue(null),
    });
  });

  it("renders the send money page heading", () => {
    render(<SendPage />);
    expect(screen.getByText("Send Money")).toBeInTheDocument();
  });

  it("renders all form fields", () => {
    render(<SendPage />);
    expect(screen.getByLabelText(/Recipient/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Amount \(\$\)/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Memo/i)).toBeInTheDocument();
  });

  it("renders the send button", () => {
    render(<SendPage />);
    expect(
      screen.getByRole("button", { name: /Send Money/i }),
    ).toBeInTheDocument();
  });

  it("pre-fills recipient from URL params", () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: (key: string) => (key === "recipient" ? "john_doe" : null),
    });
    render(<SendPage />);
    expect(screen.getByDisplayValue("john_doe")).toBeInTheDocument();
  });

  it("pre-fills amount from URL params", () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: (key: string) => (key === "amount" ? "100.5" : null),
    });
    render(<SendPage />);
    expect(screen.getByDisplayValue("100.5")).toBeInTheDocument();
  });

  it("pre-fills memo from URL params", () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: (key: string) => (key === "memo" ? "Test payment" : null),
    });
    render(<SendPage />);
    expect(screen.getByDisplayValue("Test payment")).toBeInTheDocument();
  });

  it("shows validation error for empty recipient", async () => {
    render(<SendPage />);
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: /Send Money/i }));
    await waitFor(() => {
      expect(
        screen.getByText(/Recipient must be at least 3 characters/i),
      ).toBeInTheDocument();
    });
  });

  it("shows validation error for missing amount", async () => {
    render(<SendPage />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/Recipient/i), "john_doe");
    await user.click(screen.getByRole("button", { name: /Send Money/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/Amount must be a positive number/i),
      ).toBeInTheDocument();
    });
  });

  it("shows validation error for negative amount", async () => {
    render(<SendPage />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/Recipient/i), "john_doe");
    await user.type(screen.getByLabelText(/Amount/i), "-10");
    await user.click(screen.getByRole("button", { name: /Send Money/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/Amount must be a positive number/i),
      ).toBeInTheDocument();
    });
  });

  it("shows success confirmation after successful payment", async () => {
    render(<SendPage />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/Recipient/i), "alice");
    await user.type(screen.getByLabelText(/Amount/i), "50");
    await user.click(screen.getByRole("button", { name: /Send Money/i }));

    await waitFor(() => {
      expect(screen.getByText("Payment sent!")).toBeInTheDocument();
    });
  });

  it("shows transaction reference after successful payment", async () => {
    render(<SendPage />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/Recipient/i), "alice");
    await user.type(screen.getByLabelText(/Amount/i), "50");
    await user.click(screen.getByRole("button", { name: /Send Money/i }));

    await waitFor(() => {
      expect(screen.getByText(/txn_test_123/)).toBeInTheDocument();
    });
  });

  it("disables submit button while submitting", async () => {
    const { mockApiClient } = require("@/lib/api-client");
    let resolvePayment: (v: unknown) => void;
    mockApiClient.sendPayment.mockReturnValueOnce(
      new Promise((r) => {
        resolvePayment = r;
      }),
    );

    render(<SendPage />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/Recipient/i), "alice");
    await user.type(screen.getByLabelText(/Amount/i), "10");
    await user.click(screen.getByRole("button", { name: /Send Money/i }));

    await waitFor(() => {
      expect(screen.getByRole("button", { name: /Sending/i })).toBeDisabled();
    });

    resolvePayment!({ success: true, data: { transactionId: "txn_x" } });
  });
});
