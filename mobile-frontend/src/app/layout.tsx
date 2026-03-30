import type { Metadata, Viewport } from "next"; // Import Viewport type
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import BottomNav from "@/components/BottomNav";
import ErrorBoundary from "@/components/ErrorBoundary";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/contexts/AuthContext";

const inter = Inter({ subsets: ["latin"] });

// Separate Metadata and Viewport exports
export const metadata: Metadata = {
  title: "PayNext Mobile",
  description: "Modern mobile frontend for PayNext",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-background text-foreground`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <ErrorBoundary>
              <div className="min-h-screen flex flex-col">
                <main className="flex-grow container mx-auto p-4 pb-20">
                  {children}
                </main>
                <BottomNav />
                <Toaster />
              </div>
            </ErrorBoundary>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
