import { Edit as EditIcon, Save as SaveIcon } from "@mui/icons-material";
import {
  Alert,
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { AnimatedElement } from "../components/AnimationComponents";
import { userService } from "../services/api";
import AuthService from "../services/AuthService";

const ProfilePage = () => {
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [profile, setProfile] = useState({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
  });
  const [formData, setFormData] = useState({ ...profile });

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();
    if (currentUser) {
      const initial = {
        username: currentUser.username || "",
        email: currentUser.email || "",
        firstName: currentUser.firstName || "",
        lastName: currentUser.lastName || "",
        phone: currentUser.phone || "",
      };
      setProfile(initial);
      setFormData(initial);
    }

    userService
      .getUserProfile()
      .then((data) => {
        const updated = {
          username: data.username || currentUser?.username || "",
          email: data.email || currentUser?.email || "",
          firstName: data.firstName || currentUser?.firstName || "",
          lastName: data.lastName || currentUser?.lastName || "",
          phone: data.phone || currentUser?.phone || "",
        };
        setProfile(updated);
        setFormData(updated);
      })
      .catch((err) => {
        console.error("Failed to load profile:", err);
      })
      .finally(() => {
        setFetchLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEdit = () => {
    setEditing(true);
    setError("");
    setSuccess("");
  };

  const handleCancel = () => {
    setEditing(false);
    setFormData({ ...profile });
    setError("");
    setSuccess("");
  };

  const handleSave = async () => {
    if (!formData.firstName || !formData.lastName) {
      setError("First name and last name are required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await userService.updateProfile(formData);
      setProfile({ ...formData });
      setEditing(false);
      setSuccess("Profile updated successfully");
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Failed to update profile. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const firstInitial = profile.firstName?.[0] || "";
  const lastInitial = profile.lastName?.[0] || "";
  const initials =
    `${firstInitial}${lastInitial}`.toUpperCase() ||
    profile.username?.[0]?.toUpperCase() ||
    "U";

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <AnimatedElement>
        <Typography
          variant="h4"
          component="h1"
          sx={{ mb: 4, fontWeight: "bold" }}
        >
          My Profile
        </Typography>
      </AnimatedElement>

      {fetchLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress />
        </Box>
      ) : (
        <AnimatedElement animation="fadeInUp" delay={0.1}>
          <Paper elevation={2} sx={{ p: 4, borderRadius: 4 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  bgcolor: "primary.main",
                  fontSize: "2rem",
                  mr: 3,
                }}
              >
                {initials}
              </Avatar>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                  {profile.firstName
                    ? `${profile.firstName} ${profile.lastName}`
                    : profile.username}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {profile.email}
                </Typography>
              </Box>
            </Box>

            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}
            {success && (
              <Alert severity="success" sx={{ mb: 3 }}>
                {success}
              </Alert>
            )}

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  disabled={!editing || loading}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  disabled={!editing || loading}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Username"
                  name="username"
                  value={formData.username}
                  disabled
                  variant="outlined"
                  helperText="Username cannot be changed"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!editing || loading}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={!editing || loading}
                  variant="outlined"
                />
              </Grid>
            </Grid>

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                mt: 4,
                gap: 2,
              }}
            >
              {editing ? (
                <>
                  <Button
                    variant="outlined"
                    onClick={handleCancel}
                    disabled={loading}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleSave}
                    disabled={loading}
                    startIcon={
                      loading ? <CircularProgress size={20} /> : <SaveIcon />
                    }
                  >
                    {loading ? "Saving..." : "Save Changes"}
                  </Button>
                </>
              ) : (
                <Button
                  variant="contained"
                  onClick={handleEdit}
                  startIcon={<EditIcon />}
                >
                  Edit Profile
                </Button>
              )}
            </Box>
          </Paper>
        </AnimatedElement>
      )}
    </Container>
  );
};

export default ProfilePage;
