import { getAccessToken, saveTokens, clearTokens } from "@/lib/storage";
import { authApi } from "@/lib/auth-api";
import React, { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  token: string | null;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  loginAsGuest: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storeToken = await getAccessToken();
        if (storeToken) setToken(storeToken);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (username: string, password: string) => {
    const res = await authApi.post("/auth/login", {
      username,
      password,
      expiresInMins: 30,
    });

    const { accessToken, refreshToken } = res.data;
    await saveTokens(accessToken, refreshToken);
    setToken(accessToken);
  };

  /** Для уроків/ДЗ без інтернету або API */
  const loginAsGuest = async () => {
    const guest = "guest-local-token";
    await saveTokens(guest, "guest-refresh");
    setToken(guest);
  };

  const logout = async () => {
    await clearTokens();
    setToken(null);
  };
  return (
    <AuthContext.Provider
      value={{ token, isLoading, login, loginAsGuest, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
