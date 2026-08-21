import { useState } from "react";
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
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

type Contact = {
  id: string;
  name: string;
  phone: string;
  email: string;
};

const Homework8Screen = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [contacts, setContacts] = useState<Contact[]>([]);

  const addContact = () => {
    const nextName = name.trim();
    const nextPhone = phone.trim();
    const nextEmail = email.trim();

    if (!nextName || !nextPhone) {
      Alert.alert("Форма", "Вкажи імʼя та телефон.");
      return;
    }

    const item: Contact = {
      id: `${Date.now()}`,
      name: nextName,
      phone: nextPhone,
      email: nextEmail,
    };

    setContacts((prev) => [item, ...prev]);
    setName("");
    setPhone("");
    setEmail("");
  };

  const deleteContact = (id: string, contactName: string) => {
    Alert.alert("Видалити контакт?", `«${contactName}» буде видалено.`, [
      { text: "Скасувати", style: "cancel" },
      {
        text: "Видалити",
        style: "destructive",
        onPress: () => {
          setContacts((prev) => prev.filter((c) => c.id !== id));
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <FlatList
          data={contacts}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          ListHeaderComponent={
            <View>
              <Text style={styles.title}>ДЗ 8 — Контакти</Text>
              <Text style={styles.hint}>
                Форма контакту: додай і видаляй. Контакти показуються картками.
              </Text>

              <View style={styles.formCard}>
                <Text style={styles.formTitle}>Новий контакт</Text>
                <TextInput
                  style={styles.input}
                  value={name}
                  onChangeText={setName}
                  placeholder="Імʼя *"
                  placeholderTextColor="#9aa7b5"
                />
                <TextInput
                  style={styles.input}
                  value={phone}
                  onChangeText={setPhone}
                  placeholder="Телефон *"
                  placeholderTextColor="#9aa7b5"
                  keyboardType="phone-pad"
                />
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Email (необовʼязково)"
                  placeholderTextColor="#9aa7b5"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                <TouchableOpacity style={styles.addBtn} onPress={addContact}>
                  <MaterialIcons name="person-add" size={20} color="#fff" />
                  <Text style={styles.addBtnText}>Додати контакт</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.section}>
                Контакти ({contacts.length})
              </Text>
            </View>
          }
          ListEmptyComponent={
            <Text style={styles.empty}>Поки немає контактів — додай перший.</Text>
          }
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {item.name.charAt(0).toUpperCase()}
                </Text>
              </View>
              <View style={styles.cardBody}>
                <Text style={styles.cardName}>{item.name}</Text>
                <Text style={styles.cardMeta}>{item.phone}</Text>
                {item.email ? (
                  <Text style={styles.cardMeta}>{item.email}</Text>
                ) : null}
              </View>
              <TouchableOpacity
                style={styles.deleteBtn}
                onPress={() => deleteContact(item.id, item.name)}
                hitSlop={8}
              >
                <MaterialIcons name="delete" size={22} color="#c0392b" />
              </TouchableOpacity>
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
    marginBottom: 18,
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
  addBtn: {
    marginTop: 4,
    backgroundColor: "#527da3",
    borderRadius: 10,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  addBtnText: { color: "#fff", fontWeight: "700", fontSize: 16 },
  section: {
    fontSize: 17,
    fontWeight: "700",
    color: "#1f3a56",
    marginBottom: 10,
  },
  empty: {
    textAlign: "center",
    color: "#8899aa",
    marginTop: 8,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#dde6ef",
    gap: 12,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#e8f0f7",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: 18,
    fontWeight: "800",
    color: "#527da3",
  },
  cardBody: { flex: 1 },
  cardName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1f3a56",
    marginBottom: 2,
  },
  cardMeta: { fontSize: 13, color: "#667788" },
  deleteBtn: {
    padding: 6,
  },
});

export default Homework8Screen;
