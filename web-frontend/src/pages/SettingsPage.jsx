import {
  DarkMode as DarkModeIcon,
  Lock as LockIcon,
  Notifications as NotificationsIcon,
  Security as SecurityIcon,
} from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  FormControlLabel,
  Grid,
  Paper,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { AnimatedElement } from "../components/AnimationComponents";
import api from "../services/api";

const SettingsPage = () => {
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    transactionAlerts: true,
    marketingEmails: false,
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [notifSuccess, setNotifSuccess] = useState("");

  const handleNotificationChange = (e) => {
    setNotifications({ ...notifications, [e.target.name]: e.target.checked });
  };

  const handleSaveNotifications = () => {
    setNotifSuccess("Notification preferences saved successfully");
    setTimeout(() => setNotifSuccess(""), 3000);
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm({ ...passwordForm, [name]: value });
  };

  const handleChangePassword = async () => {
    setPasswordError("");
    setPasswordSuccess("");

    if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
      setPasswordError("Please fill in all password fields");
      return;
    }

    if (passwordForm.newPassword.length < 8) {
      setPasswordError("New password must be at least 8 characters");
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError("New passwords do not match");
      return;
    }

    setPasswordLoading(true);

    try {
      await api.put("/users/password", {
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });
      setPasswordSuccess("Password changed successfully");
      setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Failed to change password. Please try again.";
      setPasswordError(msg);
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <AnimatedElement>
        <Typography variant="h4" component="h1" sx={{ mb: 4, fontWeight: "bold" }}>
          Settings
        </Typography>
      </AnimatedElement>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <AnimatedElement animation="fadeInUp" delay={0.1}>
            <Paper elevation={2} sx={{ p: 4, borderRadius: 4 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <NotificationsIcon sx={{ mr: 1.5, color: "primary.main" }} />
                <Typography variant="h6" sx={{ fontWeight: "medium" }}>
                  Notification Preferences
                </Typography>
              </Box>
              <Divider sx={{ mb: 3 }} />

              {notifSuccess && (
                <Alert severity="success" sx={{ mb: 2 }}>
                  {notifSuccess}
                </Alert>
              )}

              <Grid container spacing={2}>
                {[
                  { name: "emailNotifications", label: "Email Notifications" },
                  { name: "smsNotifications", label: "SMS Notifications" },
                  { name: "pushNotifications", label: "Push Notifications" },
                  { name: "transactionAlerts", label: "Transaction Alerts" },
                  { name: "marketingEmails", label: "Marketing Emails" },
                ].map(({ name, label }) => (
                  <Grid item xs={12} sm={6} key={name}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={notifications[name]}
                          onChange={handleNotificationChange}
                          name={name}
                          color="primary"
                        />
                      }
                      label={label}
                    />
                  </Grid>
                ))}
              </Grid>

              <Box sx={{ mt: 3 }}>
                <Button variant="contained" onClick={handleSaveNotifications}>
                  Save Preferences
                </Button>
              </Box>
            </Paper>
          </AnimatedElement>
        </Grid>

        <Grid item xs={12}>
          <AnimatedElement animation="fadeInUp" delay={0.2}>
            <Paper elevation={2} sx={{ p: 4, borderRadius: 4 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <LockIcon sx={{ mr: 1.5, color: "primary.main" }} />
                <Typography variant="h6" sx={{ fontWeight: "medium" }}>
                  Change Password
                </Typography>
              </Box>
              <Divider sx={{ mb: 3 }} />

              {passwordError && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {passwordError}
                </Alert>
              )}
              {passwordSuccess && (
                <Alert severity="success" sx={{ mb: 2 }}>
                  {passwordSuccess}
                </Alert>
              )}

              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Current Password"
                    name="currentPassword"
                    type="password"
                    value={passwordForm.currentPassword}
                    onChange={handlePasswordChange}
                    disabled={passwordLoading}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="New Password"
                    name="newPassword"
                    type="password"
                    value={passwordForm.newPassword}
                    onChange={handlePasswordChange}
                    disabled={passwordLoading}
                    variant="outlined"
                    helperText="Minimum 8 characters"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Confirm New Password"
                    name="confirmPassword"
                    type="password"
                    value={passwordForm.confirmPassword}
                    onChange={handlePasswordChange}
                    disabled={passwordLoading}
                    variant="outlined"
                  />
                </Grid>
              </Grid>

              <Box sx={{ mt: 3 }}>
                <Button
                  variant="contained"
                  onClick={handleChangePassword}
                  disabled={passwordLoading}
                  startIcon={passwordLoading ? <CircularProgress size={20} /> : <SecurityIcon />}
                >
                  {passwordLoading ? "Updating..." : "Change Password"}
                </Button>
              </Box>
            </Paper>
          </AnimatedElement>
        </Grid>

        <Grid item xs={12}>
          <AnimatedElement animation="fadeInUp" delay={0.3}>
            <Paper elevation={2} sx={{ p: 4, borderRadius: 4 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <DarkModeIcon sx={{ mr: 1.5, color: "primary.main" }} />
                <Typography variant="h6" sx={{ fontWeight: "medium" }}>
                  Appearance
                </Typography>
              </Box>
              <Divider sx={{ mb: 3 }} />
              <FormControlLabel
                control={<Switch color="primary" />}
                label="Dark Mode (coming soon)"
                disabled
              />
            </Paper>
          </AnimatedElement>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SettingsPage;
