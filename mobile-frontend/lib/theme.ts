// Reconstructed module. The original lib/theme was missing from the repository.
// Keys are derived from every Colors.* and Shadow.* reference in the app. Values
// are a coherent default fintech palette and standard elevation presets; review and
// adjust to match the intended brand design.

import { ViewStyle } from "react-native";

export const Colors = {
  primary: "#4f46e5",
  primaryDark: "#3730a3",
  background: "#f8fafc",
  surface: "#ffffff",
  border: "#e2e8f0",
  textPrimary: "#0f172a",
  textSecondary: "#64748b",
  success: "#15803d",
  successMid: "#22c55e",
  error: "#b91c1c",
  errorMid: "#ef4444",
  warning: "#f59e0b",
  // Dark-theme variants, selected at runtime via useColorScheme().
  dark: {
    background: "#0f172a",
    surface: "#1e293b",
    border: "#334155",
    textPrimary: "#f1f5f9",
    textSecondary: "#94a3b8",
  },
} as const;

export const Shadow: Record<"sm" | "md" | "lg", ViewStyle> = {
  sm: {
    shadowColor: "#0f172a",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: "#0f172a",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: "#0f172a",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
  },
};
