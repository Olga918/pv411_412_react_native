import {Stack} from "expo-router";

const AuthLayout = ()=>{
    return(
        <Stack>
            <Stack.Screen
                name="login"
                options={{
                    title:"Auth",
                    headerShown:false
                }}
            />
        </Stack>
    )
}

// Забув прописати експорт
export default AuthLayout;