import { StyleSheet } from "react-native";
import { THEME } from "../../theme";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: "#E1E1E1",
        padding: 12,
        minWidth: 240,
        alignItems: "center",
        borderRadius: 12,
    },
    title: {
        fontFamily: THEME.FONT_FAMILY.SEMI_BOLD,
        fontSize: THEME.FONT_SIZE.MD,
    },
 
});