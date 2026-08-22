import {
  getAccessToken,
  saveTokens,
  clearTokens,
  getPin,
  savePin,
  clearPin,
} from "@/lib/storage";
import { authApi } from "@/lib/auth-api";
import React, { createContext, useContext, useEffect, useState } from "react";

const onlyDigits = (value: string) => value.replace(/\D/g, "").slice(0, 4);

/**
 * Сесія PIN в памʼяті модуля — не скидається, якщо AuthProvider
 * випадково перемонтується (через це раніше «Розблокувати» не пускало далі).
 * Після повного закриття додатку знову false.
 */
let sessionUnlocked = false;

interface AuthContextType {
  token: string | null;
  hasPin: boolean;
  isUnlocked: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  loginAsGuest: () => Promise<void>;
  logout: () => Promise<void>;
  createPin: (pin: string) => Promise<void>;
  unlockWithPin: (pin: string) => Promise<boolean>;
  lockApp: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null);
  const [hasPin, setHasPin] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(sessionUnlocked);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    const checkAuth = async () => {
      try {
        const storeToken = await getAccessToken();
        const storedPin = onlyDigits((await getPin()) ?? "");
        if (!alive) return;
        if (storeToken) setToken(storeToken);
        setHasPin(storedPin.length === 4);
        // Full JS reload → sessionUnlocked already false
        setIsUnlocked(sessionUnlocked);
        if (storedPin.length > 0 && storedPin.length !== 4) {
          try {
            await clearPin();
          } catch {}
          setHasPin(false);
        }
      } catch (error) {
        console.error(error);
      } finally {
        if (alive) setIsLoading(false);
      }
    };
    checkAuth();
    return () => {
      alive = false;
    };
  }, []);

  const afterLogin = async (accessToken: string) => {
    setToken(accessToken);
    const storedPin = onlyDigits((await getPin()) ?? "");
    const pinExists = storedPin.length === 4;
    setHasPin(pinExists);
    // After login/password: if PIN exists — unlock immediately
    sessionUnlocked = pinExists;
    setIsUnlocked(pinExists);
  };

  const login = async (username: string, password: string) => {
    const res = await authApi.post("/auth/login", {
      username,
      password,
      expiresInMins: 30,
    });
    const { accessToken, refreshToken } = res.data;
    await saveTokens(accessToken, refreshToken);
    await afterLogin(accessToken);
  };

  const loginAsGuest = async () => {
    const guest = "guest-local-token";
    await saveTokens(guest, "guest-refresh");
    await afterLogin(guest);
  };

  const createPin = async (pin: string) => {
    const clean = onlyDigits(pin);
    if (clean.length !== 4) {
      throw new Error("PIN must be 4 digits");
    }
    await savePin(clean);
    const verify = onlyDigits((await getPin()) ?? "");
    if (verify !== clean) {
      throw new Error("SecureStore не зберіг PIN. Спробуй ще раз.");
    }
    setHasPin(true);
    sessionUnlocked = true;
    setIsUnlocked(true);
  };

  const unlockWithPin = async (pin: string) => {
    const clean = onlyDigits(pin);
    const stored = onlyDigits((await getPin()) ?? "");
    if (stored.length !== 4 || stored !== clean) {
      return false;
    }
    sessionUnlocked = true;
    setIsUnlocked(true);
    return true;
  };

  const lockApp = () => {
    sessionUnlocked = false;
    setIsUnlocked(false);
  };

  const logout = async () => {
    sessionUnlocked = false;
    try {
      await clearTokens();
    } catch {}
    try {
      await clearPin();
    } catch {}
    setToken(null);
    setHasPin(false);
    setIsUnlocked(false);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        hasPin,
        isUnlocked,
        isLoading,
        login,
        loginAsGuest,
        logout,
        createPin,
        unlockWithPin,
        lockApp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
