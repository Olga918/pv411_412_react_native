import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@/context/AuthContext";

const onlyDigits = (value: string) => value.replace(/\D/g, "").slice(0, 4);

const UnlockPinScreen = () => {
  const router = useRouter();
  const { unlockWithPin, logout } = useAuth();
  const [pin, setPin] = useState("");
  const [checking, setChecking] = useState(false);

  const handleUnlock = async () => {
    const clean = onlyDigits(pin);
    if (clean.length !== 4) {
      Alert.alert("PIN", "Введіть 4 цифри");
      return;
    }
    setChecking(true);
    try {
      const ok = await unlockWithPin(clean);
      if (!ok) {
        Alert.alert("PIN", "Невірний PIN");
        setPin("");
        return;
      }
      router.replace("/(tabs)/profile");
    } finally {
      setChecking(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Введіть PIN</Text>
      <TextInput
        style={styles.input}
        placeholder="PIN"
        value={pin}
        onChangeText={(t) => setPin(onlyDigits(t))}
        keyboardType="number-pad"
        maxLength={4}
        secureTextEntry
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleUnlock}
        disabled={checking}
      >
        {checking ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Розблокувати</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.link}
        onPress={async () => {
          await logout();
          router.replace("/(auth)/login");
        }}
      >
        <Text style={styles.linkText}>Вийти</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#6e0e36",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
  link: { marginTop: 16, alignItems: "center" },
  linkText: { color: "#6e0e36", fontWeight: "600" },
});

export default UnlockPinScreen;
