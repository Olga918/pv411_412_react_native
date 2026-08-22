import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Container } from "@/components/ui/container";

interface User {
    name: string,
    surname: string
}

const StorageScreen = () => {

    const [user, setUser] = useState<User>();

    const [name, setName] = useState<string>('');
    const [surname, setSurname] = useState<string>('');
    useEffect(()=>{
        loadUserData();
    },[])
    const saveUserData = async () => {
        try {
            let saveUser: User = { "name": name, "surname": surname };
            await AsyncStorage.setItem("user", JSON.stringify(saveUser));
            setUser(saveUser);
            setName("");
            setSurname("");
        } catch (error) {
            console.log("Save user data error: ", error);
        }
    }

    const loadUserData = async () => {
        try {
            const userData = await AsyncStorage.getItem('user');
            if (userData) {
                setUser(JSON.parse(userData));
            }
        } catch (error) {
            console.log("Load user data error: ", error);
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <Container>
                <Text>Hello, {user?.name} {user?.surname}</Text>
            </Container>
            <Container style={{padding: 10}}>
                <TextInput
                    placeholderTextColor={'#999'}
                    placeholder="Enter name"
                    style={styles.textInput}
                    value={name}
                    onChangeText={setName}></TextInput>
                <TextInput
                    value={surname}
                    onChangeText={setSurname}
                    placeholderTextColor={'#999'} placeholder="Enter surname" style={styles.textInput}></TextInput>
                <Button title="Sign Up" onPress={saveUserData} />
            </Container>

        </View>
    )
}

const styles = StyleSheet.create({
    textInput: {
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        marginVertical: 10
    }
})

export default StorageScreen;