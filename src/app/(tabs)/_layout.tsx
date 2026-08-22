import { Text, View } from "react-native";
import {
  Drawer,
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from "expo-router/drawer";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Ionicons from "@expo/vector-icons/Ionicons";

const DrawerContent = (props: DrawerContentComponentProps) => {
  return (
    <View style={{ flex: 1, marginTop: 60, marginBottom: 60, padding: 5 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ paddingTop: 0 }}
      >
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <Text>React Native Lessons</Text>
      <Text>2026</Text>
    </View>
  );
};

const TabLayout = () => {
  return (
    <Drawer
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{
        swipeEnabled: true,
        swipeEdgeWidth: 100,
        headerShown: true,
        drawerStyle: {
          backgroundColor: "#fff",
          width: "70%",
          borderRadius: 0,
        },
        drawerActiveTintColor: "#4b182d",
        drawerActiveBackgroundColor: "#f19ec2",
        drawerItemStyle: { borderRadius: 0, margin: 0 },
      }}
    >
      <Drawer.Screen
        name="index"
        options={{
          drawerLabel: "Home",
          drawerIcon: ({ color, size }) => (
            <Entypo name="home" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="lists"
        options={{
          drawerLabel: "Lists",
          drawerIcon: ({ color, size }) => (
            <FontAwesome name="list" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="media"
        options={{
          drawerLabel: "Media",
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="multimedia" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="animation"
        options={{
          drawerLabel: "Animation",
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="animation" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="dimension"
        options={{
          drawerLabel: "Dimension",
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="screen-rotation" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="keyboard"
        options={{
          drawerLabel: "Keyboard",
          drawerIcon: ({ color, size }) => (
            <Entypo name="keyboard" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="contacts"
        options={{
          drawerLabel: "Contacts",
          drawerIcon: ({ color, size }) => (
            <FontAwesome6 name="contact-book" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="avatar"
        options={{
          drawerLabel: "Avatar",
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="account-circle" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="storage"
        options={{
          drawerLabel: "Storage",
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="sd-storage" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="database"
        options={{
          drawerLabel: "ДЗ 10 CRUD",
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="storage" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="notification"
        options={{
          drawerLabel: "Notification",
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="notifications" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="rest"
        options={{
          drawerLabel: "REST",
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="cloud" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="profile"
        options={{
          drawerLabel: "Profile",
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="person" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="windstyles"
        options={{
          drawerLabel: "Windstyles",
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="brush" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="homework"
        options={{
          drawerLabel: "ДЗ 1",
          drawerIcon: ({ color, size }) => (
            <Entypo name="book" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="homework2"
        options={{
          drawerLabel: "ДЗ 2",
          drawerIcon: ({ color, size }) => (
            <Entypo name="check" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="homework3"
        options={{
          drawerLabel: "ДЗ 3",
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-group"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="homework4"
        options={{
          drawerLabel: "ДЗ 4",
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="video" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="homework5"
        options={{
          drawerLabel: "ДЗ 5",
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="send" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="homework6"
        options={{
          drawerLabel: "ДЗ 6",
          drawerIcon: ({ color, size }) => (
            <Entypo name="youtube" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="homework7"
        options={{
          drawerLabel: "ДЗ 7",
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="flashlight-on" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="homework8"
        options={{
          drawerLabel: "ДЗ 8",
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="contact-page" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="homework10"
        options={{
          drawerItemStyle: { display: "none" },
          drawerLabel: "ДЗ 10",
        }}
      />
      <Drawer.Screen
        name="settings"
        options={{
          drawerLabel: "Settings",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }}
      />
    </Drawer>
  );
};

export default TabLayout;
