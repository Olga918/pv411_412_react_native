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

const SetPinScreen = () => {
  const router = useRouter();
  const { createPin, logout } = useAuth();
  const [pin, setPin] = useState("");
  const [confirm, setConfirm] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    const clean = onlyDigits(pin);
    if (clean.length !== 4) {
      Alert.alert("PIN", "Введіть 4 цифри");
      return;
    }
    if (clean !== onlyDigits(confirm)) {
      Alert.alert("PIN", "PIN не збігається");
      return;
    }
    setSaving(true);
    try {
      await createPin(clean);
      router.replace("/(tabs)/profile");
    } catch (e: any) {
      Alert.alert("Помилка", e?.message ?? "Не вдалося зберегти PIN");
    } finally {
      setSaving(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Створіть PIN</Text>
      <TextInput
        style={styles.input}
        placeholder="PIN (4 цифри)"
        value={pin}
        onChangeText={(t) => setPin(onlyDigits(t))}
        keyboardType="number-pad"
        maxLength={4}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Підтвердіть PIN"
        value={confirm}
        onChangeText={(t) => setConfirm(onlyDigits(t))}
        keyboardType="number-pad"
        maxLength={4}
        secureTextEntry
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleSave}
        disabled={saving}
      >
        {saving ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Зберегти PIN</Text>
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

export default SetPinScreen;
