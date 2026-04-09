import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute";

const ProtectedContent = () => <div>Protected Content</div>;
const LoginPage = () => <div>Login Page</div>;

const renderWithRouter = (initialEntry, authState = {}) => {
  if (authState.token) {
    localStorage.setItem("token", authState.token);
    localStorage.setItem("isAuthenticated", "true");
  } else {
    localStorage.clear();
  }

  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/protected"
          element={
            <ProtectedRoute>
              <ProtectedContent />
            </ProtectedRoute>
          }
        />
      </Routes>
    </MemoryRouter>,
  );
};

describe("ProtectedRoute", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("renders children when authenticated", () => {
    renderWithRouter("/protected", { token: "valid-token" });
    expect(screen.getByText("Protected Content")).toBeInTheDocument();
  });

  test("redirects to login when not authenticated", () => {
    renderWithRouter("/protected");
    expect(screen.getByText("Login Page")).toBeInTheDocument();
    expect(screen.queryByText("Protected Content")).not.toBeInTheDocument();
  });

  test("redirects to login when token is missing even if flag is set", () => {
    localStorage.setItem("isAuthenticated", "true");
    renderWithRouter("/protected");
    expect(screen.getByText("Login Page")).toBeInTheDocument();
  });
});
