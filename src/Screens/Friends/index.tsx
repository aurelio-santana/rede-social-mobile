import { useEffect, useState, useContext } from "react";
import { Context as AuthContext } from "../../context/AuthContext";
import api from "../../../services/api";
import { SafeAreaView, FlatList } from "react-native";

import { styles } from "./styles";
import { ProfileItem } from "../../components/ProfileItem";

function Friends() {
    const { token, userId } = useContext(AuthContext);
    const [profilesList, setProfilesList] = useState([]);
    const authHeader = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    useEffect(() => {
        const getProfiles = async () => {
            try {
                const { data } = await api.get("/user/follow/get/userjoin");
                setProfilesList(data);   
            } catch (err) {}
        };
        
        getProfiles();
    }, []);

    async function handleFollowAndUnfollow(profileId: string) {  
        try {
            const request = {
                userId: userId,
                userIdToFollow: profileId,
            };
            await api.post("/user/follow/following", request);

            setProfilesList((profiles) => {
                const newProfiles = profiles.map((profile) => {

                    if (profile.id == profileId) {
                        if (!profile.followers.includes(userId))
                            profile.followers.push(userId);
                        else
                            profile.followers.pop(userId);         
                    }

                    if (profile.id == userId) {
                        if (!profile.following.includes(profileId))
                            profile.following.push(profileId);
                        else
                            profile.following.pop(profileId);
                    }
                    return profile;

                });
                return [ ... newProfiles];
                
            });
        } catch (err) {
            alert("Erro ao tentar seguir perfil.");
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={profilesList}
                keyExtractor={({ id }) => id}
                renderItem={({ item }) => (
                    <ProfileItem
                        profile={item}
                        handleFollowAndUnfollowAction={handleFollowAndUnfollow}
                        /* buttonDisabled={item.followers.includes(userId)} */
                    />
                )}
            />
        </SafeAreaView>
    );
}

export default Friends;