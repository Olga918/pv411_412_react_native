import { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  ToastAndroid,
  SectionList,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { Container } from "@/components/ui/container";

type CharacterClass = "Warrior" | "Mage" | "Archer" | "Healer";

interface Character {
  id: string;
  name: string;
  className: CharacterClass;
  power: number;
  imageId: string;
}

interface ImageOption {
  id: string;
  label: string;
  source: number;
}

interface DropDownItem {
  label: string;
  value: CharacterClass;
}

const IMAGE_OPTIONS: ImageOption[] = [
  { id: "react", label: "React", source: require("../../../assets/images/react-logo.png") },
  { id: "expo", label: "Expo", source: require("../../../assets/images/expo-logo.png") },
  { id: "icon", label: "Icon", source: require("../../../assets/images/icon.png") },
  { id: "tutorial", label: "Tutorial", source: require("../../../assets/images/tutorial-web.png") },
  { id: "glow", label: "Glow", source: require("../../../assets/images/logo-glow.png") },
  { id: "badge", label: "Badge", source: require("../../../assets/images/expo-badge.png") },
];

const CLASS_OPTIONS: DropDownItem[] = [
  { label: "Warrior", value: "Warrior" },
  { label: "Mage", value: "Mage" },
  { label: "Archer", value: "Archer" },
  { label: "Healer", value: "Healer" },
];

const INITIAL_CHARACTERS: Character[] = [
  { id: "1", name: "Aragorn", className: "Warrior", power: 85, imageId: "icon" },
  { id: "2", name: "Gandalf", className: "Mage", power: 95, imageId: "glow" },
  { id: "3", name: "Legolas", className: "Archer", power: 80, imageId: "react" },
];

const getImageSource = (imageId: string) => {
  const found = IMAGE_OPTIONS.find((item) => item.id === imageId);
  return found ? found.source : IMAGE_OPTIONS[0].source;
};

const Homework3Screen = () => {
  const [characters, setCharacters] = useState<Character[]>(INITIAL_CHARACTERS);
  const [name, setName] = useState("");
  const [power, setPower] = useState("");
  const [className, setClassName] = useState<CharacterClass | null>(null);
  const [imageId, setImageId] = useState(IMAGE_OPTIONS[0].id);
  const [isFocus, setIsFocus] = useState(false);

  const sections = useMemo(() => {
    const map = new Map<CharacterClass, Character[]>();

    characters.forEach((character) => {
      const list = map.get(character.className) ?? [];
      list.push(character);
      map.set(character.className, list);
    });

    return Array.from(map.entries()).map(([title, data]) => ({
      title,
      data,
    }));
  }, [characters]);

  const addCharacter = () => {
    if (name.trim() === "") {
      Alert.alert("Помилка", "Введіть ім'я персонажа");
      return;
    }
    if (!className) {
      Alert.alert("Помилка", "Оберіть клас персонажа");
      return;
    }

    const powerNumber = Number(power);
    if (!power.trim() || Number.isNaN(powerNumber) || powerNumber <= 0) {
      Alert.alert("Помилка", "Введіть коректну силу (число > 0)");
      return;
    }

    setCharacters((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        name: name.trim(),
        className,
        power: powerNumber,
        imageId,
      },
    ]);

    setName("");
    setPower("");
    setClassName(null);
    setImageId(IMAGE_OPTIONS[0].id);
    ToastAndroid.show("Персонажа додано успішно", ToastAndroid.SHORT);
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.header}>Домашнє завдання 3</Text>
      <Text style={styles.subtitle}>Каталог персонажів</Text>

      <Container>
        <Text style={styles.sectionTitle}>Форма створення</Text>

        <TextInput
          style={styles.input}
          placeholder="Ім'я персонажа"
          value={name}
          onChangeText={setName}
          placeholderTextColor="#999"
        />

        <TextInput
          style={styles.input}
          placeholder="Сила (наприклад 70)"
          value={power}
          onChangeText={setPower}
          keyboardType="numeric"
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>Клас:</Text>
        <Dropdown
          style={[styles.dropdown, isFocus && styles.dropdownFocused]}
          placeholderStyle={styles.placeholderText}
          selectedTextStyle={styles.selectedText}
          placeholder={!isFocus ? "Оберіть клас" : "..."}
          data={CLASS_OPTIONS}
          labelField="label"
          valueField="value"
          value={className}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => {
            setClassName(item.value);
            setIsFocus(false);
          }}
        />

        <Text style={styles.label}>Зображення:</Text>
        <View style={styles.imagePickerRow}>
          {IMAGE_OPTIONS.map((option) => (
            <Pressable
              key={option.id}
              style={[
                styles.imageOption,
                imageId === option.id && styles.imageOptionSelected,
              ]}
              onPress={() => setImageId(option.id)}
            >
              <Image source={option.source} style={styles.imageThumb} />
              <Text style={styles.imageLabel}>{option.label}</Text>
            </Pressable>
          ))}
        </View>

        <Pressable style={styles.addButton} onPress={addCharacter}>
          <Text style={styles.addButtonText}>Додати персонажа</Text>
        </Pressable>
      </Container>

      <Container>
        <Text style={styles.sectionTitle}>Список за класами (SectionList)</Text>
        <SectionList
          sections={sections}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          renderSectionHeader={({ section: { title } }) => (
            <View style={styles.headerRow}>
              <Text style={styles.headerText}>{title}</Text>
            </View>
          )}
          renderItem={({ item }) => (
            <View style={styles.characterCard}>
              <Image source={getImageSource(item.imageId)} style={styles.avatar} />
              <View style={styles.characterInfo}>
                <Text style={styles.characterName}>{item.name}</Text>
                <Text style={styles.characterMeta}>Клас: {item.className}</Text>
                <Text style={styles.characterMeta}>Сила: {item.power}</Text>
              </View>
            </View>
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Каталог порожній</Text>
          }
        />
      </Container>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
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
  sectionTitle: {
    textAlign: "center",
    marginVertical: 8,
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "#424242",
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  dropdown: {
    height: 50,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderLeftColor: "#722b48",
    borderTopColor: "#722b48",
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 12,
  },
  dropdownFocused: {
    borderLeftColor: "#3d1324",
    borderTopColor: "#3d1324",
  },
  placeholderText: {
    fontSize: 16,
    color: "#999",
  },
  selectedText: {
    fontSize: 16,
  },
  imagePickerRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 12,
  },
  imageOption: {
    width: "30%",
    alignItems: "center",
    padding: 6,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#ddd",
    backgroundColor: "#fafafa",
  },
  imageOptionSelected: {
    borderColor: "#91345b",
    backgroundColor: "#f8e8ef",
  },
  imageThumb: {
    width: 48,
    height: 48,
    resizeMode: "contain",
  },
  imageLabel: {
    marginTop: 4,
    fontSize: 12,
    color: "#444",
  },
  addButton: {
    backgroundColor: "#722b48",
    borderRadius: 8,
    paddingVertical: 12,
    marginTop: 4,
  },
  addButtonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
    textTransform: "uppercase",
  },
  headerRow: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 8,
    backgroundColor: "#f0e6eb",
    borderRadius: 8,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  characterCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    padding: 12,
    marginBottom: 8,
    borderRadius: 10,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderLeftColor: "#722b48",
    borderTopColor: "#722b48",
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 8,
    resizeMode: "contain",
    marginRight: 12,
  },
  characterInfo: {
    flex: 1,
  },
  characterName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 2,
  },
  characterMeta: {
    fontSize: 14,
    color: "#555",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    color: "#8e8e93",
    fontSize: 16,
  },
});

export default Homework3Screen;
