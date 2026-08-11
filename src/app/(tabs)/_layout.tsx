import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
    Drawer,
    DrawerContentComponentProps,
    DrawerContentScrollView,
    DrawerItemList,
} from "expo-router/drawer";
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import Constants from "expo-constants";

const APP_NAME = "React Native Lessons";
const APP_YEAR = "2026";
const APP_VERSION = Constants.expoConfig?.version ?? "1.0.0";

// ДЗ 5: бічна панель + внизу назва, рік, версія
const DrawerContent = (props: DrawerContentComponentProps) => {
    return (
        <View style={styles.drawerRoot}>
            <View style={styles.drawerHeader}>
                <Image
                    source={require("../../../assets/images/ourIcon/our_icon.png")}
                    style={styles.avatar}
                />
                <Text style={styles.headerName}>{APP_NAME}</Text>
                <Text style={styles.headerInfo}>Menu</Text>
            </View>

            <DrawerContentScrollView
                {...props}
                contentContainerStyle={styles.menuList}
            >
                <DrawerItemList {...props} />
            </DrawerContentScrollView>

            <View style={styles.drawerFooter}>
                <Text style={styles.footerText}>{APP_NAME}</Text>
                <Text style={styles.footerText}>{APP_YEAR}</Text>
                <Text style={styles.footerText}>v{APP_VERSION}</Text>
            </View>
        </View>
    );
};

const TabLayout = () => {
    return (
        <SafeAreaProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <Drawer
                    drawerContent={(props) => <DrawerContent {...props} />}
                    screenOptions={{
                        swipeEnabled: true,
                        swipeEdgeWidth: 100,
                        headerShown: false,
                        drawerStyle: {
                            backgroundColor: "#fff",
                            width: "78%",
                            borderRadius: 0,
                        },
                        drawerActiveTintColor: "#527da3",
                        drawerActiveBackgroundColor: "#e8f0f7",
                        drawerInactiveTintColor: "#333",
                        drawerItemStyle: {
                            borderRadius: 0,
                            marginHorizontal: 0,
                        },
                    }}
                >
                    {/* Уроки вчителя */}
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
                                <MaterialIcons name="contacts" size={size} color={color} />
                            ),
                        }}
                    />

                    {/* ДЗ окремо */}
                    <Drawer.Screen
                        name="homework"
                        options={{
                            drawerLabel: "ДЗ 1 Светофор",
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
                                <MaterialCommunityIcons name="account-group" size={size} color={color} />
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
                            drawerLabel: "ДЗ 5 Telegram",
                            drawerIcon: ({ color, size }) => (
                                <MaterialCommunityIcons name="send" size={size} color={color} />
                            ),
                        }}
                    />
                    <Drawer.Screen
                        name="homework6"
                        options={{
                            drawerLabel: "ДЗ 6 MyTube",
                            drawerIcon: ({ color, size }) => (
                                <Entypo name="youtube" size={size} color={color} />
                            ),
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
            </GestureHandlerRootView>
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    drawerRoot: {
        flex: 1,
        backgroundColor: "#fff",
    },
    drawerHeader: {
        backgroundColor: "#527da3",
        paddingTop: 48,
        paddingBottom: 18,
        paddingHorizontal: 16,
    },
    avatar: {
        width: 64,
        height: 64,
        borderRadius: 32,
        marginBottom: 12,
        backgroundColor: "#fff",
    },
    headerName: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
    headerInfo: {
        color: "#d7e6f3",
        fontSize: 13,
        marginTop: 4,
    },
    menuList: {
        paddingTop: 8,
        flexGrow: 1,
    },
    drawerFooter: {
        borderTopWidth: 1,
        borderTopColor: "#e5e5e5",
        paddingHorizontal: 16,
        paddingVertical: 14,
        paddingBottom: 22,
        backgroundColor: "#f7f7f7",
    },
    footerText: {
        fontSize: 14,
        color: "#444",
        marginBottom: 2,
    },
});

export default TabLayout;
