import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { useNavigation } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Entypo from "@expo/vector-icons/Entypo";

interface ChatUser {
  id: string;
  name: string;
  message: string;
  time: string;
  color: string;
  initial: string;
}

const USERS: ChatUser[] = [
  { id: "1", name: "Sakshi", message: "Hi! How are you?", time: "3:08 PM", color: "#4caf50", initial: "S" },
  { id: "2", name: "Anna", message: "See you tomorrow", time: "2:41 PM", color: "#2196f3", initial: "A" },
  { id: "3", name: "Oleg", message: "Ok, thanks!", time: "1:15 PM", color: "#ff9800", initial: "O" },
  { id: "4", name: "Maria", message: "Photo", time: "12:03 PM", color: "#9c27b0", initial: "M" },
  { id: "5", name: "Ivan", message: "Call me later", time: "11:20 AM", color: "#e91e63", initial: "I" },
  { id: "6", name: "Kate", message: "Homework done ✅", time: "10:05 AM", color: "#009688", initial: "K" },
  { id: "7", name: "Dima", message: "Where are you?", time: "Yesterday", color: "#3f51b5", initial: "D" },
  { id: "8", name: "Lena", message: "Good night", time: "Yesterday", color: "#795548", initial: "L" },
];

const Homework5Screen = () => {
  const navigation = useNavigation();

  const openMenu = () => {
    // open side drawer (Telegram-style menu)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const nav = navigation as any;
    if (nav.openDrawer) {
      nav.openDrawer();
    } else if (nav.getParent?.()?.openDrawer) {
      nav.getParent().openDrawer();
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      {/* Шапка як у Telegram: ☰ + Telegram */}
      <View style={styles.header}>
        <TouchableOpacity onPress={openMenu} style={styles.menuBtn} hitSlop={12}>
          <Entypo name="menu" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Telegram</Text>
      </View>

      {/* Колонка користувачів / чатів */}
      <FlatList
        data={USERS}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => (
          <Pressable style={styles.row}>
            <View style={[styles.avatar, { backgroundColor: item.color }]}>
              <Text style={styles.avatarText}>{item.initial}</Text>
            </View>
            <View style={styles.rowText}>
              <View style={styles.rowTop}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.time}>{item.time}</Text>
              </View>
              <Text style={styles.message} numberOfLines={1}>
                {item.message}
              </Text>
            </View>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    height: 56,
    backgroundColor: "#527da3",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  menuBtn: {
    marginRight: 16,
    padding: 4,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  avatarText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  rowText: {
    flex: 1,
  },
  rowTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222",
  },
  time: {
    fontSize: 12,
    color: "#8a8a8a",
  },
  message: {
    fontSize: 14,
    color: "#6d6d6d",
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#e6e6e6",
    marginLeft: 78,
  },
});

export default Homework5Screen;
