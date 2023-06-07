import React, { useContext, useState } from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import { Image } from "react-native";
import { styles } from "./styles";
import { Heading } from "../Heading";
import Input from "../Input";
import { Envelope, Lock } from "phosphor-react-native";
import { THEME } from "../../theme";
import { Spacer } from "../Spacer";
import logo from "../../../assets/logo.png";
import { Button } from "../Button";
import { Auth } from "../../Model/Auth";


interface AuthFormProps {
    authFormSubtitle: string;
    submitFormButtonText: string;
    submitFormButtonAction: (auth: Auth) => void;
}


export function AuthForm(props: AuthFormProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (

        <KeyboardAvoidingView
            style={styles.container}
            contentContainerStyle={styles.containerPosition}
            behavior={Platform.OS == "ios" ? "padding" : "position"}  
        >
            <Image source={logo} resizeMethod="scale" />
            <Heading title="Sysmap Parrot" subtitle={props.authFormSubtitle} />

            <Input.Root>
                <Input.Icon>
                    <Envelope color={THEME.COLORS.INPUT} />
                    <Input.Input
                        value={email}
                        onChangeText={setEmail}
                        placeholder="Digite seu e-mail"
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                </Input.Icon>
            </Input.Root>
            <Spacer />
            <Input.Root>
                <Input.Icon>
                    <Lock color={THEME.COLORS.INPUT} />
                    <Input.Input
                        value={password}
                        onChangeText={setPassword}
                        placeholder="******"
                        autoCapitalize="none"
                        autoCorrect={false}
                        secureTextEntry
                    />
                </Input.Icon>
            </Input.Root>
            <Spacer />
            <Button title={props.submitFormButtonText} onPress={() => {
                props.submitFormButtonAction && props.submitFormButtonAction({ email, password });
            }} />
        </KeyboardAvoidingView>
    );
}