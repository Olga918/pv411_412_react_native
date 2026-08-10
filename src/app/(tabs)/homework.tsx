import { View, Text, StyleSheet } from "react-native";

const LIGHT_SIZE = 90;

const HomeworkScreen = () => {
  return (
    <View style={styles.screen}>
      <View style={styles.body}>
        <View style={[styles.light, styles.red]}>
          <Text style={styles.lightText}>STOP</Text>
        </View>
        <View style={[styles.light, styles.yellow]}>
          <Text style={styles.lightText}>READY</Text>
        </View>
        <View style={[styles.light, styles.green]}>
          <Text style={styles.lightText}>GO</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  body: {
    backgroundColor: "#333333",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
  },
  light: {
    width: LIGHT_SIZE,
    height: LIGHT_SIZE,
    borderRadius: LIGHT_SIZE / 2,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 8,
  },
  red: {
    backgroundColor: "#FF0000",
  },
  yellow: {
    backgroundColor: "#FFFF00",
  },
  green: {
    backgroundColor: "#00FF00",
  },
  lightText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
  },
});

export default HomeworkScreen;
