"use client";

import { Home, Landmark, Send, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/send", label: "Send", icon: Send },
  { href: "/request", label: "Request", icon: Landmark },
  { href: "/profile", label: "Profile", icon: User },
];

const BottomNav = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50">
      {/* Glassmorphism backdrop */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-xl border-t border-border/50 shadow-2xl" />
      <div className="relative max-w-md mx-auto flex justify-around items-center h-16 px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center flex-1 h-full gap-1 transition-all duration-200",
                isActive
                  ? "text-[#1976d2]"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <div
                className={cn(
                  "flex items-center justify-center w-10 h-6 rounded-full transition-all duration-200",
                  isActive && "bg-[#1976d2]/10",
                )}
              >
                <Icon
                  className={cn(
                    "h-5 w-5 transition-all duration-200",
                    isActive
                      ? "text-[#1976d2] scale-110"
                      : "text-muted-foreground",
                  )}
                />
              </div>
              <span
                className={cn(
                  "text-[10px] font-medium transition-all duration-200",
                  isActive ? "text-[#1976d2]" : "text-muted-foreground",
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
