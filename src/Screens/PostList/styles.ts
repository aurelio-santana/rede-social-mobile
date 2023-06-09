import { StyleSheet } from "react-native";
import { THEME } from "../../theme";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 12,
    },

    content: {
        flex: 1,
    },

    emptyPostTitle: {
        textAlign: "center",
        fontFamily: THEME.FONT_FAMILY.BOLD,
        fontSize: THEME.FONT_SIZE.MD,
        color: THEME.COLORS.TEXT,
        marginTop: 12,
        marginHorizontal: 12,
    },

    emptyPostText: {
        textAlign: "center",
        fontFamily: THEME.FONT_FAMILY.REGULAR,
        fontSize: THEME.FONT_SIZE.SM,
        color: THEME.COLORS.TEXT,
        marginTop: 12,
        marginHorizontal: 12,
    }
});