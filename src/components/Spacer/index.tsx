import React, { ReactNode } from "react";
import { View, Text } from "react-native";
import { styles } from "./styles";

interface SpaceProps {
    children?: ReactNode;
}

export function Spacer(props: SpaceProps) {
    return <View style={styles.container}>{props.children}</View>;

}