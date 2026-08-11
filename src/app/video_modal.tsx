import { useEffect, useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  StatusBar,
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useVideoPlayer, VideoView } from "expo-video";
import { useAudioPlayer, setAudioModeAsync } from "expo-audio";
import Entypo from "@expo/vector-icons/Entypo";
import { YOUTUBE_VIDEOS } from "./(tabs)/homework6";

const VIDEO_SOURCES: Record<string, number> = {
  video1: require("../../assets/videos/video1.mp4"),
  video2: require("../../assets/videos/video2.mp4"),
  video3: require("../../assets/videos/video3.mp4"),
};

const MUSIC_SOURCES: Record<string, number> = {
  music1: require("../../assets/audio/music1.mp3"),
  music2: require("../../assets/audio/music2.mp3"),
  music3: require("../../assets/audio/music3.mp3"),
};

const VideoModalScreen = () => {
  const router = useRouter();
  const { index: indexParam } = useLocalSearchParams<{ index?: string }>();
  const listRef = useRef<FlatList>(null);

  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  const startIndex = Math.min(
    Math.max(Number(indexParam ?? 0) || 0, 0),
    YOUTUBE_VIDEOS.length - 1
  );
  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const [musicOn, setMusicOn] = useState(true);
  const current = YOUTUBE_VIDEOS[currentIndex];

  const videoSource = useMemo(() => {
    return VIDEO_SOURCES[current.videoKey] ?? VIDEO_SOURCES.video1;
  }, [current.videoKey]);

  const musicSource = useMemo(() => {
    return MUSIC_SOURCES[current.musicKey] ?? MUSIC_SOURCES.music1;
  }, [current.musicKey]);

  const audioPlayer = useAudioPlayer(MUSIC_SOURCES.music1);

  const player = useVideoPlayer(videoSource, (videoPlayer) => {
    videoPlayer.loop = true;
    videoPlayer.muted = true;
    videoPlayer.audioMixingMode = "mixWithOthers";
    videoPlayer.play();
  });

  useEffect(() => {
    setAudioModeAsync({
      playsInSilentMode: true,
      interruptionMode: "mixWithOthers",
    });
  }, []);

  useEffect(() => {
    player.muted = true;
    player.audioMixingMode = "mixWithOthers";
    player.replaceAsync(videoSource).then(() => {
      player.play();
    });
  }, [videoSource, player]);

  useEffect(() => {
    let cancelled = false;

    const playMusic = async () => {
      try {
        audioPlayer.replace(musicSource);
        await audioPlayer.seekTo(0);
        if (!cancelled && musicOn) {
          audioPlayer.play();
        }
      } catch {
        if (!cancelled && musicOn) {
          audioPlayer.play();
        }
      }
    };

    if (musicOn) {
      playMusic();
    } else {
      try {
        audioPlayer.pause();
      } catch {
        // ignore
      }
    }

    return () => {
      cancelled = true;
      try {
        audioPlayer.pause();
      } catch {
        // ignore
      }
    };
  }, [musicSource, musicOn, audioPlayer]);

  const stopAllAndClose = () => {
    try {
      audioPlayer.pause();
      player.pause();
    } catch {
      // ignore
    }
    router.back();
  };

  const onScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const i = Math.round(e.nativeEvent.contentOffset.x / width);
    if (i !== currentIndex && i >= 0 && i < YOUTUBE_VIDEOS.length) {
      setCurrentIndex(i);
    }
  };

  const goTo = (i: number) => {
    if (i < 0 || i >= YOUTUBE_VIDEOS.length) return;
    setCurrentIndex(i);
    listRef.current?.scrollToIndex({ index: i, animated: true });
  };

  return (
    <View style={[styles.root, isLandscape && styles.rootFullscreen]}>
      <StatusBar hidden={isLandscape} />

      {!isLandscape && (
        <SafeAreaView edges={["top"]} style={styles.topBar}>
          <TouchableOpacity onPress={stopAllAndClose} style={styles.backBtn} hitSlop={12}>
            <Entypo name="chevron-left" size={28} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.topTitle} numberOfLines={1}>
            {current.title}
          </Text>
        </SafeAreaView>
      )}

      <View style={[styles.videoWrap, isLandscape && styles.videoWrapFullscreen]}>
        <VideoView
          style={styles.video}
          player={player}
          nativeControls
          contentFit="contain"
          allowsFullscreen
        />
      </View>

      {!isLandscape && (
        <FlatList
          ref={listRef}
          data={YOUTUBE_VIDEOS}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          initialScrollIndex={startIndex}
          getItemLayout={(_, i) => ({
            length: width,
            offset: width * i,
            index: i,
          })}
          onMomentumScrollEnd={onScrollEnd}
          style={styles.swipeList}
          renderItem={({ item, index }) => (
            <View style={{ width, paddingHorizontal: 16, paddingTop: 8 }}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.date}>Створено: {item.date}</Text>

              <View style={styles.navRow}>
                <TouchableOpacity
                  style={[styles.navBtn, index === 0 && styles.navDisabled]}
                  disabled={index === 0}
                  onPress={() => goTo(index - 1)}
                >
                  <Text style={styles.navText}>← Попереднє</Text>
                </TouchableOpacity>
                <Text style={styles.counter}>
                  {index + 1}/{YOUTUBE_VIDEOS.length}
                </Text>
                <TouchableOpacity
                  style={[
                    styles.navBtn,
                    index === YOUTUBE_VIDEOS.length - 1 && styles.navDisabled,
                  ]}
                  disabled={index === YOUTUBE_VIDEOS.length - 1}
                  onPress={() => goTo(index + 1)}
                >
                  <Text style={styles.navText}>Наступне →</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={[styles.nextBig, index === YOUTUBE_VIDEOS.length - 1 && styles.navDisabled]}
                disabled={index === YOUTUBE_VIDEOS.length - 1}
                onPress={() => goTo(index + 1)}
              >
                <Text style={styles.nextBigText}>Дивитись наступне відео →</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.musicToggle, !musicOn && styles.musicToggleOff]}
                onPress={() => setMusicOn((v) => !v)}
              >
                <Entypo name="music" size={18} color="#fff" />
                <Text style={styles.musicToggleText}>
                  {musicOn ? "Музика увімкнена" : "Музика вимкнена"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.closeBtn} onPress={stopAllAndClose}>
                <Text style={styles.closeText}>Закрити</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}

      {isLandscape && (
        <TouchableOpacity style={styles.landscapeClose} onPress={stopAllAndClose}>
          <Entypo name="cross" size={26} color="#fff" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#111",
  },
  rootFullscreen: {
    backgroundColor: "#000",
  },
  topBar: {
    backgroundColor: "#cc0000",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingBottom: 10,
  },
  backBtn: {
    padding: 4,
    marginRight: 6,
  },
  topTitle: {
    flex: 1,
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  videoWrap: {
    width: "100%",
    height: 240,
    backgroundColor: "#000",
  },
  videoWrapFullscreen: {
    ...StyleSheet.absoluteFillObject,
    height: "100%",
    zIndex: 1,
  },
  video: {
    width: "100%",
    height: "100%",
  },
  swipeList: {
    flex: 1,
    backgroundColor: "#1a1a1a",
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  date: {
    color: "#aaa",
    fontSize: 14,
    marginBottom: 16,
  },
  musicToggle: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#268844",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 14,
  },
  musicToggleOff: {
    backgroundColor: "#555",
  },
  musicToggleText: {
    color: "#fff",
    fontWeight: "bold",
  },
  navRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  navBtn: {
    backgroundColor: "#333",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  navDisabled: {
    opacity: 0.35,
  },
  navText: {
    color: "#fff",
    fontWeight: "bold",
  },
  counter: {
    color: "#ccc",
    fontSize: 14,
  },
  nextBig: {
    backgroundColor: "#527da3",
    borderRadius: 8,
    paddingVertical: 14,
    marginBottom: 12,
  },
  nextBigText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  closeBtn: {
    backgroundColor: "#cc0000",
    borderRadius: 8,
    paddingVertical: 12,
  },
  closeText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  landscapeClose: {
    position: "absolute",
    top: 16,
    right: 16,
    zIndex: 2,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 18,
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default VideoModalScreen;
