import React, { useEffect, useState, useMemo } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  useColorScheme,
  Alert,
  RefreshControl,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  apiClient,
  mockApiClient,
  useMockData,
  type Transaction,
} from "@/lib/api-client";
import { formatDate } from "@/lib/utils";
import { Colors, Shadow } from "@/lib/theme";

type FilterType = "all" | "credit" | "debit";

export default function TransactionsScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");

  const bg = isDark ? Colors.dark.background : Colors.background;
  const surface = isDark ? Colors.dark.surface : Colors.surface;
  const textPrimary = isDark ? Colors.dark.textPrimary : Colors.textPrimary;
  const textSecondary = isDark
    ? Colors.dark.textSecondary
    : Colors.textSecondary;
  const border = isDark ? Colors.dark.border : Colors.border;

  const load = async () => {
    try {
      const client = useMockData ? mockApiClient : apiClient;
      const res = await client.getTransactions(50);
      if (res.success && res.data) {
        setTransactions(res.data as Transaction[]);
      } else {
        Alert.alert("Error", "Failed to load transactions.");
      }
    } catch (err) {
      console.error("TX load error:", err);
      Alert.alert("Error", "Network error. Pull down to retry.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    load();
  };

  const filtered = useMemo(() => {
    let list = transactions;
    if (filter !== "all") list = list.filter((tx) => tx.type === filter);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (tx) =>
          tx.description.toLowerCase().includes(q) ||
          tx.date.includes(q) ||
          String(Math.abs(tx.amount)).includes(q),
      );
    }
    return list;
  }, [transactions, query, filter]);

  const totalIn = useMemo(
    () =>
      transactions
        .filter((tx) => tx.amount > 0)
        .reduce((s, tx) => s + tx.amount, 0),
    [transactions],
  );
  const totalOut = useMemo(
    () =>
      transactions
        .filter((tx) => tx.amount < 0)
        .reduce((s, tx) => s + Math.abs(tx.amount), 0),
    [transactions],
  );

  const renderItem = ({
    item: tx,
    index,
  }: {
    item: Transaction;
    index: number;
  }) => (
    <View
      style={[
        styles.txRow,
        {
          borderBottomColor: border,
          borderBottomWidth: index === filtered.length - 1 ? 0 : 1,
        },
      ]}
    >
      <View
        style={[
          styles.txIcon,
          {
            backgroundColor:
              tx.amount < 0
                ? isDark
                  ? "rgba(239,68,68,0.15)"
                  : "#fef2f2"
                : isDark
                  ? "rgba(34,197,94,0.15)"
                  : "#f0fdf4",
          },
        ]}
      >
        <Ionicons
          name={tx.amount < 0 ? "arrow-up" : "arrow-down"}
          size={18}
          color={tx.amount < 0 ? Colors.errorMid : Colors.successMid}
        />
      </View>
      <View style={styles.txInfo}>
        <Text style={[styles.txDesc, { color: textPrimary }]} numberOfLines={1}>
          {tx.description}
        </Text>
        <View style={styles.txMeta}>
          <Text style={[styles.txDate, { color: textSecondary }]}>
            {formatDate(tx.date)}
          </Text>
          {tx.status && (
            <View
              style={[
                styles.statusBadge,
                {
                  backgroundColor:
                    tx.status === "completed"
                      ? isDark
                        ? "rgba(34,197,94,0.15)"
                        : "#dcfce7"
                      : isDark
                        ? "rgba(245,158,11,0.15)"
                        : "#fef3c7",
                },
              ]}
            >
              <Text
                style={[
                  styles.statusText,
                  {
                    color:
                      tx.status === "completed"
                        ? Colors.success
                        : Colors.warning,
                  },
                ]}
              >
                {tx.status}
              </Text>
            </View>
          )}
        </View>
      </View>
      <Text
        style={[
          styles.txAmount,
          { color: tx.amount < 0 ? Colors.errorMid : Colors.successMid },
        ]}
      >
        {tx.amount < 0 ? "-" : "+"}${Math.abs(tx.amount).toFixed(2)}
      </Text>
    </View>
  );

  const FilterPill = ({
    label,
    value,
  }: {
    label: string;
    value: FilterType;
  }) => (
    <TouchableOpacity
      style={[
        styles.filterPill,
        filter === value
          ? styles.filterPillActive
          : { borderColor: border, backgroundColor: surface },
      ]}
      onPress={() => setFilter(value)}
    >
      <Text
        style={[
          styles.filterPillText,
          { color: filter === value ? "#fff" : textSecondary },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView
      style={[styles.safe, { backgroundColor: bg }]}
      edges={["top"]}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={[styles.pageTitle, { color: textPrimary }]}>
              Transactions
            </Text>
            <Text style={[styles.pageSubtitle, { color: textSecondary }]}>
              Your complete payment history
            </Text>
          </View>
        </View>

        {/* Summary Cards */}
        <View style={styles.summaryRow}>
          <View
            style={[
              styles.summaryCard,
              {
                backgroundColor: isDark ? "rgba(34,197,94,0.12)" : "#f0fdf4",
                borderColor: isDark ? "rgba(34,197,94,0.2)" : "#bbf7d0",
              },
            ]}
          >
            <Ionicons name="arrow-down" size={16} color={Colors.successMid} />
            <Text style={[styles.summaryLabel, { color: Colors.success }]}>
              Money In
            </Text>
            <Text style={[styles.summaryValue, { color: Colors.success }]}>
              ${totalIn.toFixed(2)}
            </Text>
          </View>
          <View
            style={[
              styles.summaryCard,
              {
                backgroundColor: isDark ? "rgba(239,68,68,0.12)" : "#fef2f2",
                borderColor: isDark ? "rgba(239,68,68,0.2)" : "#fecaca",
              },
            ]}
          >
            <Ionicons name="arrow-up" size={16} color={Colors.errorMid} />
            <Text style={[styles.summaryLabel, { color: Colors.error }]}>
              Money Out
            </Text>
            <Text style={[styles.summaryValue, { color: Colors.error }]}>
              ${totalOut.toFixed(2)}
            </Text>
          </View>
        </View>

        {/* Search */}
        <View
          style={[
            styles.searchWrap,
            { backgroundColor: surface, borderColor: border },
          ]}
        >
          <Ionicons
            name="search-outline"
            size={18}
            color={textSecondary}
            style={{ marginRight: 8 }}
          />
          <TextInput
            style={[styles.searchInput, { color: textPrimary }]}
            placeholder="Search transactions..."
            placeholderTextColor={textSecondary}
            value={query}
            onChangeText={setQuery}
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery("")}>
              <Ionicons name="close-circle" size={18} color={textSecondary} />
            </TouchableOpacity>
          )}
        </View>

        {/* Filter pills */}
        <View style={styles.filters}>
          <FilterPill label="All" value="all" />
          <FilterPill label="Received" value="credit" />
          <FilterPill label="Sent" value="debit" />
        </View>

        {/* List */}
        {loading ? (
          <View style={styles.loadingWrap}>
            <ActivityIndicator size="large" color={Colors.primary} />
          </View>
        ) : (
          <FlatList
            data={filtered}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            style={[
              styles.list,
              { backgroundColor: surface, borderColor: border },
            ]}
            contentContainerStyle={
              filtered.length === 0 ? { flex: 1 } : undefined
            }
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={[Colors.primary]}
                tintColor={Colors.primary}
              />
            }
            ListEmptyComponent={
              <View style={styles.emptyState}>
                <View
                  style={[
                    styles.emptyIcon,
                    {
                      backgroundColor: isDark ? Colors.dark.border : "#f1f5f9",
                    },
                  ]}
                >
                  <Ionicons
                    name={query ? "search-outline" : "receipt-outline"}
                    size={28}
                    color={textSecondary}
                  />
                </View>
                <Text style={[styles.emptyTitle, { color: textPrimary }]}>
                  {query ? "No matching transactions" : "No transactions yet"}
                </Text>
                <Text style={[styles.emptySub, { color: textSecondary }]}>
                  {query
                    ? "Try a different search term"
                    : "Your activity will appear here"}
                </Text>
              </View>
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: { flex: 1, padding: 20, gap: 14 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pageTitle: { fontSize: 24, fontWeight: "800", letterSpacing: -0.5 },
  pageSubtitle: { fontSize: 13, marginTop: 2 },

  summaryRow: { flexDirection: "row", gap: 12 },
  summaryCard: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 1,
    padding: 14,
    gap: 4,
  },
  summaryLabel: {
    fontSize: 11,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginTop: 2,
  },
  summaryValue: { fontSize: 18, fontWeight: "800", letterSpacing: -0.5 },

  searchWrap: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 14,
    borderWidth: 1.5,
    paddingHorizontal: 14,
    height: 48,
  },
  searchInput: { flex: 1, fontSize: 15, height: "100%" },

  filters: { flexDirection: "row", gap: 8 },
  filterPill: {
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1.5,
  },
  filterPillActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  filterPillText: { fontSize: 13, fontWeight: "600" },

  list: {
    flex: 1,
    borderRadius: 20,
    borderWidth: 1,
    overflow: "hidden",
    ...Shadow.sm,
  },
  loadingWrap: { flex: 1, alignItems: "center", justifyContent: "center" },

  txRow: { flexDirection: "row", alignItems: "center", padding: 16, gap: 12 },
  txIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  txInfo: { flex: 1, minWidth: 0, gap: 3 },
  txDesc: { fontSize: 14, fontWeight: "600" },
  txMeta: { flexDirection: "row", alignItems: "center", gap: 6 },
  txDate: { fontSize: 12 },
  txAmount: { fontSize: 14, fontWeight: "700", flexShrink: 0 },
  statusBadge: { paddingHorizontal: 7, paddingVertical: 2, borderRadius: 8 },
  statusText: { fontSize: 10, fontWeight: "700", textTransform: "capitalize" },

  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 40,
  },
  emptyIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  emptyTitle: { fontSize: 16, fontWeight: "700" },
  emptySub: { fontSize: 13, textAlign: "center" },
});
