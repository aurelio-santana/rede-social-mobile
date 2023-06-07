import { SafeAreaView, TouchableOpacity } from "react-native";
import { View, Text } from "react-native";
import { UserCircle, PencilSimple } from "phosphor-react-native";

import { styles } from "./styles";

export function HomeHeader({ navigation, name }) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.heading}>
                <UserCircle color="white" size={48} weight="thin" />
                <Text style={styles.userNameText}>{name}</Text>
                <View style={{ flex: 1 }}></View>
                <TouchableOpacity onPress={() => navigation.navigate("CreatePost")}>
                    <PencilSimple color="white" size={40} weight="thin" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}