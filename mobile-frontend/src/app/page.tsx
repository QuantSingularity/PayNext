"use client";

import {
  ArrowDownLeft,
  ArrowUpRight,
  ChevronRight,
  Landmark,
  QrCode,
  Send,
  Sparkles,
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

export default function HomePage() {
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
          const balanceData = balanceResponse.data as BalanceData;
          setBalance(balanceData.balance);
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
          const detailsParam = url.searchParams.get("details");
          if (detailsParam) {
            const details = JSON.parse(decodeURIComponent(detailsParam));
            router.push(
              `/send?recipient=${details.userId}&amount=${details.amount}&memo=${encodeURIComponent(details.memo || "")}`,
            );
            toast.success("Opening payment form...");
          }
        } else if (action === "pay") {
          const detailsParam = url.searchParams.get("details");
          if (detailsParam) {
            const details = JSON.parse(decodeURIComponent(detailsParam));
            router.push(
              `/send?recipient=${details.recipient}&amount=${details.amount}`,
            );
            toast.success("Opening payment form...");
          }
        } else {
          toast.info(`QR Code Scanned: ${decodedText}`);
        }
      } else {
        router.push(`/send?recipient=${encodeURIComponent(decodedText)}`);
        toast.info("Recipient scanned. Opening payment form...");
      }
    } catch (error) {
      console.error("Failed to parse QR code:", error);
      toast.error("Invalid QR code format");
    }
  };

  const handleScanFailure = (_error: unknown) => {
    // Silently handle scan failures
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="space-y-5">
      {/* Hero Balance Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-blue-500 to-violet-600 p-6 text-white shadow-xl shadow-blue-500/20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMDUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-50" />
        <div className="relative">
          <div className="flex items-center justify-between mb-4">
            <div>
              {user ? (
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold">
                    {getInitials(user.name)}
                  </div>
                  <p className="text-sm text-white/80">
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
          <div className="flex flex-col items-center justify-center gap-2 rounded-2xl bg-card border border-border/60 p-4 h-24 shadow-sm hover:shadow-md hover:border-blue-200 transition-all cursor-pointer group">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50 transition-colors">
              <Send className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <span className="text-xs font-medium text-foreground/80">Send</span>
          </div>
        </Link>

        <Link href="/request" passHref>
          <div className="flex flex-col items-center justify-center gap-2 rounded-2xl bg-card border border-border/60 p-4 h-24 shadow-sm hover:shadow-md hover:border-green-200 transition-all cursor-pointer group">
            <div className="w-10 h-10 rounded-xl bg-green-50 dark:bg-green-900/30 flex items-center justify-center group-hover:bg-green-100 dark:group-hover:bg-green-900/50 transition-colors">
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
              <div className="w-10 h-10 rounded-xl bg-violet-50 dark:bg-violet-900/30 flex items-center justify-center group-hover:bg-violet-100 dark:group-hover:bg-violet-900/50 transition-colors">
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
                  onScanFailure={handleScanFailure}
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
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 -mr-2 h-8 gap-1 text-xs font-medium"
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
                    className={`w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center ${
                      tx.amount < 0
                        ? "bg-red-50 dark:bg-red-900/20"
                        : "bg-green-50 dark:bg-green-900/20"
                    }`}
                  >
                    {tx.amount < 0 ? (
                      <ArrowUpRight className="h-4.5 w-4.5 text-red-500 dark:text-red-400" />
                    ) : (
                      <ArrowDownLeft className="h-4.5 w-4.5 text-green-500 dark:text-green-400" />
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
                          className={`ml-2 inline-flex items-center rounded-full px-1.5 py-0.5 text-[10px] font-medium ${
                            tx.status === "completed"
                              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                              : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                          }`}
                        >
                          {tx.status}
                        </span>
                      )}
                    </p>
                  </div>
                  <p
                    className={`font-semibold text-sm tabular-nums flex-shrink-0 ${
                      tx.amount < 0
                        ? "text-red-600 dark:text-red-400"
                        : "text-green-600 dark:text-green-400"
                    }`}
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
