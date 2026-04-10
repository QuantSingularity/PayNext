import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RequestPage from "@/app/request/page";
import { useAuth } from "@/contexts/AuthContext";

jest.mock("@/contexts/AuthContext");
jest.mock("qrcode.react", () => ({
  QRCodeCanvas: ({ value }: { value: string }) => (
    <div data-testid="qr-canvas" data-value={value} />
  ),
}));
jest.mock("@/lib/api-client", () => ({
  useMockData: true,
  apiClient: {},
  mockApiClient: {
    requestPayment: jest.fn().mockResolvedValue({
      success: true,
      data: {
        requestId: "req_test_123",
        qrCode: "paynext://request?details={}",
      },
    }),
  },
}));

describe("RequestPage Component", () => {
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

  it("renders the request money page heading", () => {
    render(<RequestPage />);
    expect(screen.getByText("Request Money")).toBeInTheDocument();
  });

  it("renders amount and memo fields", () => {
    render(<RequestPage />);
    expect(screen.getByLabelText(/Amount \(\$\)/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Memo/i)).toBeInTheDocument();
  });

  it("renders generate QR code button", () => {
    render(<RequestPage />);
    expect(
      screen.getByRole("button", { name: /Generate QR Code/i }),
    ).toBeInTheDocument();
  });

  it("shows validation error when submitting without amount", async () => {
    render(<RequestPage />);
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: /Generate QR Code/i }));
    await waitFor(() => {
      expect(
        screen.getByText(/Amount must be a positive number/i),
      ).toBeInTheDocument();
    });
  });

  it("does not show QR code initially", () => {
    render(<RequestPage />);
    expect(screen.queryByTestId("qr-canvas")).not.toBeInTheDocument();
  });

  it("shows QR code after successful form submission", async () => {
    render(<RequestPage />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/Amount/i), "25");
    await user.type(screen.getByLabelText(/Memo/i), "lunch split");
    await user.click(screen.getByRole("button", { name: /Generate QR Code/i }));

    await waitFor(() => {
      expect(screen.getByTestId("qr-canvas")).toBeInTheDocument();
    });
  });

  it("shows amount in QR result view", async () => {
    render(<RequestPage />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/Amount/i), "42");
    await user.click(screen.getByRole("button", { name: /Generate QR Code/i }));

    await waitFor(() => {
      expect(screen.getByText("$42.00")).toBeInTheDocument();
    });
  });

  it("shows Copy Link and Share buttons in QR view", async () => {
    render(<RequestPage />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/Amount/i), "10");
    await user.click(screen.getByRole("button", { name: /Generate QR Code/i }));

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: /Copy Link/i }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /Share/i }),
      ).toBeInTheDocument();
    });
  });

  it("resets to form when 'New Request' is clicked", async () => {
    render(<RequestPage />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/Amount/i), "10");
    await user.click(screen.getByRole("button", { name: /Generate QR Code/i }));

    await waitFor(() => {
      expect(screen.getByTestId("qr-canvas")).toBeInTheDocument();
    });

    await user.click(screen.getByRole("button", { name: /New Request/i }));

    await waitFor(() => {
      expect(screen.queryByTestId("qr-canvas")).not.toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /Generate QR Code/i }),
      ).toBeInTheDocument();
    });
  });

  it("copies payment link to clipboard", async () => {
    Object.assign(navigator, {
      clipboard: { writeText: jest.fn().mockResolvedValue(undefined) },
    });

    render(<RequestPage />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/Amount/i), "10");
    await user.click(screen.getByRole("button", { name: /Generate QR Code/i }));
    await waitFor(() =>
      expect(screen.getByTestId("qr-canvas")).toBeInTheDocument(),
    );

    await user.click(screen.getByRole("button", { name: /Copy Link/i }));
    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalled();
    });
  });
});
