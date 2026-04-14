"use client";

import { Bell } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

const pageTitles: Record<string, string> = {
  "/": "Home",
  "/send": "Send Money",
  "/request": "Request Money",
  "/transactions": "Transactions",
  "/profile": "Profile",
};

const TopHeader = () => {
  const pathname = usePathname();
  const { user } = useAuth();
  const pageTitle = pageTitles[pathname] ?? "PayNext";
  const isHome = pathname === "/";

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-background/90 backdrop-blur-xl border-b border-border/50 shadow-sm">
      <div className="max-w-md mx-auto flex items-center justify-between h-14 px-4">
        {/* Brand / Page title */}
        <Link href="/" className="flex items-center gap-2 min-w-0">
          {isHome ? (
            <span className="text-xl font-bold tracking-tight text-[#1976d2]">
              PayNext
            </span>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-base font-semibold text-[#1976d2] hidden sm:block">
                PayNext
              </span>
              <span
                className={cn(
                  "text-base font-semibold truncate text-foreground",
                  "sm:text-sm sm:font-medium sm:text-muted-foreground",
                )}
              >
                {isHome ? "" : `/ ${pageTitle}`}
              </span>
            </div>
          )}
        </Link>

        {/* Right actions */}
        <div className="flex items-center gap-1">
          {user ? (
            <>
              <button
                className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-muted/60 transition-colors text-muted-foreground relative"
                aria-label="Notifications"
              >
                <Bell className="h-4.5 w-4.5" />
                {/* Dot indicator */}
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#1976d2] border-2 border-white dark:border-background" />
              </button>
              <Link href="/profile">
                <div className="w-8 h-8 rounded-full bg-[#1976d2] flex items-center justify-center text-xs font-bold text-white shadow-sm ml-1">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()
                    .slice(0, 2)}
                </div>
              </Link>
            </>
          ) : (
            <Link
              href="/profile"
              className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-[#1976d2] text-white hover:bg-[#1565c0] transition-colors shadow-sm"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default TopHeader;
