import React from "react";
import { Text, TouchableOpacityProps, TouchableOpacity } from "react-native";

import { styles } from "./styles";

interface ButtonProps extends TouchableOpacityProps {
    title: string;
}

export function Button(props: ButtonProps) {
    return (
    <TouchableOpacity style={styles.container} { ... props}>
        <Text style={styles.title}>{props.title}</Text>
    </TouchableOpacity>
    );
}
