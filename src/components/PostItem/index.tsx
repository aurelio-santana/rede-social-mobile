import { useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Context as AuthContext } from "../../context/AuthContext";
import { Context as PostContext } from "../../context/PostContext";

import { styles } from "./styles";
import { Spacer } from "../Spacer";
import { Chat, Heart, UserCircle } from "phosphor-react-native";
import { Post } from "../../Model/Post";
import { Image } from "react-native";
import { getUserId } from "../../../services/auth";

interface PostItemProps {
    post: Post;
}

export function PostItem({ post }: PostItemProps) {
    const { likePost, unlikePost } =  useContext(PostContext);
    const { userId } = useContext(AuthContext);

    function handleLike() {
        if (post.like.includes(userId)) {
            unlikePost({ postId: post.id });
        } else {
            likePost({ postId: post.id });
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.heading}>
                <UserCircle color="white" size={48} weight="thin" />
                <Text style={styles.profileName}>{post.name}</Text>
            </View>
            <Spacer>
                <Text style={styles.postTitle}>{post.title}</Text>
                <Spacer />
                {post.image ? (    
                    <Image source={{ uri: "https://t.ctcdn.com.br/essK16aBUDd_65hp5umT3aMn_i8=/400x400/smart/filters:format(webp)/i606944.png" }} style={styles.image} />
                ) : (
                    <Text style={styles.description}>{post.content}</Text>
                )}


            </Spacer>
            <View style={styles.footer}>
                <Chat size={24} color="white" weight="thin" />
                <Text style={styles.number}>{post.comment.length}</Text>
                <TouchableOpacity onPress={handleLike}>
                    {post.like.includes(userId) ? (
                        
                        <Heart size={24} color="red" weight="fill" />
                    ) : (
                        <Heart size={24} color="white" weight="thin" />
                    )} 
                </TouchableOpacity>
                <Text style={styles.number}>{post.likes}</Text>
            </View>
        </View>
    );
}
