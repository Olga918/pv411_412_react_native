import { Container } from "@/components/ui/container";
import { jsonApi } from "@/lib/json-api";
import { useState } from "react";
import { View, ActivityIndicator, Text, StyleSheet, Button, FlatList } from "react-native";


interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

const RestScreen = () => {
    const [posts, setPosts] = useState<Post[]>([]);

    const getPostsHandle = async () => {
        const res = await jsonApi.get('/posts');
        console.log("Status: ", res.status)
        console.log("Status: ", res.statusText)
        setPosts(res.data);
        // fetch('https://jsonplaceholder.typicode.com/posts')
        //     .then((response) => response.json())
        //     .then(setPosts)
        //     .catch(console.error)
    }

    return (
        <View style={{ flex: 1, padding: 20 }}>
            <Button title='Get posts' onPress={getPostsHandle}/>
            <Container>
                <FlatList
                    data={posts}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.listItem}>
                            <Text style={styles.listItemUserId}>User: {item.id}</Text>
                            <Text style={styles.listItemId}>PostId: {item.id}</Text>
                            <Text style={styles.listItemText}>{item.title}</Text>
                            <Text style={styles.listItemBody}>{item.body}</Text>
                        </View>
                    )}
                    ListEmptyComponent={<ActivityIndicator />}
                />
            </Container>
        </View>
    )
}

const styles = StyleSheet.create({
    listItem:{
        padding: 20,
        borderRadius: 10,
        borderLeftWidth: 5,
        borderLeftColor: '#940e30',
        marginVertical: 8
    },
    listItemId: {fontSize: 11},
    listItemUserId: {fontSize: 15, fontWeight: 'bold'},
    listItemText: {fontSize: 20, fontWeight: 'bold'},
    listItemBody: {fontSize: 17}
})

export default RestScreen;