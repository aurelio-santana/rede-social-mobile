import React, { useContext, useState } from "react";
import { View, Text } from "react-native";
import { Context as AuthContext } from "../../context/AuthContext";
import { Context as PostContext } from "../../context/PostContext";
import { UserCircle } from "phosphor-react-native";
import { Input } from "../../components/Input";
import { Spacer } from "../../components/Spacer";
import { File } from "../../Model/File";
import { Button } from "../../components/Button";

import { THEME } from "../../theme";
import { styles } from "./styles";
import PostImagePicker from "../../components/PostImagePicker";

export function CreatePost() {
    const { name } = useContext(AuthContext);
    const { createPost } = useContext(PostContext);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState<File>();

    return (
        <View style={styles.container}>
            <View style={styles.heading}>
                <UserCircle color="white" size={48} weight="thin" />
                <Text style={styles.userNameText}>{name}</Text>
            </View>
            <Spacer>
                <Input.Root>
                    <Input.Input
                        value={title}
                        onChangeText={setTitle}
                        placeholder="Qual é o título do post?"
                        placeholderTextColor={THEME.COLORS.INPUT}
                        autoCorrect={false}
                    />
                </Input.Root>
                <Spacer />
            
                <Input.Root>
                    <Input.Input
                        value={content}
                        onChangeText={setContent}
                        placeholder="Qual é a descrição do post?"
                        placeholderTextColor={THEME.COLORS.INPUT}
                        autoCorrect={false}
                    />
                </Input.Root>
            <Spacer />
            <PostImagePicker onFileLoaded={setImage} />
            <Spacer />
            <Button
                title="Postar"
                onPress={() => {
                    createPost({ title, content, image });
                }}
            />
            </Spacer>
        </View>
    );
}

export default CreatePost;
