"use client";

import { ArrowDownLeft, ArrowUpRight, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
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

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const loadTransactions = async () => {
      setLoading(true);
      try {
        const client = useMockData ? mockApiClient : apiClient;
        const response = await client.getTransactions(50);
        if (response.success && response.data) {
          setTransactions(response.data as Transaction[]);
        } else {
          toast.error("Failed to load transactions");
        }
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
        toast.error("Failed to load transactions");
      } finally {
        setLoading(false);
      }
    };
    loadTransactions();
  }, []);

  const filtered = useMemo(() => {
    if (!searchQuery.trim()) return transactions;
    const q = searchQuery.toLowerCase();
    return transactions.filter(
      (tx) =>
        tx.description.toLowerCase().includes(q) ||
        tx.date.includes(q) ||
        String(Math.abs(tx.amount)).includes(q),
    );
  }, [transactions, searchQuery]);

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-bold tracking-tight">Transactions</h1>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search transactions..."
          className="pl-9 rounded-xl h-11 bg-muted/30 border-border/50"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Transaction List */}
      <div className="rounded-2xl border border-border/60 bg-card shadow-sm overflow-hidden">
        {loading ? (
          <div className="divide-y divide-border/40">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-3 p-4">
                <Skeleton className="h-10 w-10 rounded-xl flex-shrink-0" />
                <div className="flex-1 space-y-1.5">
                  <Skeleton className="h-3.5 w-36" />
                  <Skeleton className="h-3 w-24" />
                </div>
                <Skeleton className="h-4 w-16" />
              </div>
            ))}
          </div>
        ) : filtered.length > 0 ? (
          <ul className="divide-y divide-border/40">
            {filtered.map((tx) => (
              <li
                key={tx.id}
                className="flex items-center gap-3 p-4 hover:bg-muted/40 transition-colors"
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
          <div className="flex flex-col items-center py-12 gap-2 text-center px-4">
            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-1">
              <Search className="h-5 w-5 text-muted-foreground" />
            </div>
            <p className="text-sm font-medium text-muted-foreground">
              {searchQuery ? "No matching transactions" : "No transactions yet"}
            </p>
            <p className="text-xs text-muted-foreground/60">
              {searchQuery
                ? "Try a different search term"
                : "Your transactions will appear here"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
