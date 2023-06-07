import React from "react";
import { View, Text } from "react-native";

import { styles } from "./styles";
import { UserCircle } from "phosphor-react-native";
import { Button } from "../Button";

interface ProfileItemProps {
    profile: Profile;
    handleFollowAction: (profileId: string) => void;
    //buttonDisabled: boolean;
}

interface Profile {
    _id: string,
    name: string;
    following: string[];
    followers: string[];
}

export function ProfileItem({ profile, handleFollowAction }: ProfileItemProps) {  //buttonDisabled props



    /*  fazer um get da lista de follow, ou modificar o back para rentornar junto
    ao getusers
    
    const getFollowers = async () => {
        try {
            //const authHeader = await getAuthHeader();
            const userId = await getUserId();
            

            const { data } = await api.get("/post/feed", {params: {userId: userId}});
            console.log("pposts",data.posts[0]);
            //const { data } = await api.get("/feed", authHeader);

            dispatch({ type: "show_posts", payload: data.posts[0] });

        } catch (err) {
            alert("Erro ao obter o Feed.");
        }
    }; */


    return (
        <View style={styles.profileCard}>
            <View style={styles.profileIdentification}>
                <UserCircle color="white" weight="thin" size="32"></UserCircle>
                <Text style={styles.profileNameText}>{profile.name}</Text>
            </View>
            {/* <Text style={styles.followers}>{`${profile.followers.length} Seguidores`}</Text>
            <Text style={styles.followers}>Seguindo {profile.following.length}</Text> */}
            <Button 
                title="Seguir"
                onPress={() => handleFollowAction(profile._id)}
                /* disabled={buttonDisabled} */ />
        </View>
    );
}