import React, { useEffect, useState } from "react";
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
  Modal,
  Switch,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";
import { getInitials } from "@/lib/utils";
import { Colors, Shadow } from "@/lib/theme";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email."),
  phone: z.string().optional(),
});
type ProfileForm = z.infer<typeof profileSchema>;

export default function ProfileScreen() {
  const { user, logout, updateProfile, isLoading } = useAuth();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const [editOpen, setEditOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [biometricEnabled, setBiometricEnabled] = useState(false);

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
  } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
    },
  });

  useEffect(() => {
    if (user)
      reset({ name: user.name, email: user.email, phone: user.phone || "" });
  }, [user, reset]);

  const onProfileSubmit = async (values: ProfileForm) => {
    setIsSubmitting(true);
    const success = await updateProfile({
      name: values.name,
      email: values.email,
      phone: values.phone,
    });
    setIsSubmitting(false);
    if (success) {
      Alert.alert("Success", "Profile updated successfully!");
      setEditOpen(false);
    } else {
      Alert.alert("Error", "Failed to update profile. Please try again.");
    }
  };

  const handleLogout = () => {
    Alert.alert(
      "Log Out",
      "Are you sure you want to log out of your account?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Log Out",
          style: "destructive",
          onPress: async () => {
            await logout();
            router.replace("/auth/login");
          },
        },
      ],
    );
  };

  if (isLoading || !user) {
    return (
      <SafeAreaView
        style={[styles.safe, { backgroundColor: bg }]}
        edges={["top"]}
      >
        <View style={styles.loadingWrap}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      </SafeAreaView>
    );
  }

  const menuSections = [
    {
      title: "Account",
      items: [
        {
          icon: "person-outline" as const,
          label: "Edit Profile",
          sub: "Update name, email & phone",
          iconBg: isDark ? "rgba(25,118,210,0.2)" : "#e3f2fd",
          iconColor: Colors.primary,
          onPress: () => setEditOpen(true),
          rightElement: null,
        },
        {
          icon: "card-outline" as const,
          label: "Payment Methods",
          sub: "Manage linked accounts",
          iconBg: isDark ? "rgba(124,58,237,0.2)" : "#f3e8ff",
          iconColor: "#7c3aed",
          onPress: () =>
            Alert.alert(
              "Coming Soon",
              "Payment methods management coming soon!",
            ),
          rightElement: null,
        },
        {
          icon: "document-text-outline" as const,
          label: "Transaction History",
          sub: "Full statement & exports",
          iconBg: isDark ? "rgba(245,124,0,0.2)" : "#fff3e0",
          iconColor: Colors.warning,
          onPress: () => router.push("/tabs/transactions"),
          rightElement: null,
        },
      ],
    },
    {
      title: "Preferences",
      items: [
        {
          icon: "notifications-outline" as const,
          label: "Push Notifications",
          sub: "Alerts for transactions & offers",
          iconBg: isDark ? "rgba(245,124,0,0.2)" : "#fff3e0",
          iconColor: Colors.warning,
          onPress: () => setNotificationsEnabled(!notificationsEnabled),
          rightElement: (
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: border, true: Colors.primary }}
              thumbColor="#fff"
            />
          ),
        },
        {
          icon: "finger-print-outline" as const,
          label: "Biometric Auth",
          sub: "Face ID / Fingerprint unlock",
          iconBg: isDark ? "rgba(46,125,50,0.2)" : "#e8f5e9",
          iconColor: Colors.success,
          onPress: () => setBiometricEnabled(!biometricEnabled),
          rightElement: (
            <Switch
              value={biometricEnabled}
              onValueChange={setBiometricEnabled}
              trackColor={{ false: border, true: Colors.primary }}
              thumbColor="#fff"
            />
          ),
        },
      ],
    },
    {
      title: "Security & Legal",
      items: [
        {
          icon: "shield-checkmark-outline" as const,
          label: "Security",
          sub: "Password & 2FA settings",
          iconBg: isDark ? "rgba(25,118,210,0.2)" : "#e3f2fd",
          iconColor: Colors.primary,
          onPress: () =>
            Alert.alert("Coming Soon", "Security settings coming soon!"),
          rightElement: null,
        },
        {
          icon: "help-circle-outline" as const,
          label: "Help & Support",
          sub: "FAQs & contact us",
          iconBg: isDark ? "rgba(100,116,139,0.2)" : "#f1f5f9",
          iconColor: textSecondary,
          onPress: () =>
            Alert.alert("Support", "Contact us at support@paynext.com"),
          rightElement: null,
        },
        {
          icon: "document-outline" as const,
          label: "Privacy Policy",
          sub: "How we handle your data",
          iconBg: isDark ? "rgba(100,116,139,0.2)" : "#f1f5f9",
          iconColor: textSecondary,
          onPress: () =>
            Alert.alert("Coming Soon", "Privacy policy coming soon!"),
          rightElement: null,
        },
      ],
    },
  ];

  return (
    <SafeAreaView
      style={[styles.safe, { backgroundColor: bg }]}
      edges={["top"]}
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Page title */}
        <View style={styles.pageTitleRow}>
          <Text style={[styles.pageTitle, { color: textPrimary }]}>
            Profile
          </Text>
          <Text style={[styles.pageSubtitle, { color: textSecondary }]}>
            Manage your account
          </Text>
        </View>

        {/* Profile Header Card */}
        <LinearGradient
          colors={[Colors.primary, Colors.primaryDark]}
          style={styles.profileCard}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.decorCircle1} />
          <View style={styles.decorCircle2} />
          <View style={styles.profileCardInner}>
            <View style={styles.avatarWrap}>
              <Text style={styles.avatarText}>{getInitials(user.name)}</Text>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{user.name}</Text>
              <Text style={styles.profileEmail}>{user.email}</Text>
              {user.phone && (
                <Text style={styles.profilePhone}>{user.phone}</Text>
              )}
              <Text style={styles.profileId}>ID: {user.id}</Text>
            </View>
            <TouchableOpacity
              style={styles.editAvatarBtn}
              onPress={() => setEditOpen(true)}
              activeOpacity={0.8}
            >
              <Ionicons name="pencil" size={16} color="#fff" />
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* Stats Row */}
        <View
          style={[
            styles.statsRow,
            { backgroundColor: surface, borderColor: border },
          ]}
        >
          {[
            {
              label: "Transactions",
              value: "24",
              icon: "receipt-outline" as const,
            },
            { label: "Sent", value: "$1.2K", icon: "send-outline" as const },
            {
              label: "Received",
              value: "$2.8K",
              icon: "arrow-down-circle-outline" as const,
            },
          ].map((stat, i) => (
            <React.Fragment key={stat.label}>
              {i > 0 && (
                <View
                  style={[styles.statDivider, { backgroundColor: border }]}
                />
              )}
              <View style={styles.stat}>
                <Ionicons name={stat.icon} size={16} color={Colors.primary} />
                <Text style={[styles.statValue, { color: textPrimary }]}>
                  {stat.value}
                </Text>
                <Text style={[styles.statLabel, { color: textSecondary }]}>
                  {stat.label}
                </Text>
              </View>
            </React.Fragment>
          ))}
        </View>

        {/* Menu Sections */}
        {menuSections.map((section) => (
          <View key={section.title} style={styles.section}>
            <Text style={[styles.sectionTitle, { color: textSecondary }]}>
              {section.title.toUpperCase()}
            </Text>
            <View
              style={[
                styles.menuCard,
                { backgroundColor: surface, borderColor: border },
              ]}
            >
              {section.items.map((item, i) => (
                <React.Fragment key={item.label}>
                  {i > 0 && (
                    <View
                      style={[styles.menuDivider, { backgroundColor: border }]}
                    />
                  )}
                  <TouchableOpacity
                    style={styles.menuItem}
                    onPress={item.onPress}
                    activeOpacity={0.7}
                  >
                    <View
                      style={[
                        styles.menuIconWrap,
                        { backgroundColor: item.iconBg },
                      ]}
                    >
                      <Ionicons
                        name={item.icon}
                        size={18}
                        color={item.iconColor}
                      />
                    </View>
                    <View style={styles.menuText}>
                      <Text style={[styles.menuLabel, { color: textPrimary }]}>
                        {item.label}
                      </Text>
                      <Text style={[styles.menuSub, { color: textSecondary }]}>
                        {item.sub}
                      </Text>
                    </View>
                    {item.rightElement || (
                      <Ionicons
                        name="chevron-forward"
                        size={16}
                        color={textSecondary}
                      />
                    )}
                  </TouchableOpacity>
                </React.Fragment>
              ))}
            </View>
          </View>
        ))}

        {/* Logout */}
        <TouchableOpacity
          style={[
            styles.logoutBtn,
            { borderColor: isDark ? "rgba(239,68,68,0.3)" : "#fecaca" },
          ]}
          onPress={handleLogout}
          activeOpacity={0.8}
        >
          <Ionicons name="log-out-outline" size={18} color={Colors.errorMid} />
          <Text style={[styles.logoutText, { color: Colors.errorMid }]}>
            Log Out
          </Text>
        </TouchableOpacity>

        <Text style={[styles.version, { color: textSecondary }]}>
          PayNext v1.0.0
        </Text>
      </ScrollView>

      {/* Edit Profile Modal */}
      <Modal
        visible={editOpen}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setEditOpen(false)}
      >
        <SafeAreaView
          style={[styles.modalSafe, { backgroundColor: bg }]}
          edges={["top", "bottom"]}
        >
          <View style={[styles.modalHeader, { borderBottomColor: border }]}>
            <TouchableOpacity onPress={() => setEditOpen(false)}>
              <Text style={[styles.modalCancel, { color: textSecondary }]}>
                Cancel
              </Text>
            </TouchableOpacity>
            <Text style={[styles.modalTitle, { color: textPrimary }]}>
              Edit Profile
            </Text>
            <TouchableOpacity
              onPress={handleSubmit(onProfileSubmit)}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <ActivityIndicator size="small" color={Colors.primary} />
              ) : (
                <Text style={[styles.modalSave, { color: Colors.primary }]}>
                  Save
                </Text>
              )}
            </TouchableOpacity>
          </View>

          <ScrollView
            contentContainerStyle={styles.modalBody}
            keyboardShouldPersistTaps="handled"
          >
            {(["name", "email", "phone"] as const).map((fieldName) => (
              <View key={fieldName} style={styles.field}>
                <Text style={[styles.fieldLabel, { color: textPrimary }]}>
                  {fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}
                  {fieldName === "phone" && (
                    <Text style={{ color: textSecondary, fontWeight: "400" }}>
                      {" "}
                      (Optional)
                    </Text>
                  )}
                </Text>
                <Controller
                  control={control}
                  name={fieldName}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <View
                      style={[
                        styles.inputWrap,
                        {
                          backgroundColor: inputBg,
                          borderColor: (errors as any)[fieldName]
                            ? Colors.errorMid
                            : border,
                        },
                      ]}
                    >
                      <TextInput
                        style={[styles.textInput, { color: textPrimary }]}
                        value={value ?? ""}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        autoCapitalize={fieldName === "name" ? "words" : "none"}
                        keyboardType={
                          fieldName === "email"
                            ? "email-address"
                            : fieldName === "phone"
                              ? "phone-pad"
                              : "default"
                        }
                        placeholder={
                          fieldName === "phone" ? "+1 (555) 000-0000" : ""
                        }
                        placeholderTextColor={textSecondary}
                      />
                    </View>
                  )}
                />
                {(errors as any)[fieldName] && (
                  <Text style={styles.fieldError}>
                    {(errors as any)[fieldName]?.message}
                  </Text>
                )}
              </View>
            ))}
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  scroll: { padding: 20, paddingBottom: 40, gap: 16 },
  loadingWrap: { flex: 1, alignItems: "center", justifyContent: "center" },

  pageTitleRow: { gap: 2 },
  pageTitle: { fontSize: 28, fontWeight: "800", letterSpacing: -0.6 },
  pageSubtitle: { fontSize: 14 },

  // Profile Card
  profileCard: {
    borderRadius: 24,
    padding: 24,
    overflow: "hidden",
    ...Shadow.lg,
  },
  decorCircle1: {
    position: "absolute",
    top: -30,
    right: -30,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "rgba(255,255,255,0.08)",
  },
  decorCircle2: {
    position: "absolute",
    bottom: -40,
    left: -40,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: "rgba(255,255,255,0.05)",
  },
  profileCardInner: { flexDirection: "row", alignItems: "center", gap: 16 },
  avatarWrap: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.3)",
    flexShrink: 0,
  },
  avatarText: { fontSize: 24, fontWeight: "800", color: "#fff" },
  profileInfo: { flex: 1, gap: 2 },
  profileName: { fontSize: 18, fontWeight: "800", color: "#fff" },
  profileEmail: { fontSize: 13, color: "rgba(255,255,255,0.75)" },
  profilePhone: { fontSize: 12, color: "rgba(255,255,255,0.6)" },
  profileId: {
    fontSize: 10,
    color: "rgba(255,255,255,0.5)",
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    marginTop: 2,
  },
  editAvatarBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  // Stats
  statsRow: {
    flexDirection: "row",
    borderRadius: 20,
    borderWidth: 1,
    padding: 16,
    ...Shadow.sm,
  },
  stat: { flex: 1, alignItems: "center", gap: 4 },
  statDivider: { width: 1, height: "60%", alignSelf: "center" },
  statValue: { fontSize: 17, fontWeight: "800" },
  statLabel: { fontSize: 11, fontWeight: "500" },

  // Sections
  section: { gap: 8 },
  sectionTitle: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.8,
    paddingHorizontal: 4,
  },
  menuCard: {
    borderRadius: 20,
    borderWidth: 1,
    overflow: "hidden",
    ...Shadow.sm,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    gap: 12,
  },
  menuIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  menuText: { flex: 1, gap: 1 },
  menuLabel: { fontSize: 14, fontWeight: "600" },
  menuSub: { fontSize: 12 },
  menuDivider: { height: 1, marginLeft: 68 },

  // Logout
  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    height: 52,
    borderRadius: 16,
    borderWidth: 1.5,
  },
  logoutText: { fontSize: 15, fontWeight: "700" },

  version: { textAlign: "center", fontSize: 12 },

  // Modal
  modalSafe: { flex: 1 },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  modalTitle: { fontSize: 16, fontWeight: "700" },
  modalCancel: { fontSize: 15 },
  modalSave: { fontSize: 15, fontWeight: "700" },
  modalBody: { padding: 20, gap: 16 },

  field: { gap: 6 },
  fieldLabel: { fontSize: 14, fontWeight: "600" },
  inputWrap: {
    borderRadius: 14,
    borderWidth: 1.5,
    paddingHorizontal: 14,
    height: 50,
    justifyContent: "center",
  },
  textInput: { fontSize: 15, height: "100%" },
  fieldError: { fontSize: 12, color: Colors.errorMid },
});
