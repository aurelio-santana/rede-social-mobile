import { REACT_APP_LOCALHOST_IP } from "@env";
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


const localhostIp = REACT_APP_LOCALHOST_IP;


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

    function handleUri(){
        //TODO realocar para o backend.
        if (post.photoUri == "") {
            return
        }
        return post.photoUri[0].substring(post.photoUri[0].lastIndexOf(":"));
    }

    function handleCreatedAt(createdAt: string) {
        const currDate = Date.now();
        const postDate = new Date(createdAt).getTime();
        const difDate = currDate - postDate;

        switch(true) {
            case (difDate<60000):
                return "agora"; //seconds

            case (difDate<3600000): { //36 = 1hr  
                const time = Math.floor(difDate/60000)
                if (time == 1)
                    return `há ${time} minuto`
                else return `há ${time} minutos`
            }
            case (difDate<86400000): { //86 = 24hr
                const time = Math.floor(difDate/3600000)
                if (time == 1)
                    return `há ${time} hora`
                else return `há ${time} horas`
            }
            case (difDate<2592000000): { //25 = 30d
                const time = Math.floor(difDate/86400000)
                if (time == 1)
                    return `há ${time} dia`
                else return `há ${time} dias`
            }
            case (difDate>=2592000000): { //86 = 24hr
                const time = Math.floor(difDate/2592000000)
                if (time == 1)
                    return `há ${time} mês`
                else return `há ${time} meses`
            }
            default: return "erro na data"
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.heading}>
                <UserCircle color="white" size={48} weight="thin" />
                <Text style={styles.profileName}>{post.name}</Text>
            </View>
            <Spacer>
                <View style={styles.createdAt}>
                    <Text style={styles.postTitle}>{post.title}</Text>
                    <Text style={styles.timeText}>
                        <Text>{"   •   "}</Text>
                        {handleCreatedAt(post.createdAt)}
                    </Text>
                </View>
                <Spacer />
                {!(post.photoUri == "") ? (    
                    <View>
                        <Text style={styles.description}>{post.content}</Text>
                        <Image source={{ uri: `${localhostIp}${handleUri()}` }} style={styles.image} />
                    </View>
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
