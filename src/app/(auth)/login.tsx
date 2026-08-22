import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { View, Text, TextInput, StyleSheet,Alert, ActivityIndicator, TouchableOpacity } from "react-native";

const LoginScreen = ()=>{
    const [username, setUsername] = useState('emilys');
    const [password, setPassword] = useState('emilyspass');
    const [loading, setLoading] = useState(false);

    const {login, loginAsGuest} = useAuth();
    const handleLogin = async()=>{
        if(!username || !password) return;
        setLoading(true);
        try{
            await login(username, password);
        }
        catch(error:any){
            Alert.alert('Login failed', error.response?.data?.message)
        } finally{
            setLoading(false);
        }
    }

    const handleGuest = async () => {
      setLoading(true);
      try {
        await loginAsGuest();
      } finally {
        setLoading(false);
      }
    }

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <TextInput
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                style={styles.input}
            />
            <TextInput
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                style={styles.input}
            />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
            {
                loading?(
                    <ActivityIndicator color="#fff"/>
                ):(
                    <Text style={styles.buttonText}>Login</Text>
                )
            }
            
        </TouchableOpacity>
        <TouchableOpacity style={styles.guestButton} onPress={handleGuest} disabled={loading}>
            <Text style={styles.guestButtonText}>Увійти як гість</Text>
        </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent:'center',
        padding: 20
    },
    title:{
        fontSize: 24,
        fontWeight:'bold',
        marginBottom: 20,
        textAlign:'center'
    },
    input:{
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 12,
        borderRadius: 8,
        marginBottom: 12
    },
    button:{
        backgroundColor: '#6e0e36',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center'
    },
    buttonText:{
        color:"#fff",
        fontWeight: 'bold'
    },
    guestButton:{
        marginTop: 12,
        padding: 14,
        borderRadius: 8,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#6e0e36'
    },
    guestButtonText:{
        color: '#6e0e36',
        fontWeight: '600'
    }
})

export default LoginScreen;