import { render, waitFor } from "@testing-library/react";
import QrScanner from "@/components/QrScanner";

const mockRender = jest.fn();
const mockClear = jest.fn().mockResolvedValue(undefined);
const MockHtml5QrcodeScanner = jest.fn().mockImplementation(() => ({
  render: mockRender,
  clear: mockClear,
}));

jest.mock("html5-qrcode", () => ({
  Html5QrcodeScanner: MockHtml5QrcodeScanner,
  Html5QrcodeScanType: {
    SCAN_TYPE_CAMERA: "camera",
    SCAN_TYPE_FILE: "file",
  },
}));

describe("QrScanner Component", () => {
  const mockOnScanSuccess = jest.fn();
  const mockOnScanFailure = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the scanner container div with correct id", () => {
    const { container } = render(
      <QrScanner
        onScanSuccess={mockOnScanSuccess}
        onScanFailure={mockOnScanFailure}
      />,
    );
    expect(
      container.querySelector("#html5qr-code-full-region"),
    ).toBeInTheDocument();
  });

  it("initializes Html5QrcodeScanner on mount", async () => {
    render(
      <QrScanner
        onScanSuccess={mockOnScanSuccess}
        onScanFailure={mockOnScanFailure}
      />,
    );
    await waitFor(() => {
      expect(MockHtml5QrcodeScanner).toHaveBeenCalledTimes(1);
    });
  });

  it("calls scanner.render with callbacks", async () => {
    render(
      <QrScanner
        onScanSuccess={mockOnScanSuccess}
        onScanFailure={mockOnScanFailure}
      />,
    );
    await waitFor(() => {
      expect(mockRender).toHaveBeenCalledWith(
        expect.any(Function),
        expect.any(Function),
      );
    });
  });

  it("calls scanner.clear on unmount", async () => {
    const { unmount } = render(
      <QrScanner
        onScanSuccess={mockOnScanSuccess}
        onScanFailure={mockOnScanFailure}
      />,
    );
    await waitFor(() => expect(MockHtml5QrcodeScanner).toHaveBeenCalled());
    unmount();
    await waitFor(() => {
      expect(mockClear).toHaveBeenCalled();
    });
  });

  it("works without optional onScanFailure prop", () => {
    const { container } = render(
      <QrScanner onScanSuccess={mockOnScanSuccess} />,
    );
    expect(
      container.querySelector("#html5qr-code-full-region"),
    ).toBeInTheDocument();
  });

  it("does not re-initialize scanner when props update", async () => {
    const { rerender } = render(
      <QrScanner onScanSuccess={mockOnScanSuccess} />,
    );
    await waitFor(() =>
      expect(MockHtml5QrcodeScanner).toHaveBeenCalledTimes(1),
    );

    rerender(<QrScanner onScanSuccess={jest.fn()} />);
    await waitFor(() => {
      expect(MockHtml5QrcodeScanner).toHaveBeenCalledTimes(1);
    });
  });

  it("initializes scanner with camera scan type", async () => {
    render(<QrScanner onScanSuccess={mockOnScanSuccess} />);
    await waitFor(() => {
      expect(MockHtml5QrcodeScanner).toHaveBeenCalledWith(
        "html5qr-code-full-region",
        expect.objectContaining({
          supportedScanTypes: ["camera"],
        }),
        false,
      );
    });
  });
});
