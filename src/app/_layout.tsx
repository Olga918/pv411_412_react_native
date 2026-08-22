import "react-native-gesture-handler";
import { View, ActivityIndicator } from "react-native";
import { Redirect, Slot, useSegments } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const InitialLayout = () => {
  const { token, hasPin, isUnlocked, isLoading } = useAuth();
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

  const group = segments[0];
  const screen = segments[1];
  const inAuth = group === "(auth)";

  if (!token) {
    if (!inAuth || screen !== "login") {
      return <Redirect href="/(auth)/login" />;
    }
    return <Slot />;
  }

  if (!hasPin) {
    if (!inAuth || screen !== "set-pin") {
      return <Redirect href="/(auth)/set-pin" />;
    }
    return <Slot />;
  }

  if (!isUnlocked) {
    if (!inAuth || screen !== "unlock-pin") {
      return <Redirect href="/(auth)/unlock-pin" />;
    }
    return <Slot />;
  }

  // Unlocked
  if (inAuth) {
    return <Redirect href="/(tabs)/profile" />;
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
