import { StyleSheet } from "react-native";


/**
 * styles for various Pressable Components
 */
export const pressable_style = StyleSheet.create({
    /** main wrapper of text in each Node */
    innerContainerWrapper: {
        flexDirection: 'row',
        marginBottom: 10,
        borderWidth: 1,
        borderRadius: 18,
        marginHorizontal: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    suggestionLst: {
        width: '100%',
        marginBottom: 10,
        borderBottomWidth: .5,
        borderBottomColor: '#6779cb',
    },

});