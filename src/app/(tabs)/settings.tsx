import { ScrollView, StyleSheet, Text } from "react-native";
import { Container } from "@/components/ui/container";
import { SafeAreaView } from "react-native-safe-area-context";
import Constants from "expo-constants";

const APP_NAME = "React Native Lessons";
const APP_YEAR = "2026";
const APP_VERSION = Constants.expoConfig?.version ?? "1.0.0";

const SettingsScreen = () => {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.header}>Settings</Text>
        <Container>
          <Text style={styles.text}>Налаштування додатку</Text>
          <Text style={styles.label}>Назва:</Text>
          <Text style={styles.value}>{APP_NAME}</Text>
          <Text style={styles.label}>Рік:</Text>
          <Text style={styles.value}>{APP_YEAR}</Text>
          <Text style={styles.label}>Версія:</Text>
          <Text style={styles.value}>v{APP_VERSION}</Text>
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
  content: {
    paddingBottom: 24,
  },
  header: {
    margin: 8,
    padding: 12,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#527da3",
    color: "white",
    borderRadius: 8,
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
});

export default SettingsScreen;
