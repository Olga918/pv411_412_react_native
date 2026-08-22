import { useCallback, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect, useRouter } from "expo-router";
import { CameraView, useCameraPermissions } from "expo-camera";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const Homework7Screen = () => {
  const router = useRouter();
  const cameraRef = useRef<CameraView>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [torchOn, setTorchOn] = useState(false);
  const [cameraReady, setCameraReady] = useState(false);
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [taking, setTaking] = useState(false);

  // Reset photo and torch when leaving the screen
  useFocusEffect(
    useCallback(() => {
      return () => {
        setPhotoUri(null);
        setTorchOn(false);
        setCameraReady(false);
        setTaking(false);
      };
    }, [])
  );

  const goВийти = () => {
    setPhotoUri(null);
    setTorchOn(false);
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push("/");
    }
  };

  const takePhoto = async () => {
    if (!cameraRef.current || !cameraReady || taking) return;
    try {
      setTaking(true);
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
        skipProcessing: true,
      });
      if (photo?.uri) {
        setPhotoUri(photo.uri);
        setTorchOn(false);
      }
    } catch {
      // ignore
    } finally {
      setTaking(false);
    }
  };

  if (!permission) {
    return (
      <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
        <ActivityIndicator size="large" color="#ff9800" />
      </SafeAreaView>
    );
  }

  if (!permission.granted) {
    return (
      <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
        <View style={styles.center}>
          <Text style={styles.title}>ДЗ 7 — Ліхтарик</Text>
          <Text style={styles.hint}>
            Потрібен доступ до камери, щоб керувати ліхтарем і робити знімок.
          </Text>
          <TouchableOpacity style={styles.button} onPress={requestPermission}>
            <Text style={styles.buttonText}>Дозволити камеру</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.exitBtn]} onPress={goВийти}>
            <Text style={styles.buttonText}>Вийти</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (photoUri) {
    return (
      <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
        <View style={styles.header}>
          <TouchableOpacity onPress={goВийти} hitSlop={12} style={styles.headerBtn}>
            <MaterialIcons name="close" size={26} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Знімок</Text>
        </View>
        <Image source={{ uri: photoUri }} style={styles.photo} resizeMode="contain" />
        <View style={styles.panel}>
          <TouchableOpacity
            style={[styles.button, styles.buttonOn]}
            onPress={() => setPhotoUri(null)}
          >
            <MaterialIcons name="photo-camera" size={22} color="#fff" />
            <Text style={styles.buttonText}>Зробити ще знімок</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.exitBtn]} onPress={goВийти}>
            <MaterialIcons name="exit-to-app" size={22} color="#fff" />
            <Text style={styles.buttonText}>Вийти</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goВийти} hitSlop={12} style={styles.headerBtn}>
          <MaterialIcons name="close" size={26} color="#fff" />
        </TouchableOpacity>
        <MaterialIcons name="flashlight-on" size={24} color="#fff" />
        <Text style={styles.headerTitle}>ДЗ 7 — Ліхтарик</Text>
      </View>

      <CameraView
        ref={cameraRef}
        style={styles.camera}
        facing="back"
        enableTorch={torchOn}
        onCameraReady={() => setCameraReady(true)}
      />

      <View style={styles.panel}>
        <Text style={styles.statusLabel}>
          Статус ліхтаря:{" "}
          <Text style={[styles.status, torchOn ? styles.on : styles.off]}>
            {torchOn ? "УВІМКНЕНО" : "ВИМКНЕНО"}
          </Text>
        </Text>

        <View style={styles.row}>
          <TouchableOpacity
            style={[
              styles.buttonHalf,
              torchOn ? styles.buttonOff : styles.buttonOn,
            ]}
            disabled={!cameraReady}
            onPress={() => setTorchOn((v) => !v)}
          >
            <MaterialIcons
              name={torchOn ? "flashlight-off" : "flashlight-on"}
              size={20}
              color="#fff"
            />
            <Text style={styles.buttonTextSmall}>
              {torchOn ? "Вимкнути" : "Увімкнути"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.buttonHalf, styles.shotBtn]}
            disabled={!cameraReady || taking}
            onPress={takePhoto}
          >
            <MaterialIcons name="camera-alt" size={20} color="#fff" />
            <Text style={styles.buttonTextSmall}>
              {taking ? "..." : "Знімок"}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={[styles.button, styles.exitBtn]} onPress={goВийти}>
          <MaterialIcons name="exit-to-app" size={20} color="#fff" />
          <Text style={styles.buttonText}>Вийти</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#1a1a1a",
  },
  header: {
    height: 52,
    backgroundColor: "#ff9800",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    gap: 8,
  },
  headerBtn: {
    padding: 4,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  camera: {
    flex: 1,
  },
  photo: {
    flex: 1,
    backgroundColor: "#000",
  },
  panel: {
    paddingTop: 10,
    paddingBottom: 8,
    paddingHorizontal: 14,
    backgroundColor: "#1a1a1a",
    alignItems: "center",
    gap: 8,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    gap: 16,
  },
  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
  },
  hint: {
    color: "#ccc",
    fontSize: 15,
    textAlign: "center",
    marginBottom: 12,
  },
  statusLabel: {
    color: "#aaa",
    fontSize: 15,
  },
  status: {
    fontSize: 16,
    fontWeight: "bold",
  },
  on: {
    color: "#ffeb3b",
  },
  off: {
    color: "#888",
  },
  row: {
    flexDirection: "row",
    width: "100%",
    gap: 8,
  },
  button: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#527da3",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  buttonHalf: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  buttonOn: {
    backgroundColor: "#f57c00",
  },
  buttonOff: {
    backgroundColor: "#555",
  },
  shotBtn: {
    backgroundColor: "#268844",
  },
  exitBtn: {
    backgroundColor: "#cc0000",
  },
  buttonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
  },
  buttonTextSmall: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default Homework7Screen;
