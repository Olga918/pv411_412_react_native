import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/** StyleSheet instead of className — NativeWind crashes this Expo Go */
const TailWindScreen = () => {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.box}>
        <Text style={styles.title}>Hello Tailwind</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, alignItems: "center", justifyContent: "center" },
  box: { alignItems: "center" },
  title: { fontSize: 20, fontWeight: "700", color: "#3b82f6" },
});

export default TailWindScreen;
