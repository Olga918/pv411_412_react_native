import { View, Button, Platform, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// import * as Notifications from "expo-notifications";
import { useEffect } from "react";

// Notifications.setNotificationHandler({
//     handleNotification: async () => ({
//         shouldPlaySound: true,
//         shouldShowBanner: true,
//         shouldSetBadge: false,
//         shouldShowList: true
//     }),
// })

const NotificationScreen = () => {
    // useEffect(() => {
    //     registerForAndroidNotifications();
    // }, []);
    // const registerForAndroidNotifications = async () => {
    //     if (Platform.OS === 'android') {
    //         await Notifications.setNotificationChannelAsync('default', {
    //             name: 'NotifyScreen',
    //             importance: Notifications.AndroidImportance.MAX,
    //             vibrationPattern: [0, 250, 250, 250],
    //             lightColor: '#620d3add'
    //         })
    //     }
    //     const { status: existingStatus } = await Notifications.getPermissionsAsync();
    //     let finalStatus = existingStatus;
    //     if (existingStatus !== 'granted') {
    //         const { status } = await Notifications.requestPermissionsAsync();
    //         finalStatus = status;
    //     }
    //     if (finalStatus !== 'granted') {
    //         Alert.alert("Error", 'Please go to settings and turn on notification permission');
    //     }
    // }

    // const sendNotify = async () => {
    //     await Notifications.scheduleNotificationAsync({
    //         content: {
    //             title: 'You clicked button',
    //             body: 'This default notify.',
    //             sound: 'default',
    //         },
    //         trigger: {
    //             seconds: 2,
    //             channelId: 'default'
    //         }
    //     });
    // }
    return (
        <SafeAreaView>
            <View>
                <Button title="Send notify" /*onPress={sendNotify}*//>
            </View>
        </SafeAreaView>

    )
}

export default NotificationScreen;