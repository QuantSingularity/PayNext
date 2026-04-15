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
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Link, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuth } from "@/contexts/AuthContext";
import { Colors, Shadow } from "@/lib/theme";

const schema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});
type FormData = z.infer<typeof schema>;

export default function LoginScreen() {
  const { login } = useAuth();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    const success = await login(data.email, data.password);
    setIsLoading(false);
    if (success) {
      router.replace("/tabs");
    } else {
      Alert.alert(
        "Login Failed",
        "Invalid email or password. Please try again.",
      );
    }
  };

  return (
    <SafeAreaView
      style={[styles.safe, { backgroundColor: bg }]}
      edges={["top", "bottom"]}
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
          {/* Hero */}
          <LinearGradient
            colors={[Colors.primary, Colors.primaryDark]}
            style={styles.hero}
          >
            <View style={styles.heroDecor1} />
            <View style={styles.heroDecor2} />
            <View style={styles.logoWrap}>
              <View style={styles.logoIcon}>
                <Ionicons name="wallet" size={32} color={Colors.primary} />
              </View>
              <Text style={styles.logoText}>PayNext</Text>
            </View>
            <Text style={styles.heroTagline}>Next Generation Payments</Text>
          </LinearGradient>

          {/* Form Card */}
          <View
            style={[
              styles.card,
              { backgroundColor: surface, borderColor: border },
            ]}
          >
            <Text style={[styles.cardTitle, { color: textPrimary }]}>
              Welcome back
            </Text>
            <Text style={[styles.cardSubtitle, { color: textSecondary }]}>
              Sign in to your account
            </Text>

            {/* Email */}
            <View style={styles.field}>
              <Text style={[styles.label, { color: textPrimary }]}>Email</Text>
              <Controller
                control={control}
                name="email"
                render={({ field: { value, onChange, onBlur } }) => (
                  <View
                    style={[
                      styles.inputWrap,
                      {
                        backgroundColor: inputBg,
                        borderColor: errors.email ? Colors.errorMid : border,
                      },
                    ]}
                  >
                    <Ionicons
                      name="mail-outline"
                      size={18}
                      color={textSecondary}
                      style={styles.inputIcon}
                    />
                    <TextInput
                      style={[styles.input, { color: textPrimary }]}
                      placeholder="you@example.com"
                      placeholderTextColor={textSecondary}
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      autoCapitalize="none"
                      keyboardType="email-address"
                      textContentType="emailAddress"
                      autoComplete="email"
                    />
                  </View>
                )}
              />
              {errors.email && (
                <Text style={styles.errorText}>{errors.email.message}</Text>
              )}
            </View>

            {/* Password */}
            <View style={styles.field}>
              <View style={styles.labelRow}>
                <Text style={[styles.label, { color: textPrimary }]}>
                  Password
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    Alert.alert(
                      "Reset Password",
                      "Password reset will be sent to your email.",
                    )
                  }
                >
                  <Text style={[styles.forgotLink, { color: Colors.primary }]}>
                    Forgot password?
                  </Text>
                </TouchableOpacity>
              </View>
              <Controller
                control={control}
                name="password"
                render={({ field: { value, onChange, onBlur } }) => (
                  <View
                    style={[
                      styles.inputWrap,
                      {
                        backgroundColor: inputBg,
                        borderColor: errors.password ? Colors.errorMid : border,
                      },
                    ]}
                  >
                    <Ionicons
                      name="lock-closed-outline"
                      size={18}
                      color={textSecondary}
                      style={styles.inputIcon}
                    />
                    <TextInput
                      style={[styles.input, { color: textPrimary }]}
                      placeholder="••••••••"
                      placeholderTextColor={textSecondary}
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      secureTextEntry={!showPassword}
                      textContentType="password"
                      autoComplete="password"
                    />
                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                      style={styles.eyeBtn}
                    >
                      <Ionicons
                        name={showPassword ? "eye-off-outline" : "eye-outline"}
                        size={18}
                        color={textSecondary}
                      />
                    </TouchableOpacity>
                  </View>
                )}
              />
              {errors.password && (
                <Text style={styles.errorText}>{errors.password.message}</Text>
              )}
            </View>

            {/* Submit */}
            <TouchableOpacity
              style={[styles.submitBtn, isLoading && { opacity: 0.7 }]}
              onPress={handleSubmit(onSubmit)}
              disabled={isLoading}
              activeOpacity={0.85}
            >
              <LinearGradient
                colors={[Colors.primary, Colors.primaryDark]}
                style={styles.submitGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                {isLoading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <>
                    <Text style={styles.submitText}>Sign In</Text>
                    <Ionicons
                      name="arrow-forward"
                      size={18}
                      color="rgba(255,255,255,0.8)"
                    />
                  </>
                )}
              </LinearGradient>
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.dividerRow}>
              <View style={[styles.dividerLine, { backgroundColor: border }]} />
              <Text style={[styles.dividerText, { color: textSecondary }]}>
                or
              </Text>
              <View style={[styles.dividerLine, { backgroundColor: border }]} />
            </View>

            {/* Register link */}
            <View style={styles.registerRow}>
              <Text style={[styles.registerPrompt, { color: textSecondary }]}>
                Don't have an account?
              </Text>
              <Link href="/auth/register" asChild>
                <TouchableOpacity>
                  <Text
                    style={[styles.registerLink, { color: Colors.primary }]}
                  >
                    Sign Up
                  </Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>

          {/* Demo hint */}
          <View
            style={[
              styles.demoBox,
              {
                backgroundColor: isDark ? "rgba(25,118,210,0.1)" : "#e3f2fd",
                borderColor: isDark ? "rgba(25,118,210,0.3)" : "#90caf9",
              },
            ]}
          >
            <Ionicons
              name="information-circle-outline"
              size={16}
              color={Colors.primary}
            />
            <Text style={[styles.demoText, { color: Colors.primary }]}>
              Demo mode: any email &amp; password works
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  scroll: { flexGrow: 1 },

  hero: {
    paddingTop: 60,
    paddingBottom: 48,
    paddingHorizontal: 24,
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
  },
  heroDecor1: {
    position: "absolute",
    top: -40,
    right: -40,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: "rgba(255,255,255,0.08)",
  },
  heroDecor2: {
    position: "absolute",
    bottom: -60,
    left: -60,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "rgba(255,255,255,0.05)",
  },
  logoWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
  },
  logoIcon: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    ...Shadow.md,
  },
  logoText: {
    fontSize: 32,
    fontWeight: "900",
    color: "#fff",
    letterSpacing: -1,
  },
  heroTagline: {
    fontSize: 14,
    color: "rgba(255,255,255,0.75)",
    fontWeight: "500",
  },

  card: {
    margin: 20,
    borderRadius: 24,
    borderWidth: 1,
    padding: 24,
    gap: 18,
    ...Shadow.md,
  },
  cardTitle: { fontSize: 22, fontWeight: "800", letterSpacing: -0.5 },
  cardSubtitle: { fontSize: 14, marginTop: -10 },

  field: { gap: 6 },
  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: { fontSize: 13, fontWeight: "600" },
  forgotLink: { fontSize: 13, fontWeight: "600" },
  inputWrap: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 14,
    borderWidth: 1.5,
    paddingHorizontal: 14,
    height: 52,
  },
  inputIcon: { marginRight: 10, flexShrink: 0 },
  input: { flex: 1, fontSize: 15 },
  eyeBtn: { padding: 4, marginLeft: 4 },
  errorText: { fontSize: 12, color: Colors.errorMid },

  submitBtn: { borderRadius: 16, overflow: "hidden", marginTop: 4 },
  submitGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 54,
    gap: 10,
  },
  submitText: { fontSize: 16, fontWeight: "800", color: "#fff" },

  dividerRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  dividerLine: { flex: 1, height: 1 },
  dividerText: { fontSize: 13, fontWeight: "500" },

  registerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  registerPrompt: { fontSize: 14 },
  registerLink: { fontSize: 14, fontWeight: "700" },

  demoBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  demoText: { fontSize: 12, fontWeight: "500", flex: 1 },
});
