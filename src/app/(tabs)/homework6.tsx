import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useVideoPlayer, VideoView } from "expo-video";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";

type BottomTab = "home" | "shorts" | "add" | "subs" | "you";

export interface FeedVideo {
  id: string;
  title: string;
  date: string;
  videoKey: string;
  musicKey: string;
  musicTitle: string;
  videoSource: number;
}

export const YOUTUBE_VIDEOS: FeedVideo[] = [
  {
    id: "1",
    title: "Моє відео 1",
    date: "11.08.2026",
    videoKey: "video1",
    musicKey: "music1",
    musicTitle: "Музика 1",
    videoSource: require("../../../assets/videos/video1.mp4"),
  },
  {
    id: "2",
    title: "Моє відео 2",
    date: "11.08.2026",
    videoKey: "video2",
    musicKey: "music2",
    musicTitle: "Музика 2",
    videoSource: require("../../../assets/videos/video2.mp4"),
  },
  {
    id: "3",
    title: "Моє відео 3",
    date: "11.08.2026",
    videoKey: "video3",
    musicKey: "music3",
    musicTitle: "Музика 3",
    videoSource: require("../../../assets/videos/video3.mp4"),
  },
];

const PreviewCard = ({
  item,
  onPress,
}: {
  item: FeedVideo;
  onPress: () => void;
}) => {
  const previewPlayer = useVideoPlayer(item.videoSource, (p) => {
    p.loop = false;
    p.muted = true;
    p.pause();
  });

  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.previewBox}>
        <VideoView
          style={styles.preview}
          player={previewPlayer}
          contentFit="cover"
          nativeControls={false}
        />
        <View style={styles.playBadge}>
          <Entypo name="controller-play" size={28} color="#fff" />
        </View>
      </View>
            <View style={styles.cardInfo}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardDate}>Створено: {item.date}</Text>
            </View>
    </Pressable>
  );
};

const Homework6Screen = () => {
  const router = useRouter();
  const [tab, setTab] = useState<BottomTab>("home");

  const goHome = () => {
    router.push("/");
  };

  const openVideo = (item: FeedVideo, index: number) => {
    router.push({
      pathname: "/video_modal",
      params: {
        id: item.id,
        title: item.title,
        date: item.date,
        videoKey: item.videoKey,
        musicKey: item.musicKey,
        musicTitle: item.musicTitle,
        index: String(index),
      },
    });
  };

  const onTabPress = (next: BottomTab) => {
    if (next === "home") {
      router.push("/");
      return;
    }
    if (next === "add") {
      Alert.alert("Створити", "Тут буде створення відео");
      return;
    }
    setTab(next);
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goHome} style={styles.homeBtn} hitSlop={12}>
          <Entypo name="home" size={24} color="#fff" />
        </TouchableOpacity>
        <Entypo name="youtube" size={28} color="#fff" />
        <Text style={styles.headerTitle}>MyTube</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity style={styles.homeBanner} onPress={goHome}>
          <Text style={styles.homeBannerText}>← На головну</Text>
        </TouchableOpacity>

        {tab === "home" &&
          YOUTUBE_VIDEOS.map((item, index) => (
            <PreviewCard
              key={item.id}
              item={item}
              onPress={() => openVideo(item, index)}
            />
          ))}

        {tab === "shorts" && (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderTitle}>Shorts</Text>
            <Text style={styles.placeholderText}>Короткі відео зʼявляться тут</Text>
          </View>
        )}

        {tab === "subs" && (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderTitle}>Підписки</Text>
            <Text style={styles.placeholderText}>Список підписок</Text>
          </View>
        )}

        {tab === "you" && (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderTitle}>Ви</Text>
            <Text style={styles.placeholderText}>Ваш профіль MyTube</Text>
          </View>
        )}
      </ScrollView>

      <SafeAreaView edges={["bottom"]} style={styles.bottomBarWrap}>
        <View style={styles.bottomBar}>
          <TouchableOpacity style={styles.tabItem} onPress={() => onTabPress("home")}>
            <Ionicons
              name={tab === "home" ? "home" : "home-outline"}
              size={24}
              color="#fff"
            />
            <Text style={[styles.tabLabel, tab === "home" && styles.tabLabelActive]}>
              Главная
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.tabItem} onPress={() => onTabPress("shorts")}>
            <MaterialIcons name="bolt" size={26} color="#fff" />
            <Text style={[styles.tabLabel, tab === "shorts" && styles.tabLabelActive]}>
              Shorts
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.tabItem} onPress={() => onTabPress("add")}>
            <View style={styles.addBtn}>
              <MaterialIcons name="add" size={30} color="#fff" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.tabItem} onPress={() => onTabPress("subs")}>
            <View>
              <MaterialIcons name="subscriptions" size={24} color="#fff" />
              <View style={styles.notifDot} />
            </View>
            <Text style={[styles.tabLabel, tab === "subs" && styles.tabLabelActive]}>
              Подписки
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.tabItem} onPress={() => onTabPress("you")}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>0</Text>
            </View>
            <Text style={[styles.tabLabel, tab === "you" && styles.tabLabelActive]}>
              Вы
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  header: {
    height: 56,
    backgroundColor: "#cc0000",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    gap: 10,
  },
  homeBtn: {
    padding: 4,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
  content: {
    padding: 12,
    paddingBottom: 24,
    flexGrow: 1,
  },
  placeholder: {
    marginTop: 40,
    alignItems: "center",
    paddingHorizontal: 24,
  },
  placeholderTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#222",
    marginBottom: 8,
  },
  placeholderText: {
    fontSize: 15,
    color: "#777",
    textAlign: "center",
  },
  bottomBarWrap: {
    backgroundColor: "#0f0f0f",
  },
  bottomBar: {
    height: 56,
    backgroundColor: "#0f0f0f",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 4,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
  },
  tabLabel: {
    color: "#ddd",
    fontSize: 10,
  },
  tabLabelActive: {
    color: "#fff",
    fontWeight: "700",
  },
  addBtn: {
    width: 44,
    height: 30,
    borderRadius: 15,
    borderWidth: 1.5,
    borderColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#272727",
  },
  notifDot: {
    position: "absolute",
    top: -2,
    right: -4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#cc0000",
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#3ea6ff",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
  },
  homeBanner: {
    backgroundColor: "#527da3",
    borderRadius: 8,
    paddingVertical: 12,
    marginBottom: 12,
  },
  homeBannerText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 14,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  previewBox: {
    width: "100%",
    height: 190,
    backgroundColor: "#222",
    justifyContent: "center",
    alignItems: "center",
  },
  preview: {
    width: "100%",
    height: "100%",
  },
  playBadge: {
    position: "absolute",
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "rgba(0,0,0,0.55)",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 4,
  },
  cardInfo: {
    padding: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#222",
    marginBottom: 4,
  },
  cardDate: {
    fontSize: 13,
    color: "#777",
  },
});

export default Homework6Screen;
