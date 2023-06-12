import React, { useContext } from "react";
import { View, Text } from "react-native";
import { Context as AuthContext } from "../../context/AuthContext";

import { styles } from "./styles";
import { UserCircle } from "phosphor-react-native";
import { Button } from "../Button";
import { Spacer } from "../Spacer";
import { DangerButton } from "../DangeButton";


interface ProfileItemProps {
    profile: Profile;
    handleFollowAndUnfollowAction: (profileId: string) => void;
    /* buttonDisabled: boolean; */
}

interface Profile {
    id: string,
    name: string;
    following: string[];
    followers: string[];
}

export function ProfileItem({ profile, handleFollowAndUnfollowAction }: ProfileItemProps) {  //buttonDisabled props
    const { userId } = useContext(AuthContext);

    return (
        <View style={styles.profileCard}>
            <View style={styles.profileIdentification}>
                <UserCircle color="white" weight="thin" size="32"></UserCircle>
                <Text style={styles.profileNameText}>{profile.name}</Text>
            </View>
            <Text style={styles.followers}>{`${profile.followers.length} Seguidores`}</Text>
            <Text style={styles.following}>Seguindo {profile.following.length}</Text>
            
            {!profile.followers.includes(userId) ? (
                <Button 
                    title="Seguir"
                    onPress={() => handleFollowAndUnfollowAction(profile.id)}
                    /* disabled={buttonDisabled} */
                />
            ) : (
 
                <DangerButton
                    title="Deixar de Seguir"
                    onPress={() => handleFollowAndUnfollowAction(profile.id)}
                    /* disabled={buttonDisabled} */
                />
            )}   
        </View>
    );
}