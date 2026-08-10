import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Container } from "@/components/ui/container";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Constants from "expo-constants";
import Entypo from "@expo/vector-icons/Entypo";

const APP_NAME = "React Native Lessons";
const APP_YEAR = "2026";
const APP_VERSION = Constants.expoConfig?.version ?? "1.0.0";

const SettingsScreen = () => {
  const router = useRouter();

  const goHome = () => {
    router.push("/homework5");
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={goHome} style={styles.backBtn} hitSlop={12}>
          <Entypo name="chevron-left" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.topTitle}>Settings</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Container>
          <Text style={styles.text}>Налаштування додатку</Text>
          <Text style={styles.label}>Назва:</Text>
          <Text style={styles.value}>{APP_NAME}</Text>
          <Text style={styles.label}>Рік:</Text>
          <Text style={styles.value}>{APP_YEAR}</Text>
          <Text style={styles.label}>Версія:</Text>
          <Text style={styles.value}>v{APP_VERSION}</Text>

          <TouchableOpacity style={styles.homeButton} onPress={goHome}>
            <Text style={styles.homeButtonText}>На головну (Telegram)</Text>
          </TouchableOpacity>
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#f3f3f3",
  },
  topBar: {
    height: 56,
    backgroundColor: "#527da3",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  backBtn: {
    padding: 4,
    marginRight: 8,
  },
  topTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  content: {
    paddingBottom: 24,
    paddingTop: 8,
  },
  text: {
    fontSize: 15,
    color: "#444",
    marginBottom: 12,
  },
  label: {
    fontSize: 13,
    color: "#888",
    marginTop: 8,
  },
  value: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  homeButton: {
    marginTop: 24,
    backgroundColor: "#527da3",
    borderRadius: 8,
    paddingVertical: 14,
  },
  homeButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default SettingsScreen;
