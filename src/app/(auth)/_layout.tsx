import { Stack } from "expo-router";

const AuthLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="login"
        options={{
          title: "Auth",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="set-pin"
        options={{
          title: "Створити PIN",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="unlock-pin"
        options={{
          title: "Введіть PIN",
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default AuthLayout;
