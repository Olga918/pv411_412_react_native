import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  ToastAndroid,
  FlatList,
  Pressable,
} from "react-native";

interface Task {
  id: string;
  title: string;
}

const Homework2Screen = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [text, setText] = useState("");

  const addTask = () => {
    if (text.trim() === "") {
      Alert.alert("Помилка", "Введіть текст завдання");
      return;
    }

    setTasks((prev) => [
      ...prev,
      { id: Date.now().toString(), title: text.trim() },
    ]);
    setText("");
    ToastAndroid.show("Задачу додано успішно", ToastAndroid.SHORT);
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.header}>Домашнє завдання 2</Text>
      <Text style={styles.subtitle}>Список задач</Text>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Нове завдання..."
          value={text}
          onChangeText={setText}
          placeholderTextColor="#999"
        />
        <Button title="Додати" color="#722b48" onPress={addTask} />
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <Text style={styles.taskText}>{item.title}</Text>
            <Pressable
              style={styles.deleteButton}
              onPress={() => deleteTask(item.id)}
            >
              <Text style={styles.deleteButtonText}>Видалити</Text>
            </Pressable>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Список порожній</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f3f3f3",
  },
  header: {
    margin: 5,
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
    marginBottom: 10,
  },
  inputRow: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 3,
    gap: 10,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 20,
  },
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    borderLeftWidth: 5,
    borderLeftColor: "#722b48",
    marginVertical: 6,
    elevation: 2,
  },
  taskText: {
    flex: 1,
    fontSize: 16,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: "#c0392b",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  deleteButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 40,
    color: "#8e8e93",
    fontSize: 16,
  },
});

export default Homework2Screen;
