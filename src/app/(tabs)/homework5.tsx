import { ScrollView, StyleSheet, Text } from "react-native";
import { Container } from "@/components/ui/container";
import { SafeAreaView } from "react-native-safe-area-context";
import Constants from "expo-constants";

const APP_NAME = "React Native Lessons";
const APP_YEAR = "2026";
const APP_VERSION = Constants.expoConfig?.version ?? "1.0.0";

const Homework5Screen = () => {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.header}>Домашнє завдання 5</Text>
        <Text style={styles.subtitle}>Бічна панель</Text>

        <Container>
          <Text style={styles.text}>
            Бічна панель як у Telegram: відкривається свайпом зліва.
          </Text>
          <Text style={styles.text}>В самому низу панелі додано:</Text>
          <Text style={styles.value}>{APP_NAME}</Text>
          <Text style={styles.value}>{APP_YEAR}</Text>
          <Text style={styles.value}>v{APP_VERSION}</Text>
          <Text style={styles.hint}>
            Відкрий меню зліва і подивись низ панелі.
          </Text>
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
    padding: 8,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#91345b",
    color: "white",
    borderRadius: 8,
  },
  subtitle: {
    textAlign: "center",
    color: "#722b48",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  text: {
    fontSize: 15,
    color: "#444",
    marginBottom: 8,
    lineHeight: 22,
  },
  value: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
    marginLeft: 8,
  },
  hint: {
    marginTop: 12,
    fontSize: 14,
    color: "#722b48",
    fontWeight: "bold",
  },
});

export default Homework5Screen;
