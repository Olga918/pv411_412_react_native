import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, StyleSheet } from "react-native";

import * as Contacts from "expo-contacts";
import { useEffect, useState } from "react";
const ContactScreen = () => {
    const [contacts, setContacts] = useState<Contacts.Contact[]>([]);

    const loadContacts = async () => {
        const { status } = await Contacts.requestPermissionsAsync();
        if(status === 'granted'){
            const data = await Contacts.Contact.getAll();
            if(data.length>0){
                setContacts(data);
                console.log(data)
            }
        }
    }
    useEffect(()=>{
        loadContacts();
    },[])
    return (
        <SafeAreaView>

        </SafeAreaView>
    )
}

export default ContactScreen;