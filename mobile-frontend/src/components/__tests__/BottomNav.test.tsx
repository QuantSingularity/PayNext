import { render, screen } from "@testing-library/react";
import { usePathname } from "next/navigation";
import BottomNav from "@/components/BottomNav";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

describe("BottomNav Component", () => {
  beforeEach(() => {
    (usePathname as jest.Mock).mockReturnValue("/");
  });

  it("renders all four navigation items", () => {
    render(<BottomNav />);
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Send")).toBeInTheDocument();
    expect(screen.getByText("Request")).toBeInTheDocument();
    expect(screen.getByText("Profile")).toBeInTheDocument();
  });

  it("highlights the active Home route", () => {
    (usePathname as jest.Mock).mockReturnValue("/");
    render(<BottomNav />);
    const homeLink = screen.getByText("Home").closest("a");
    expect(homeLink).toHaveClass("text-primary");
  });

  it("highlights the active Send route", () => {
    (usePathname as jest.Mock).mockReturnValue("/send");
    render(<BottomNav />);
    const sendLink = screen.getByText("Send").closest("a");
    expect(sendLink).toHaveClass("text-primary");
  });

  it("highlights the active Request route", () => {
    (usePathname as jest.Mock).mockReturnValue("/request");
    render(<BottomNav />);
    const requestLink = screen.getByText("Request").closest("a");
    expect(requestLink).toHaveClass("text-primary");
  });

  it("highlights the active Profile route", () => {
    (usePathname as jest.Mock).mockReturnValue("/profile");
    render(<BottomNav />);
    const profileLink = screen.getByText("Profile").closest("a");
    expect(profileLink).toHaveClass("text-primary");
  });

  it("renders correct href for each nav item", () => {
    render(<BottomNav />);
    expect(screen.getByText("Home").closest("a")).toHaveAttribute("href", "/");
    expect(screen.getByText("Send").closest("a")).toHaveAttribute(
      "href",
      "/send",
    );
    expect(screen.getByText("Request").closest("a")).toHaveAttribute(
      "href",
      "/request",
    );
    expect(screen.getByText("Profile").closest("a")).toHaveAttribute(
      "href",
      "/profile",
    );
  });

  it("inactive items do not have text-primary class", () => {
    (usePathname as jest.Mock).mockReturnValue("/");
    render(<BottomNav />);
    const sendLink = screen.getByText("Send").closest("a");
    expect(sendLink).not.toHaveClass("text-primary");
  });

  it("nav element has fixed bottom positioning", () => {
    const { container } = render(<BottomNav />);
    const nav = container.querySelector("nav");
    expect(nav).toHaveClass("fixed", "bottom-0");
  });

  it("nav has z-index for overlay", () => {
    const { container } = render(<BottomNav />);
    const nav = container.querySelector("nav");
    expect(nav).toHaveClass("z-50");
  });
});
