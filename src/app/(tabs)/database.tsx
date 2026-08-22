import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, Alert } from "react-native";
import { dbManager, Product } from "@/lib/db";
import { useEffect, useState } from "react";
import { Container } from "@/components/ui/container";
import Checkbox from "expo-checkbox";

/**
 * Class / HW: product CRUD (SQLite).
 * - create / update form
 * - soft and hard delete
 * - checkbox to show deleted products
 */
const DatabaseScreen = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setОновитиingId] = useState<string | null>(null);
  const [showDeleted, setShowDeleted] = useState(false);

  useEffect(() => {
    const setup = async () => {
      await dbManager.init();
      await loadProducts(false);
    };
    setup();
  }, []);

  const loadProducts = async (includeDeleted: boolean) => {
    const list = includeDeleted
      ? await dbManager.getAllProductsIncludingDeleted()
      : await dbManager.getAllProducts();
    setProducts(list);
  };

  const resetForm = () => {
    setTitle("");
    setPrice("");
    setDescription("");
    setОновитиingId(null);
  };

  const saveProduct = async () => {
    const nextTitle = title.trim();
    const nextPrice = Number(price.replace(",", "."));
    const nextDescription = description.trim();

    if (!nextTitle || Number.isNaN(nextPrice)) {
      Alert.alert("Форма", "Вкажи назву і коректну ціну.");
      return;
    }

    try {
      if (editingId) {
        await dbManager.updateProduct(
          editingId,
          nextTitle,
          nextPrice,
          nextDescription || undefined
        );
      } else {
        await dbManager.addProduct(
          nextTitle,
          nextPrice,
          nextDescription || undefined
        );
      }
      resetForm();
      await loadProducts(showDeleted);
    } catch (e) {
      console.log(e);
      Alert.alert("Помилка", "Не вдалося зберегти продукт.");
    }
  };

  const startОновити = (item: Product) => {
    if (item.deleted_at) {
      Alert.alert("Оновлення", "Спочатку віднови продукт.");
      return;
    }
    setОновитиingId(item.id);
    setTitle(item.title);
    setPrice(String(item.price));
    setDescription(item.description ?? "");
  };

  const softDelete = async (id: string) => {
    await dbManager.deleteProduct(id);
    if (editingId === id) resetForm();
    await loadProducts(showDeleted);
  };

  const restore = async (id: string) => {
    await dbManager.restoreProduct(id);
    await loadProducts(showDeleted);
  };

  const hardDelete = (id: string, name: string) => {
    Alert.alert("Видалити повністю?", `«${name}» буде стерто з бази.`, [
      { text: "Скасувати", style: "cancel" },
      {
        text: "Видалити",
        style: "destructive",
        onPress: async () => {
          await dbManager.hardDeleteProduct(id);
          if (editingId === id) resetForm();
          await loadProducts(showDeleted);
        },
      },
    ]);
  };

  const onToggleShowDeleted = async (value: boolean) => {
    setShowDeleted(value);
    await loadProducts(value);
  };

  return (
    <Container style={{ padding: 20, flex: 1 }}>
      <Text style={styles.heading}>
        {editingId ? "Оновити продукт" : "Створити продукт"}
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Назва *"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Ціна *"
        value={price}
        onChangeText={setPrice}
        keyboardType="decimal-pad"
      />
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Опис"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <TouchableOpacity style={styles.primaryBtn} onPress={saveProduct}>
        <Text style={styles.primaryBtnText}>
          {editingId ? "Зберегти зміни" : "Створити продукт"}
        </Text>
      </TouchableOpacity>
      {editingId ? (
        <TouchableOpacity style={styles.secondaryBtn} onPress={resetForm}>
          <Text style={styles.secondaryBtnText}>Скасувати</Text>
        </TouchableOpacity>
      ) : null}

      <View style={styles.checkRow}>
        <Checkbox
          value={showDeleted}
          onValueChange={onToggleShowDeleted}
          color={showDeleted ? "#6e0e36" : undefined}
        />
        <Text style={styles.checkLabel}>Показати видалені продукти</Text>
      </View>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const isDeleted = Boolean(item.deleted_at);
          return (
            <View style={[styles.listItem, isDeleted && styles.listItemDeleted]}>
              <Text style={styles.listItemId}>{item.id.slice(0, 8)}…</Text>
              <Text style={styles.listItemText}>
                {item.title}
                {isDeleted ? " (видалено)" : ""}
              </Text>
              <Text style={styles.listItemPrice}>{item.price}</Text>
              {item.description ? (
                <Text style={styles.desc}>{item.description}</Text>
              ) : null}
              <Text style={styles.date}>
                {new Date(item.created_at).toDateString()}
              </Text>

              <View style={styles.actions}>
                {!isDeleted ? (
                  <>
                    <TouchableOpacity
                      style={styles.actionBtn}
                      onPress={() => startОновити(item)}
                    >
                      <Text style={styles.actionText}>Оновити</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.actionBtn}
                      onPress={() => softDelete(item.id)}
                    >
                      <Text style={styles.actionText}>Мʼяке видалення</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.actionBtn, styles.dangerBtn]}
                      onPress={() => hardDelete(item.id, item.title)}
                    >
                      <Text style={styles.dangerText}>Повністю</Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <>
                    <TouchableOpacity
                      style={styles.actionBtn}
                      onPress={() => restore(item.id)}
                    >
                      <Text style={styles.actionText}>Відновити</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.actionBtn, styles.dangerBtn]}
                      onPress={() => hardDelete(item.id, item.title)}
                    >
                      <Text style={styles.dangerText}>Повністю</Text>
                    </TouchableOpacity>
                  </>
                )}
              </View>
            </View>
          );
        }}
        ListEmptyComponent={
          <Text
            style={{
              textAlign: "center",
              marginTop: 50,
              color: "#999",
              fontSize: 16,
            }}
          >
            Products not found
          </Text>
        }
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
    color: "#1f1f1f",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 8,
    backgroundColor: "#fff",
  },
  textArea: { minHeight: 64, textAlignVertical: "top" },
  primaryBtn: {
    backgroundColor: "#6e0e36",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 4,
  },
  primaryBtnText: { color: "#fff", fontWeight: "700" },
  secondaryBtn: {
    backgroundColor: "#eee",
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
    marginTop: 8,
  },
  secondaryBtnText: { color: "#333", fontWeight: "600" },
  checkRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginVertical: 14,
  },
  checkLabel: { fontSize: 15, fontWeight: "600" },
  listItem: {
    backgroundColor: "#fff",
    marginBottom: 12,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#eee",
  },
  listItemDeleted: { opacity: 0.7, backgroundColor: "#f5f5f5" },
  listItemId: { fontSize: 11, color: "#999" },
  listItemText: { fontSize: 16, fontWeight: "700", marginTop: 4 },
  listItemPrice: { fontSize: 14, color: "#6e0e36", fontWeight: "700", marginTop: 2 },
  desc: { marginTop: 4, color: "#666" },
  date: { marginTop: 4, fontSize: 12, color: "#999" },
  actions: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 10 },
  actionBtn: {
    backgroundColor: "#f3e6ec",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  actionText: { color: "#6e0e36", fontWeight: "600", fontSize: 12 },
  dangerBtn: { backgroundColor: "#fde8e6" },
  dangerText: { color: "#c0392b", fontWeight: "600", fontSize: 12 },
});

export default DatabaseScreen;
