import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
  useColorScheme,
  KeyboardAvoidingView,
  Platform,
  Share,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as Clipboard from "expo-clipboard";
import QRCode from "react-native-qrcode-svg";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuth } from "@/contexts/AuthContext";
import { apiClient, mockApiClient, useMockData } from "@/lib/api-client";
import { Colors, Shadow } from "@/lib/theme";

const schema = z.object({
  amount: z.coerce
    .number({ invalid_type_error: "Amount must be a number." })
    .positive("Amount must be positive.")
    .multipleOf(0.01, "At most 2 decimal places."),
  memo: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface RequestData {
  amount: number;
  memo: string;
  qrValue: string;
}

export default function RequestScreen() {
  const { user } = useAuth();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [requestData, setRequestData] = useState<RequestData | null>(null);

  const bg = isDark ? Colors.dark.background : Colors.background;
  const surface = isDark ? Colors.dark.surface : Colors.surface;
  const textPrimary = isDark ? Colors.dark.textPrimary : Colors.textPrimary;
  const textSecondary = isDark
    ? Colors.dark.textSecondary
    : Colors.textSecondary;
  const border = isDark ? Colors.dark.border : Colors.border;
  const inputBg = isDark ? "rgba(255,255,255,0.05)" : "#f8fafc";

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { amount: undefined, memo: "" },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const client = useMockData ? mockApiClient : apiClient;
      const res = await client.requestPayment({
        amount: data.amount,
        memo: data.memo,
      });
      if (res.success) {
        const paymentDetails = {
          userId: user?.id || "user",
          amount: data.amount,
          memo: data.memo || "Payment Request",
          timestamp: Date.now(),
        };
        const qrValue = `paynext://request?details=${encodeURIComponent(JSON.stringify(paymentDetails))}`;
        setRequestData({ amount: data.amount, memo: data.memo || "", qrValue });
      } else {
        Alert.alert(
          "Error",
          res.error?.message || "Failed to create payment request.",
        );
      }
    } catch (err) {
      console.error("Request error:", err);
      Alert.alert("Error", "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopy = async () => {
    if (!requestData) return;
    await Clipboard.setStringAsync(requestData.qrValue);
    Alert.alert("Copied!", "Payment link copied to clipboard.");
  };

  const handleShare = async () => {
    if (!requestData) return;
    try {
      await Share.share({
        title: "PayNext Payment Request",
        message: `Please pay me $${requestData.amount.toFixed(2)}${requestData.memo ? ` for ${requestData.memo}` : ""}.\n\n${requestData.qrValue}`,
      });
    } catch {
      handleCopy();
    }
  };

  const handleNewRequest = () => {
    setRequestData(null);
    reset();
  };

  return (
    <SafeAreaView
      style={[styles.safe, { backgroundColor: bg }]}
      edges={["top"]}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View style={styles.header}>
            <LinearGradient
              colors={["#16a34a", "#15803d"]}
              style={styles.headerIcon}
            >
              <Ionicons name="arrow-down-circle" size={22} color="#fff" />
            </LinearGradient>
            <View>
              <Text style={[styles.pageTitle, { color: textPrimary }]}>
                Request Money
              </Text>
              <Text style={[styles.pageSubtitle, { color: textSecondary }]}>
                Generate a QR payment link
              </Text>
            </View>
          </View>

          {!requestData ? (
            /* ── Form ── */
            <View
              style={[
                styles.card,
                { backgroundColor: surface, borderColor: border },
              ]}
            >
              <Text style={[styles.cardTitle, { color: textPrimary }]}>
                Create Payment Request
              </Text>

              {/* Amount */}
              <View style={styles.field}>
                <Text style={[styles.label, { color: textPrimary }]}>
                  Amount (USD)
                </Text>
                <Controller
                  control={control}
                  name="amount"
                  render={({ field: { value, onChange, onBlur } }) => (
                    <View
                      style={[
                        styles.inputWrap,
                        {
                          backgroundColor: inputBg,
                          borderColor: errors.amount ? Colors.errorMid : border,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.currencySymbol,
                          { color: textSecondary },
                        ]}
                      >
                        $
                      </Text>
                      <TextInput
                        style={[
                          styles.input,
                          styles.amountInput,
                          { color: textPrimary },
                        ]}
                        placeholder="0.00"
                        placeholderTextColor={textSecondary}
                        value={value?.toString() ?? ""}
                        onChangeText={(t) => onChange(t === "" ? undefined : t)}
                        onBlur={onBlur}
                        keyboardType="decimal-pad"
                      />
                    </View>
                  )}
                />
                {errors.amount && (
                  <Text style={styles.errorText}>{errors.amount.message}</Text>
                )}
              </View>

              {/* Memo */}
              <View style={styles.field}>
                <Text style={[styles.label, { color: textPrimary }]}>
                  Memo{" "}
                  <Text style={{ color: textSecondary, fontWeight: "400" }}>
                    (Optional)
                  </Text>
                </Text>
                <Controller
                  control={control}
                  name="memo"
                  render={({ field: { value, onChange, onBlur } }) => (
                    <View
                      style={[
                        styles.inputWrap,
                        { backgroundColor: inputBg, borderColor: border },
                      ]}
                    >
                      <Ionicons
                        name="chatbubble-outline"
                        size={16}
                        color={textSecondary}
                        style={styles.inputIcon}
                      />
                      <TextInput
                        style={[styles.input, { color: textPrimary }]}
                        placeholder="What's this request for?"
                        placeholderTextColor={textSecondary}
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                      />
                    </View>
                  )}
                />
              </View>

              <TouchableOpacity
                style={[styles.submitBtn, isSubmitting && { opacity: 0.7 }]}
                onPress={handleSubmit(onSubmit)}
                disabled={isSubmitting}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={["#16a34a", "#15803d"]}
                  style={styles.submitGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  {isSubmitting ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <>
                      <Ionicons name="qr-code" size={18} color="#fff" />
                      <Text style={styles.submitText}>Generate QR Code</Text>
                    </>
                  )}
                </LinearGradient>
              </TouchableOpacity>
            </View>
          ) : (
            /* ── QR Result ── */
            <View
              style={[
                styles.card,
                { backgroundColor: surface, borderColor: border },
              ]}
            >
              <View style={styles.qrHeader}>
                <Text style={[styles.cardTitle, { color: textPrimary }]}>
                  Your Payment Request
                </Text>
                <Text style={styles.qrAmount}>
                  ${requestData.amount.toFixed(2)}
                </Text>
                {requestData.memo !== "" && (
                  <Text style={[styles.qrMemo, { color: textSecondary }]}>
                    {requestData.memo}
                  </Text>
                )}
              </View>

              {/* QR Code */}
              <View style={styles.qrContainer}>
                <QRCode
                  value={requestData.qrValue}
                  size={200}
                  color={Colors.primaryDark}
                  backgroundColor="#ffffff"
                />
              </View>

              {/* Link preview */}
              <View
                style={[
                  styles.linkBox,
                  {
                    backgroundColor: isDark
                      ? "rgba(255,255,255,0.05)"
                      : "#f8fafc",
                    borderColor: border,
                  },
                ]}
              >
                <Text
                  style={[styles.linkText, { color: textSecondary }]}
                  numberOfLines={3}
                  selectable
                >
                  {requestData.qrValue}
                </Text>
              </View>

              {/* Action buttons */}
              <View style={styles.actionRow}>
                <TouchableOpacity
                  style={[styles.actionBtn, { borderColor: border }]}
                  onPress={handleCopy}
                  activeOpacity={0.8}
                >
                  <Ionicons name="copy-outline" size={16} color={textPrimary} />
                  <Text style={[styles.actionBtnText, { color: textPrimary }]}>
                    Copy Link
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.actionBtn, { borderColor: border }]}
                  onPress={handleShare}
                  activeOpacity={0.8}
                >
                  <Ionicons
                    name="share-outline"
                    size={16}
                    color={textPrimary}
                  />
                  <Text style={[styles.actionBtnText, { color: textPrimary }]}>
                    Share
                  </Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={styles.newRequestBtn}
                onPress={handleNewRequest}
                activeOpacity={0.7}
              >
                <Ionicons name="refresh" size={16} color={textSecondary} />
                <Text style={[styles.newRequestText, { color: textSecondary }]}>
                  New Request
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  scroll: { padding: 20, paddingBottom: 40 },

  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginBottom: 24,
  },
  headerIcon: {
    width: 46,
    height: 46,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  pageTitle: { fontSize: 20, fontWeight: "800", letterSpacing: -0.4 },
  pageSubtitle: { fontSize: 12, marginTop: 1 },

  card: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 20,
    gap: 18,
    ...Shadow.sm,
  },
  cardTitle: { fontSize: 16, fontWeight: "700" },

  field: { gap: 6 },
  label: { fontSize: 13, fontWeight: "600" },
  inputWrap: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 14,
    borderWidth: 1.5,
    paddingHorizontal: 14,
    height: 50,
  },
  inputIcon: { marginRight: 8 },
  currencySymbol: { fontSize: 16, fontWeight: "600", marginRight: 6 },
  input: { flex: 1, fontSize: 15, height: "100%" },
  amountInput: { fontSize: 24, fontWeight: "700" },
  errorText: { fontSize: 12, color: Colors.errorMid },

  submitBtn: { borderRadius: 16, overflow: "hidden" },
  submitGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 52,
    gap: 10,
  },
  submitText: { fontSize: 16, fontWeight: "700", color: "#fff" },

  // QR Result
  qrHeader: { alignItems: "center", gap: 4 },
  qrAmount: {
    fontSize: 36,
    fontWeight: "800",
    color: Colors.success,
    letterSpacing: -1,
  },
  qrMemo: { fontSize: 14 },

  qrContainer: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 20,
    ...Shadow.sm,
  },
  linkBox: { borderRadius: 12, borderWidth: 1, padding: 12 },
  linkText: {
    fontSize: 11,
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    lineHeight: 18,
  },

  actionRow: { flexDirection: "row", gap: 10 },
  actionBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderWidth: 1.5,
    borderRadius: 14,
    height: 46,
  },
  actionBtnText: { fontSize: 14, fontWeight: "600" },

  newRequestBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    height: 44,
  },
  newRequestText: { fontSize: 14, fontWeight: "500" },
});
