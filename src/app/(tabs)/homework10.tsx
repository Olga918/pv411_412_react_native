import { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Checkbox from "expo-checkbox";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

type Product = {
  id: string;
  name: string;
  price: string;
  description: string;
  deleted: boolean;
};

const emptyForm = {
  name: "",
  price: "",
  description: "",
};

const Homework10Screen = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showDeleted, setShowDeleted] = useState(false);

  const visibleProducts = useMemo(() => {
    if (showDeleted) return products;
    return products.filter((p) => !p.deleted);
  }, [products, showDeleted]);

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const saveProduct = () => {
    const name = form.name.trim();
    const price = form.price.trim();
    const description = form.description.trim();

    if (!name || !price) {
      Alert.alert("Форма", "Вкажи назву і ціну продукту.");
      return;
    }

    if (editingId) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editingId
            ? { ...p, name, price, description }
            : p
        )
      );
      resetForm();
      return;
    }

    const item: Product = {
      id: `${Date.now()}`,
      name,
      price,
      description,
      deleted: false,
    };
    setProducts((prev) => [item, ...prev]);
    resetForm();
  };

  const startEdit = (item: Product) => {
    if (item.deleted) {
      Alert.alert("Оновлення", "Спочатку віднови продукт, потім редагуй.");
      return;
    }
    setEditingId(item.id);
    setForm({
      name: item.name,
      price: item.price,
      description: item.description,
    });
  };

  const softDelete = (id: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, deleted: true } : p))
    );
    if (editingId === id) resetForm();
  };

  const restoreProduct = (id: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, deleted: false } : p))
    );
  };

  const hardDelete = (id: string, name: string) => {
    Alert.alert(
      "Видалити повністю?",
      `«${name}» буде стерто без відновлення.`,
      [
        { text: "Скасувати", style: "cancel" },
        {
          text: "Видалити",
          style: "destructive",
          onPress: () => {
            setProducts((prev) => prev.filter((p) => p.id !== id));
            if (editingId === id) resetForm();
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <FlatList
          data={visibleProducts}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          ListHeaderComponent={
            <View>
              <Text style={styles.title}>ДЗ 10 — CRUD продуктів</Text>
              <Text style={styles.hint}>
                Створення, оновлення, мʼяке і повне видалення. Чекбокс показує
                видалені продукти.
              </Text>

              <View style={styles.formCard}>
                <Text style={styles.formTitle}>
                  {editingId ? "Оновити продукт" : "Новий продукт"}
                </Text>
                <TextInput
                  style={styles.input}
                  value={form.name}
                  onChangeText={(name) => setForm((f) => ({ ...f, name }))}
                  placeholder="Назва *"
                  placeholderTextColor="#9aa7b5"
                />
                <TextInput
                  style={styles.input}
                  value={form.price}
                  onChangeText={(price) => setForm((f) => ({ ...f, price }))}
                  placeholder="Ціна *"
                  placeholderTextColor="#9aa7b5"
                  keyboardType="decimal-pad"
                />
                <TextInput
                  style={[styles.input, styles.textArea]}
                  value={form.description}
                  onChangeText={(description) =>
                    setForm((f) => ({ ...f, description }))
                  }
                  placeholder="Опис"
                  placeholderTextColor="#9aa7b5"
                  multiline
                />

                <View style={styles.formActions}>
                  <TouchableOpacity style={styles.saveBtn} onPress={saveProduct}>
                    <Text style={styles.saveBtnText}>
                      {editingId ? "Зберегти зміни" : "Створити продукт"}
                    </Text>
                  </TouchableOpacity>
                  {editingId ? (
                    <TouchableOpacity style={styles.cancelBtn} onPress={resetForm}>
                      <Text style={styles.cancelBtnText}>Скасувати</Text>
                    </TouchableOpacity>
                  ) : null}
                </View>
              </View>

              <View style={styles.checkRow}>
                <Checkbox
                  value={showDeleted}
                  onValueChange={setShowDeleted}
                  color={showDeleted ? "#527da3" : undefined}
                />
                <Text style={styles.checkLabel}>Показати видалені продукти</Text>
              </View>

              <Text style={styles.section}>
                Продукти ({visibleProducts.length}
                {showDeleted ? ` / усього ${products.length}` : ""})
              </Text>
            </View>
          }
          ListEmptyComponent={
            <Text style={styles.empty}>
              {showDeleted
                ? "Немає продуктів (і активних, і видалених)."
                : "Поки немає продуктів — створи перший."}
            </Text>
          }
          renderItem={({ item }) => (
            <View
              style={[styles.card, item.deleted && styles.cardDeleted]}
            >
              <View style={styles.cardBody}>
                <Text style={styles.cardName}>
                  {item.name}
                  {item.deleted ? " (видалено)" : ""}
                </Text>
                <Text style={styles.cardPrice}>{item.price} грн</Text>
                {item.description ? (
                  <Text style={styles.cardDesc}>{item.description}</Text>
                ) : null}
              </View>

              <View style={styles.cardActions}>
                {!item.deleted ? (
                  <>
                    <TouchableOpacity
                      style={styles.iconBtn}
                      onPress={() => startEdit(item)}
                    >
                      <MaterialIcons name="edit" size={20} color="#527da3" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.iconBtn}
                      onPress={() => softDelete(item.id)}
                    >
                      <MaterialIcons name="delete-outline" size={22} color="#e67e22" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.iconBtn}
                      onPress={() => hardDelete(item.id, item.name)}
                    >
                      <MaterialIcons name="delete-forever" size={22} color="#c0392b" />
                    </TouchableOpacity>
                  </>
                ) : (
                  <>
                    <TouchableOpacity
                      style={styles.restoreBtn}
                      onPress={() => restoreProduct(item.id)}
                    >
                      <Text style={styles.restoreText}>Відновити</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.iconBtn}
                      onPress={() => hardDelete(item.id, item.name)}
                    >
                      <MaterialIcons name="delete-forever" size={22} color="#c0392b" />
                    </TouchableOpacity>
                  </>
                )}
              </View>
            </View>
          )}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#f4f7fa" },
  flex: { flex: 1 },
  list: { padding: 16, paddingBottom: 32 },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#1f3a56",
    marginBottom: 6,
  },
  hint: {
    fontSize: 14,
    color: "#667788",
    marginBottom: 14,
    lineHeight: 20,
  },
  formCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: "#dde6ef",
    marginBottom: 14,
  },
  formTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1f3a56",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#d5e0ea",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: "#1f3a56",
    backgroundColor: "#fafcfe",
    marginBottom: 10,
  },
  textArea: {
    minHeight: 70,
    textAlignVertical: "top",
  },
  formActions: { gap: 8 },
  saveBtn: {
    backgroundColor: "#527da3",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
  },
  saveBtnText: { color: "#fff", fontWeight: "700", fontSize: 16 },
  cancelBtn: {
    backgroundColor: "#eef2f6",
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
  },
  cancelBtnText: { color: "#52667a", fontWeight: "600" },
  checkRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 14,
  },
  checkLabel: { fontSize: 15, color: "#1f3a56", fontWeight: "600" },
  section: {
    fontSize: 17,
    fontWeight: "700",
    color: "#1f3a56",
    marginBottom: 10,
  },
  empty: { textAlign: "center", color: "#8899aa", marginTop: 8 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#dde6ef",
  },
  cardDeleted: {
    backgroundColor: "#f7f7f7",
    borderColor: "#e0e0e0",
    opacity: 0.85,
  },
  cardBody: { marginBottom: 10 },
  cardName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1f3a56",
    marginBottom: 2,
  },
  cardPrice: { fontSize: 14, color: "#527da3", fontWeight: "700", marginBottom: 4 },
  cardDesc: { fontSize: 13, color: "#667788", lineHeight: 18 },
  cardActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flexWrap: "wrap",
  },
  iconBtn: {
    padding: 6,
    backgroundColor: "#eef3f8",
    borderRadius: 8,
  },
  restoreBtn: {
    backgroundColor: "#e4efe8",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  restoreText: { color: "#2f6b4f", fontWeight: "700" },
});

export default Homework10Screen;
