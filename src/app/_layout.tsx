import "react-native-gesture-handler";
import { View, ActivityIndicator } from "react-native";
import { Redirect, Slot, useSegments } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const InitialLayout = () => {
  const { token, isLoading } = useAuth();
  const segments = useSegments();

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color="#6e0e36" />
      </View>
    );
  }

  const inAuthGroup = segments[0] === "(auth)";

  // Уже вошли раньше (токен в SecureStore) — сразу на уроки, без мигания Login
  if (token && inAuthGroup) {
    return <Redirect href="/(tabs)" />;
  }

  if (!token && !inAuthGroup) {
    return <Redirect href="/(auth)/login" />;
  }

  return <Slot />;
};

const RootLayout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <AuthProvider>
          <InitialLayout />
        </AuthProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default RootLayout;
