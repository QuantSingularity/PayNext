"use client";

import {
  ArrowDownLeft,
  ArrowRight,
  ArrowUpRight,
  ChevronRight,
  Landmark,
  QrCode,
  Send,
  Shield,
  Sparkles,
  TrendingUp,
  Wallet,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import QrScanner from "@/components/QrScanner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/contexts/AuthContext";
import { apiClient, mockApiClient, useMockData } from "@/lib/api-client";

interface Transaction {
  id: string;
  type: string;
  description: string;
  date: string;
  amount: number;
  currency: string;
  status?: string;
}

interface BalanceData {
  balance: number;
  currency: string;
}

function LandingPage() {
  const router = useRouter();

  const features = [
    {
      icon: <Zap className="h-6 w-6 text-white" />,
      bg: "#1976d2",
      title: "Fast Transactions",
      description:
        "Send and receive money instantly with lightning-fast payment processing.",
    },
    {
      icon: <Shield className="h-6 w-6 text-white" />,
      bg: "#1565c0",
      title: "Secure Payments",
      description:
        "Bank-level security ensures your money and personal information are always protected.",
    },
    {
      icon: <Wallet className="h-6 w-6 text-white" />,
      bg: "#0d47a1",
      title: "Multi-Platform",
      description:
        "Access your account from any device, anywhere, anytime with our responsive platform.",
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-white" />,
      bg: "#1976d2",
      title: "Financial Management",
      description:
        "Track your spending, set budgets, and manage your finances all in one place.",
    },
  ];

  const steps = [
    {
      number: "1",
      title: "Create Your Account",
      description:
        "Sign up in minutes with just your email and basic information. No paperwork required.",
    },
    {
      number: "2",
      title: "Link Payment Methods",
      description:
        "Connect your bank account, credit cards, or other payment sources securely.",
    },
    {
      number: "3",
      title: "Start Transacting",
      description:
        "Send money, make payments, and manage your finances with ease.",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Small Business Owner",
      initials: "SJ",
      content:
        "PayNext has revolutionized how I handle business payments. The interface is intuitive and transactions are lightning fast!",
    },
    {
      name: "Michael Chen",
      role: "Freelance Developer",
      initials: "MC",
      content:
        "I receive payments from clients worldwide with minimal fees and maximum security. The dashboard makes tracking everything a breeze.",
    },
    {
      name: "Emily Rodriguez",
      role: "E-commerce Manager",
      initials: "ER",
      content:
        "The integration capabilities have streamlined our entire payment process. Customer satisfaction is up 40%!",
    },
  ];

  return (
    <div className="-mx-4 -mt-4 overflow-hidden">
      {/* Hero */}
      <div
        className="relative overflow-hidden px-6 pt-10 pb-14 text-white"
        style={{
          background: "linear-gradient(135deg, #1976d2 0%, #1565c0 100%)",
        }}
      >
        <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-white/10 pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-white/5 pointer-events-none" />
        <div className="relative">
          <div className="inline-flex items-center gap-1.5 bg-white/15 rounded-full px-3 py-1 text-xs font-medium mb-5">
            <Sparkles className="h-3 w-3" />
            Next Generation Payments
          </div>
          <h1 className="text-3xl font-bold leading-tight mb-3">
            Next Generation
            <br />
            Payment Solution
          </h1>
          <p className="text-base text-white/85 leading-relaxed mb-7">
            Send, receive, and manage your money with ease. Fast, secure, and
            designed for the modern world.
          </p>
          <div className="flex gap-3">
            <Button
              className="flex-1 h-11 rounded-lg font-semibold text-sm shadow-lg border-0"
              style={{ backgroundColor: "#9c27b0", color: "#fff" }}
              onClick={() => router.push("/profile")}
            >
              Get Started
            </Button>
            <Button
              variant="outline"
              className="flex-1 h-11 rounded-lg font-semibold text-sm bg-transparent text-white border-white hover:bg-white/10 hover:text-white"
              onClick={() => router.push("/profile")}
            >
              Sign In
            </Button>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="px-4 py-10">
        <div className="text-center mb-7">
          <h2 className="text-2xl font-bold mb-2">Why Choose PayNext</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Cutting-edge technology with user-friendly design for the best
            payment experience.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {features.map((f, i) => (
            <Card
              key={i}
              className="rounded-2xl border-border/60 shadow-sm hover:shadow-md transition-shadow"
            >
              <CardContent className="p-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 shadow-sm"
                  style={{ backgroundColor: f.bg }}
                >
                  {f.icon}
                </div>
                <h3 className="text-sm font-semibold mb-1">{f.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {f.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-muted/40 px-4 py-10">
        <div className="text-center mb-7">
          <h2 className="text-2xl font-bold mb-2">How It Works</h2>
          <p className="text-sm text-muted-foreground">
            Get started with PayNext in three simple steps
          </p>
        </div>
        <div className="space-y-5">
          {steps.map((step, i) => (
            <div key={i} className="flex items-start gap-4">
              <div
                className="w-11 h-11 rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold text-lg shadow-md"
                style={{ backgroundColor: "#1976d2" }}
              >
                {step.number}
              </div>
              <div className="pt-1">
                <h3 className="text-sm font-semibold mb-0.5">{step.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        <Button
          className="w-full mt-8 h-11 rounded-xl font-semibold text-sm shadow-md border-0"
          style={{ backgroundColor: "#1976d2", color: "#fff" }}
          onClick={() => router.push("/profile")}
        >
          Get Started Now
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      {/* Testimonials */}
      <div className="px-4 py-10">
        <div className="text-center mb-7">
          <h2 className="text-2xl font-bold mb-2">What Our Users Say</h2>
          <p className="text-sm text-muted-foreground">
            Join thousands of satisfied users who trust PayNext
          </p>
        </div>
        <div className="space-y-4">
          {testimonials.map((t, i) => (
            <Card key={i} className="rounded-2xl border-border/60 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-11 h-11 rounded-full flex-shrink-0 flex items-center justify-center text-white text-sm font-bold shadow-sm"
                    style={{ backgroundColor: "#1976d2" }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground italic leading-relaxed">
                  &ldquo;{t.content}&rdquo;
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div
        className="px-6 py-12 text-center text-white"
        style={{
          background: "linear-gradient(135deg, #1976d2 0%, #1565c0 100%)",
        }}
      >
        <h2 className="text-2xl font-bold mb-3">Ready to Get Started?</h2>
        <p className="text-sm text-white/85 leading-relaxed mb-7">
          Join thousands of users who trust PayNext for their payment needs.
          Sign up today and experience the future of payments.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Button
            className="h-11 px-6 rounded-xl font-semibold text-sm shadow-lg border-0"
            style={{ backgroundColor: "#9c27b0", color: "#fff" }}
            onClick={() => router.push("/profile")}
          >
            Create Account
          </Button>
          <Button
            variant="outline"
            className="h-11 px-6 rounded-xl font-semibold text-sm bg-transparent text-white border-white hover:bg-white/10 hover:text-white"
            onClick={() => router.push("/profile")}
          >
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
}

function Dashboard() {
  const [balance, setBalance] = useState<number | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const client = useMockData ? mockApiClient : apiClient;
        const [balanceResponse, transactionResponse] = await Promise.all([
          client.getBalance(),
          client.getTransactions(5),
        ]);
        if (balanceResponse.success && balanceResponse.data) {
          setBalance((balanceResponse.data as BalanceData).balance);
        } else {
          toast.error("Failed to load balance data");
        }
        if (transactionResponse.success && transactionResponse.data) {
          setTransactions(transactionResponse.data as Transaction[]);
        } else {
          toast.error("Failed to load transaction data");
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
        toast.error("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleScanSuccess = async (
    decodedText: string,
    decodedResult: unknown,
  ) => {
    console.log(`Scan result: ${decodedText}`, decodedResult);
    setIsScannerOpen(false);
    try {
      if (decodedText.startsWith("paynext://")) {
        const url = new URL(decodedText);
        const action = url.hostname;
        if (action === "request") {
          const dp = url.searchParams.get("details");
          if (dp) {
            const d = JSON.parse(decodeURIComponent(dp));
            router.push(
              `/send?recipient=${d.userId}&amount=${d.amount}&memo=${encodeURIComponent(d.memo || "")}`,
            );
            toast.success("Opening payment form...");
          }
        } else if (action === "pay") {
          const dp = url.searchParams.get("details");
          if (dp) {
            const d = JSON.parse(decodeURIComponent(dp));
            router.push(`/send?recipient=${d.recipient}&amount=${d.amount}`);
            toast.success("Opening payment form...");
          }
        } else {
          toast.info(`QR Code Scanned: ${decodedText}`);
        }
      } else {
        router.push(`/send?recipient=${encodeURIComponent(decodedText)}`);
        toast.info("Recipient scanned. Opening payment form...");
      }
    } catch {
      toast.error("Invalid QR code format");
    }
  };

  const formatDate = (ds: string) => {
    try {
      return new Date(ds).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return ds;
    }
  };

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  return (
    <div className="space-y-5">
      {/* Balance Card */}
      <div
        className="relative overflow-hidden rounded-2xl p-6 text-white"
        style={{
          background: "linear-gradient(135deg, #1976d2 0%, #1565c0 100%)",
          boxShadow: "0 8px 32px rgba(25,118,210,0.35)",
        }}
      >
        <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/10 pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-44 h-44 rounded-full bg-white/5 pointer-events-none" />
        <div className="relative">
          <div className="flex items-center justify-between mb-4">
            <div>
              {user ? (
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-white/20 border border-white/30 flex items-center justify-center text-xs font-bold">
                    {getInitials(user.name)}
                  </div>
                  <p className="text-sm text-white/85 font-medium">
                    Welcome back, {user.name.split(" ")[0]}
                  </p>
                </div>
              ) : (
                <p className="text-sm text-white/70">Your Wallet</p>
              )}
            </div>
            <Sparkles className="h-5 w-5 text-white/40" />
          </div>
          <p className="text-sm text-white/70 mb-1">Available Balance</p>
          {loading ? (
            <Skeleton className="h-12 w-48 bg-white/20 rounded-xl" />
          ) : (
            <p className="text-5xl font-bold tracking-tight">
              ${balance !== null ? balance.toFixed(2) : "—"}
            </p>
          )}
          <p className="text-xs text-white/50 mt-3">USD • PayNext Wallet</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-3">
        <Link href="/send" passHref>
          <div className="flex flex-col items-center justify-center gap-2 rounded-2xl bg-card border border-border/60 p-4 h-24 shadow-sm hover:shadow-md hover:border-[#1976d2]/30 transition-all cursor-pointer group">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
              <Send className="h-5 w-5 text-[#1976d2]" />
            </div>
            <span className="text-xs font-medium text-foreground/80">Send</span>
          </div>
        </Link>

        <Link href="/request" passHref>
          <div className="flex flex-col items-center justify-center gap-2 rounded-2xl bg-card border border-border/60 p-4 h-24 shadow-sm hover:shadow-md hover:border-green-200 transition-all cursor-pointer group">
            <div className="w-10 h-10 rounded-xl bg-green-50 dark:bg-green-900/30 flex items-center justify-center group-hover:bg-green-100 transition-colors">
              <Landmark className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <span className="text-xs font-medium text-foreground/80">
              Request
            </span>
          </div>
        </Link>

        <Dialog open={isScannerOpen} onOpenChange={setIsScannerOpen}>
          <DialogTrigger asChild>
            <div className="flex flex-col items-center justify-center gap-2 rounded-2xl bg-card border border-border/60 p-4 h-24 shadow-sm hover:shadow-md hover:border-violet-200 transition-all cursor-pointer group">
              <div className="w-10 h-10 rounded-xl bg-violet-50 dark:bg-violet-900/30 flex items-center justify-center group-hover:bg-violet-100 transition-colors">
                <QrCode className="h-5 w-5 text-violet-600 dark:text-violet-400" />
              </div>
              <span className="text-xs font-medium text-foreground/80">
                Scan QR
              </span>
            </div>
          </DialogTrigger>
          <DialogContent className="max-w-md w-full p-0 rounded-2xl overflow-hidden">
            <DialogHeader className="p-5 border-b bg-muted/30">
              <DialogTitle className="text-base">Scan QR Code</DialogTitle>
            </DialogHeader>
            <div className="p-5">
              {isScannerOpen && (
                <QrScanner
                  onScanSuccess={handleScanSuccess}
                  onScanFailure={() => {}}
                />
              )}
            </div>
            <DialogClose asChild>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute top-4 right-4 h-8 w-8 p-0 rounded-full"
              >
                <span className="sr-only">Close</span>
                <span aria-hidden>✕</span>
              </Button>
            </DialogClose>
          </DialogContent>
        </Dialog>
      </div>

      {/* Recent Transactions */}
      <Card className="rounded-2xl border-border/60 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-3 pt-5 px-5">
          <CardTitle className="text-base font-semibold">
            Recent Activity
          </CardTitle>
          <Link href="/transactions">
            <Button
              variant="ghost"
              size="sm"
              className="text-[#1976d2] hover:text-[#1565c0] -mr-2 h-8 gap-1 text-xs font-medium"
            >
              View All
              <ChevronRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent className="px-5 pb-5">
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-xl flex-shrink-0" />
                  <div className="flex-1 space-y-1.5">
                    <Skeleton className="h-3.5 w-32" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                  <Skeleton className="h-4 w-16" />
                </div>
              ))}
            </div>
          ) : transactions.length > 0 ? (
            <ul className="space-y-1">
              {transactions.map((tx) => (
                <li
                  key={tx.id}
                  className="flex items-center gap-3 py-2.5 rounded-xl hover:bg-muted/50 transition-colors -mx-2 px-2"
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center ${tx.amount < 0 ? "bg-red-50 dark:bg-red-900/20" : "bg-green-50 dark:bg-green-900/20"}`}
                  >
                    {tx.amount < 0 ? (
                      <ArrowUpRight className="h-4 w-4 text-red-500" />
                    ) : (
                      <ArrowDownLeft className="h-4 w-4 text-green-500" />
                    )}
                  </div>
                  <div className="flex-grow min-w-0">
                    <p className="font-medium text-sm truncate">
                      {tx.description}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {formatDate(tx.date)}
                      {tx.status && (
                        <span
                          className={`ml-2 inline-flex items-center rounded-full px-1.5 py-0.5 text-[10px] font-medium ${tx.status === "completed" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}
                        >
                          {tx.status}
                        </span>
                      )}
                    </p>
                  </div>
                  <p
                    className={`font-semibold text-sm tabular-nums flex-shrink-0 ${tx.amount < 0 ? "text-red-600" : "text-green-600"}`}
                  >
                    {tx.amount < 0 ? "-" : "+"}${Math.abs(tx.amount).toFixed(2)}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-col items-center py-8 gap-2">
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-1">
                <ArrowDownLeft className="h-6 w-6 text-muted-foreground" />
              </div>
              <p className="text-sm font-medium text-muted-foreground">
                No transactions yet
              </p>
              <p className="text-xs text-muted-foreground/70">
                Your activity will appear here
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default function HomePage() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="space-y-5">
        <Skeleton className="h-40 w-full rounded-2xl" />
        <div className="grid grid-cols-3 gap-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-24 rounded-2xl" />
          ))}
        </div>
        <Skeleton className="h-64 w-full rounded-2xl" />
      </div>
    );
  }

  return isAuthenticated ? <Dashboard /> : <LandingPage />;
}
