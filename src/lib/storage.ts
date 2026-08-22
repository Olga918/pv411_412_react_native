import * as SecureStore from "expo-secure-store";

const ACCESS_TOKEN_KEY = "auth_access_token";
const REFRESH_TOKEN_KEY = "auth_refresh_token";
const PIN_KEY = "app_pin_code";

export const saveTokens = async (accessToken: string, refreshToken: string) => {
  await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, accessToken);
  await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, refreshToken);
};

export const getAccessToken = async () => {
  return await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
};

export const getRefreshToken = async () => {
  return await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
};

export const clearTokens = async () => {
  try {
    await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
  } catch {}
  try {
    await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
  } catch {}
};;

/** HW 11 — PIN in SecureStore */
export const savePin = async (pin: string) => {
  await SecureStore.setItemAsync(PIN_KEY, pin);
};

export const getPin = async () => {
  return await SecureStore.getItemAsync(PIN_KEY);
};

export const clearPin = async () => {
  try {
    await SecureStore.deleteItemAsync(PIN_KEY);
  } catch {
    // key may already be missing
  }
};
