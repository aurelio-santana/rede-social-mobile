import { useContext, useEffect } from "react";
import { FlatList, SafeAreaView } from "react-native";
import { View } from "react-native";
import { Context as AuthContext } from "../../context/AuthContext";
import { Context as PostContext } from "../../context/PostContext";

import { HomeHeader } from "../../components/HomeHeader";
import { styles } from "./styles";
import { PostItem } from "../../components/PostItem";

export function PostList({ navigation }) {
    const { name } = useContext(AuthContext);
    const { posts, getPosts } = useContext(PostContext);

    useEffect(() => {
        getPosts();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <HomeHeader navigation={navigation} name={name} />
            <View style={styles.content}>
                <FlatList
                    data={posts}
                    keyExtractor={({ id }) => id }
                    renderItem={({ item }) => <PostItem post={item} />}
                />
            </View>
        </SafeAreaView>
    );
}

export default PostList;