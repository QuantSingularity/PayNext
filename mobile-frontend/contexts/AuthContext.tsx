import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  apiClient,
  mockApiClient,
  useMockData,
  type User,
} from "@/lib/api-client";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  updateProfile: (data: {
    name?: string;
    email?: string;
    phone?: string;
  }) => Promise<boolean>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    try {
      const client = useMockData ? mockApiClient : apiClient;
      const response = await client.getUserProfile();
      if (response.success && response.data) {
        setUser(response.data as User);
      }
    } catch (error) {
      console.error("Failed to refresh user:", error);
    }
  }, []);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = await AsyncStorage.getItem("auth_token");
        if (token) {
          await apiClient.loadToken();
          await refreshUser();
        }
      } catch (error) {
        console.error("Auth init error:", error);
      } finally {
        setIsLoading(false);
      }
    };
    initAuth();
  }, [refreshUser]);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      if (useMockData) {
        const response = await mockApiClient.login(email, password);
        if (response.success && response.data) {
          await apiClient.setToken(response.data.token);
          setUser(response.data.user);
          return true;
        }
        return false;
      } else {
        const response = await apiClient.login(email, password);
        if (response.success && response.data) {
          await apiClient.setToken(response.data.token);
          setUser(response.data.user);
          return true;
        }
        return false;
      }
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const register = async (
    name: string,
    email: string,
    password: string,
  ): Promise<boolean> => {
    try {
      const client = useMockData ? mockApiClient : apiClient;
      const response = await client.register({ name, email, password });
      return response.success;
    } catch {
      return false;
    }
  };

  const logout = async (): Promise<void> => {
    await apiClient.clearToken();
    setUser(null);
  };

  const updateProfile = async (data: {
    name?: string;
    email?: string;
    phone?: string;
  }): Promise<boolean> => {
    try {
      const client = useMockData ? mockApiClient : apiClient;
      const response = await client.updateUserProfile(data);
      if (response.success && response.data) {
        setUser((prev) => (prev ? { ...prev, ...data } : null));
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        updateProfile,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
