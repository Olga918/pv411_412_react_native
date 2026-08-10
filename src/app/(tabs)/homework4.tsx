import { useEffect, useRef, useState } from "react";
import { useEventListener } from "expo";
import { useAudioPlayer, setAudioModeAsync } from "expo-audio";
import { useVideoPlayer, VideoView } from "expo-video";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import { Container } from "@/components/ui/container";
import { SafeAreaView } from "react-native-safe-area-context";

const Homework4Screen = () => {
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const videoDelayRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const syncLockRef = useRef(false);

  const audioPlayer = useAudioPlayer(require("../../../assets/audio/audio.mp3"));
  const player = useVideoPlayer(require("../../../assets/videos/cat1.mp4"), (videoPlayer) => {
    videoPlayer.loop = true;
    videoPlayer.audioMixingMode = "mixWithOthers";
  });

  useEffect(() => {
    setAudioModeAsync({
      playsInSilentMode: true,
      interruptionMode: "mixWithOthers",
    });

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (videoDelayRef.current) {
        clearTimeout(videoDelayRef.current);
      }
    };
  }, []);

  // Pause/play on video controls also controls music
  useEventListener(player, "playingChange", ({ isPlaying }) => {
    if (syncLockRef.current) return;
    try {
      if (isPlaying) {
        audioPlayer.play();
      } else {
        audioPlayer.pause();
      }
    } catch {
      // ignore
    }
  });

  const stopAll = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (videoDelayRef.current) {
      clearTimeout(videoDelayRef.current);
      videoDelayRef.current = null;
    }
    syncLockRef.current = true;
    try {
      audioPlayer.pause();
      player.pause();
    } catch {
      // ignore
    }
    setTimeout(() => {
      syncLockRef.current = false;
    }, 300);
  };

  const playSuccessThenVideo = async () => {
    syncLockRef.current = true;
    try {
      player.pause();
    } catch {
      // ignore
    }

    try {
      await audioPlayer.seekTo(0);
    } catch {
      // ignore
    }
    audioPlayer.play();
    player.play();
    setTimeout(() => {
      syncLockRef.current = false;
    }, 300);
  };

  const resetToStart = () => {
    stopAll();
    setStarted(false);
    setDone(false);
    setProgress(0);
  };

  const startLoading = () => {
    if (started && !done) return;

    stopAll();
    setStarted(true);
    setDone(false);
    setProgress(0);

    let value = 0;
    timerRef.current = setInterval(() => {
      value += 5;
      if (value >= 100) {
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
        setProgress(100);
        setDone(true);
        playSuccessThenVideo();
        return;
      }
      setProgress(value);
    }, 100);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.header}>Домашнє завдання 4</Text>
        <Text style={styles.subtitle}>Відео з прогрес-баром</Text>

        <Container style={styles.playerBox}>
          <VideoView
            style={styles.video}
            player={player}
            allowsPictureInPicture
            nativeControls
            contentFit="contain"
          />

          {!done && (
            <View style={styles.overlay}>
              {!started ? (
                <TouchableOpacity style={styles.startButton} onPress={startLoading}>
                  <Text style={styles.buttonText}>Включити відео</Text>
                </TouchableOpacity>
              ) : (
                <View style={styles.loadingBlock}>
                  <Text style={styles.loadingText}>Завантаження... {progress}%</Text>
                  <View style={styles.progressTrack}>
                    <View style={[styles.progressFill, { width: `${progress}%` }]} />
                  </View>
                  <TouchableOpacity
                    style={[styles.startButton, { backgroundColor: "#af5252", marginTop: 16 }]}
                    onPress={resetToStart}
                  >
                    <Text style={styles.buttonText}>Скасувати</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )}
        </Container>

        {done && (
          <Container>
            <Text style={styles.successText}>Успіх!</Text>
            <TouchableOpacity
              style={[styles.startButton, { backgroundColor: "#268844" }]}
              onPress={playSuccessThenVideo}
            >
              <Text style={styles.buttonText}>Play знову</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.startButton, { backgroundColor: "#af5252", marginTop: 8 }]}
              onPress={stopAll}
            >
              <Text style={styles.buttonText}>Stop звук і відео</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.startButton, { backgroundColor: "#722b48", marginTop: 8 }]}
              onPress={resetToStart}
            >
              <Text style={styles.buttonText}>Спочатку</Text>
            </TouchableOpacity>
          </Container>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#f3f3f3",
  },
  content: {
    paddingBottom: 40,
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
  playerBox: {
    height: 420,
    paddingVertical: 10,
    justifyContent: "center",
  },
  video: {
    width: "100%",
    height: 360,
    borderRadius: 8,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    justifyContent: "center",
    padding: 16,
    zIndex: 2,
    elevation: 4,
  },
  startButton: {
    backgroundColor: "#722b48",
    borderRadius: 8,
    paddingVertical: 16,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
    textTransform: "uppercase",
  },
  loadingBlock: {
    width: "100%",
  },
  loadingText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    color: "#424242",
    textTransform: "uppercase",
    marginBottom: 12,
  },
  progressTrack: {
    height: 22,
    borderRadius: 11,
    backgroundColor: "#e5e5e5",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#91345b",
    borderRadius: 11,
  },
  successText: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "#268844",
    textTransform: "uppercase",
    marginVertical: 8,
  },
});

export default Homework4Screen;
