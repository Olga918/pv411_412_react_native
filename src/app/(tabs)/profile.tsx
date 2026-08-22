import { View, Text, StyleSheet, Button, ActivityIndicator } from "react-native";
import { useAuth } from "@/context/AuthContext";
import { authApi } from "@/lib/auth-api";
import { useEffect, useState } from "react";
import { Container } from "@/components/ui/container";

interface UserData {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
}

/** Like teacher + HW 11 (PIN) */
const ProfileScreen = () => {
  const { logout, lockApp, hasPin, token } = useAuth();
  const [userData, setUserData] = useState<UserData>();
  const [loading, setLoading] = useState(true);
  const isGuest = token === "guest-local-token";

  useEffect(() => {
    if (isGuest) {
      setLoading(false);
      return;
    }
    authApi
      .get("/auth/me")
      .then((res) => setUserData(res.data))
      .catch((err) => console.error("Get user profile failed: ", err))
      .finally(() => setLoading(false));
  }, [isGuest]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Container style={{ padding: 20 }}>
      <Text style={styles.welcome}>Welcome!</Text>
      {isGuest ? (
        <View style={styles.profileCard}>
          <Text style={styles.info}>Режим: гість</Text>
        </View>
      ) : null}
      {userData && (
        <View style={styles.profileCard}>
          <Text style={styles.info}>
            Name: {userData.firstName} {userData.lastName}
          </Text>
          <Text style={styles.info}>Email: {userData.email}</Text>
        </View>
      )}
      {hasPin ? (
        <View style={{ marginBottom: 12 }}>
          <Button title="Заблокувати PIN" onPress={lockApp} color="#8b4513" />
        </View>
      ) : null}
      <Button title="Вийти" onPress={logout} color="#6e0e36" />
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  welcome: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  profileCard: {
    backgroundColor: "#f0f0f0",
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    width: "100%",
  },
  info: { fontSize: 16, marginBottom: 5 },
});

export default ProfileScreen;
