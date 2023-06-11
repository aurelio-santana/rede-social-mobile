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
                const { data } = await api.get("/user/get/all", authHeader); 
                setProfilesList(data.users);   
            } catch (err) {}
        };
        
        getProfiles();
    }, []);

    async function handleFollow(profileId: string) {
        console.log("profileçlist", profilesList);
        try {
            /* const { data } = await api.get("/user/follow/get/userjoin");
            console.log("userjoin", data); */
            await api.post(`/profiles/${profileId}/follow`, null, authHeader);
            setProfilesList((profiles) => {
                const newProfiles = profiles.map((profile) => {
                    if (profile._id == profileId) {
                        !profile.followers.includes(profile) && profile.followers.push(profile);
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
                        handleFollowAction={handleFollow}
                        /* buttonDisabled={item.followers.includes(userId)} */
                    />
                )}
            />
        </SafeAreaView>
    );
}

export default Friends;