import { Tabs } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer, DrawerContentComponentProps, DrawerContentScrollView, DrawerItemList } from "expo-router/drawer";
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Constants from "expo-constants";

// Учительский drawer + внизу назва/рік/версія (ДЗ 5) + окремі пункти ДЗ
const DrawerContent = (props: DrawerContentComponentProps)=>{
    const version = Constants.expoConfig?.version ?? "1.0.0";

    return(
        
        <View style={{flex:1, marginTop: 60, marginBottom: 60, padding: 5}}>
            <DrawerContentScrollView {...props} contentContainerStyle={{paddingTop:0}}>
                <DrawerItemList{...props}/>
            </DrawerContentScrollView>
            <Text>React Native Lessons</Text>
            <Text>2026</Text>
            <Text>v{version}</Text>
        </View>
    )
}

const TabLayout = () => {
    return (
         <SafeAreaProvider>
        <GestureHandlerRootView style={{flex: 1}}>
            <Drawer
            drawerContent={(props)=><DrawerContent {...props}/>}
            screenOptions={{
                swipeEnabled: true,
                swipeEdgeWidth: 100,
                headerShown: false,
                drawerStyle:{
                    backgroundColor: '#fff',
                    width: '70%',
                    // borderWidth: 0,
                    borderColor: "#1f1f1f",
                    borderRadius: 0,
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                    padding: 0,
                    margin: 0
                },
                drawerActiveTintColor: '#4b182d',
                drawerActiveBackgroundColor: '#f19ec2',
                drawerItemStyle:{
                    borderRadius: 0,
                    margin: 0
                }
            }}
            >
                <Drawer.Screen
                    name="index"
                    options={{
                        drawerLabelStyle:{
                            borderRadius: 0
                        },
                        drawerLabel:'Home',
                        drawerIcon: ({color, size})=> <Entypo name="home" size={size} color={color} />
                    }}
                />
                <Drawer.Screen
                    name="lists"
                    options={{
                        drawerLabel:'Lists',
                        drawerIcon: ({color, size})=> <FontAwesome name="list" size={size} color={color} />
                    }}
                />
                <Drawer.Screen
                    name="media"
                    options={{
                        drawerLabel:'Media',
                        drawerIcon: ({color, size})=> <MaterialCommunityIcons name="multimedia" size={size} color={color} />
                    }}
                />
                <Drawer.Screen
                    name="animation"
                    options={{
                        drawerLabel:'Animation',
                        drawerIcon: ({color, size})=> <MaterialCommunityIcons name="animation" size={size} color={color} />
                    }}
                />
                <Drawer.Screen
                    name="dimension"
                    options={{
                        drawerLabel:'Dimension',
                        drawerIcon: ({color, size})=> <MaterialIcons name="screen-rotation" size={size} color={color} />
                    }}
                />
                <Drawer.Screen
                    name="keyboard"
                    options={{
                        drawerLabel:'Keyboard',
                        drawerIcon: ({color, size})=> <Entypo name="keyboard" size={size} color={color} />
                    }}
                />
                <Drawer.Screen
                    name="contacts"
                    options={{
                        drawerLabel:'Contacts',
                        drawerIcon: ({color, size})=> <MaterialIcons name="contacts" size={size} color={color} />
                    }}
                />

                {/* ===== Домашні завдання (окремо) ===== */}
                <Drawer.Screen
                    name="homework"
                    options={{
                        drawerLabel:'ДЗ 1 Светофор',
                        drawerIcon: ({color, size})=> <Entypo name="book" size={size} color={color} />
                    }}
                />
                <Drawer.Screen
                    name="homework2"
                    options={{
                        drawerLabel:'ДЗ 2',
                        drawerIcon: ({color, size})=> <Entypo name="check" size={size} color={color} />
                    }}
                />
                <Drawer.Screen
                    name="homework3"
                    options={{
                        drawerLabel:'ДЗ 3',
                        drawerIcon: ({color, size})=> <MaterialCommunityIcons name="account-group" size={size} color={color} />
                    }}
                />
                <Drawer.Screen
                    name="homework4"
                    options={{
                        drawerLabel:'ДЗ 4',
                        drawerIcon: ({color, size})=> <MaterialCommunityIcons name="video" size={size} color={color} />
                    }}
                />
                <Drawer.Screen
                    name="homework5"
                    options={{
                        drawerLabel:'ДЗ 5',
                        drawerIcon: ({color, size})=> <MaterialCommunityIcons name="menu" size={size} color={color} />
                    }}
                />
            </Drawer>
        </GestureHandlerRootView>
        </SafeAreaProvider>
    )
}


export default TabLayout;
