import { useColorScheme as _useColorScheme } from "react-native";

/**
 * Wrapper around React Native's useColorScheme for consistent usage.
 */
export function useColorScheme() {
  return _useColorScheme() ?? "light";
}
