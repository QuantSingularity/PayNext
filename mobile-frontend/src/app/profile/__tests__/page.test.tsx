import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProfilePage from "@/app/profile/page";
import { useAuth } from "@/contexts/AuthContext";

jest.mock("@/contexts/AuthContext");

describe("ProfilePage Component", () => {
  const mockUser = {
    id: "user123",
    name: "Test User",
    email: "test@example.com",
    avatarUrl: "https://example.com/avatar.jpg",
  };

  const mockLogout = jest.fn();
  const mockUpdateProfile = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useAuth as jest.Mock).mockReturnValue({
      user: mockUser,
      isAuthenticated: true,
      isLoading: false,
      logout: mockLogout,
      updateProfile: mockUpdateProfile,
    });
  });

  it("renders user profile information", () => {
    render(<ProfilePage />);
    expect(screen.getByText("Test User")).toBeInTheDocument();
    expect(screen.getByText("test@example.com")).toBeInTheDocument();
  });

  it("shows user ID", () => {
    render(<ProfilePage />);
    expect(screen.getByText(/ID: user123/i)).toBeInTheDocument();
  });

  it("displays loading spinner when isLoading is true", () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: null,
      isAuthenticated: false,
      isLoading: true,
      logout: mockLogout,
      updateProfile: mockUpdateProfile,
    });
    render(<ProfilePage />);
    expect(document.querySelector(".animate-spin")).toBeInTheDocument();
  });

  it("renders edit icon button on profile header", () => {
    render(<ProfilePage />);
    expect(
      screen.getByRole("button", { name: /Edit Profile/i }),
    ).toBeInTheDocument();
  });

  it("renders Settings, Notifications, Security menu items", () => {
    render(<ProfilePage />);
    expect(screen.getByText("Preferences")).toBeInTheDocument();
    expect(screen.getByText("Notifications")).toBeInTheDocument();
    expect(screen.getByText("Security")).toBeInTheDocument();
  });

  it("renders Log Out button", () => {
    render(<ProfilePage />);
    expect(
      screen.getByRole("button", { name: /Log Out/i }),
    ).toBeInTheDocument();
  });

  it("renders user avatar image", () => {
    render(<ProfilePage />);
    const avatar = screen.getByAltText("Test User");
    expect(avatar).toBeInTheDocument();
  });

  it("opens edit dialog when edit button is clicked", async () => {
    render(<ProfilePage />);
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: /Edit Profile/i }));
    await waitFor(() => {
      expect(
        screen.getByText(/Make changes to your profile here/i),
      ).toBeInTheDocument();
    });
  });

  it("edit dialog has name and email fields pre-filled", async () => {
    render(<ProfilePage />);
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: /Edit Profile/i }));
    await waitFor(() => {
      expect(screen.getByDisplayValue("Test User")).toBeInTheDocument();
      expect(screen.getByDisplayValue("test@example.com")).toBeInTheDocument();
    });
  });

  it("calls updateProfile on dialog save", async () => {
    mockUpdateProfile.mockResolvedValueOnce(true);
    render(<ProfilePage />);
    const user = userEvent.setup();

    await user.click(screen.getByRole("button", { name: /Edit Profile/i }));
    await waitFor(() => {
      expect(screen.getByDisplayValue("Test User")).toBeInTheDocument();
    });

    const nameInput = screen.getByDisplayValue("Test User");
    await user.clear(nameInput);
    await user.type(nameInput, "Updated Name");

    await user.click(screen.getByRole("button", { name: /Save changes/i }));
    await waitFor(() => {
      expect(mockUpdateProfile).toHaveBeenCalledWith({
        name: "Updated Name",
        email: "test@example.com",
      });
    });
  });

  it("opens logout confirmation dialog", async () => {
    render(<ProfilePage />);
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: /Log Out/i }));
    await waitFor(() => {
      expect(
        screen.getByText(/Are you sure you want to log out/i),
      ).toBeInTheDocument();
    });
  });

  it("calls logout when confirmed in dialog", async () => {
    render(<ProfilePage />);
    const user = userEvent.setup();

    await user.click(screen.getByRole("button", { name: /Log Out/i }));
    await waitFor(() =>
      expect(
        screen.getByText(/Are you sure you want to log out/i),
      ).toBeInTheDocument(),
    );

    const confirmLogout = screen.getAllByRole("button", {
      name: /Log Out/i,
    })[1];
    await user.click(confirmLogout);
    expect(mockLogout).toHaveBeenCalled();
  });
});
