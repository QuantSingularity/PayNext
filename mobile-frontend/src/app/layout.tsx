import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import BottomNav from "@/components/BottomNav";
import TopHeader from "@/components/TopHeader";
import ErrorBoundary from "@/components/ErrorBoundary";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/contexts/AuthContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "PayNext",
  description:
    "Next generation payment solution — send, receive, and manage money",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "PayNext",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className="bg-background text-foreground font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <ErrorBoundary>
              <div className="min-h-screen flex flex-col">
                <TopHeader />
                <main className="flex-grow container mx-auto max-w-md px-4 pt-4 pb-24">
                  {children}
                </main>
                <BottomNav />
                <Toaster position="top-center" richColors />
              </div>
            </ErrorBoundary>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
