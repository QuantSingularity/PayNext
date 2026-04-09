import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ForgotPassword from "../ForgotPassword";

const MockForgotPassword = () => (
  <BrowserRouter>
    <ForgotPassword />
  </BrowserRouter>
);

describe("ForgotPassword Page", () => {
  test("renders forgot password form", () => {
    render(<MockForgotPassword />);
    expect(screen.getByText("Forgot Password")).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Send Reset Link/i }),
    ).toBeInTheDocument();
  });

  test("shows error when email is empty", async () => {
    render(<MockForgotPassword />);
    fireEvent.click(screen.getByRole("button", { name: /Send Reset Link/i }));
    await waitFor(() => {
      expect(
        screen.getByText(/Please enter your email address/i),
      ).toBeInTheDocument();
    });
  });

  test("shows error for invalid email format", async () => {
    render(<MockForgotPassword />);
    fireEvent.change(screen.getByLabelText(/Email Address/i), {
      target: { value: "notanemail" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Send Reset Link/i }));
    await waitFor(() => {
      expect(
        screen.getByText(/Please enter a valid email address/i),
      ).toBeInTheDocument();
    });
  });

  test("shows success message after valid submission", async () => {
    render(<MockForgotPassword />);
    fireEvent.change(screen.getByLabelText(/Email Address/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Send Reset Link/i }));
    await waitFor(
      () => {
        expect(
          screen.getByText(/Password reset instructions/i),
        ).toBeInTheDocument();
      },
      { timeout: 3000 },
    );
  });

  test("renders back to sign in link", () => {
    render(<MockForgotPassword />);
    expect(screen.getByText(/Back to Sign In/i)).toBeInTheDocument();
  });
});
