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
    footer: {
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    clearButtonParent: {
        borderRadius: 50,
        justifyContent: 'center',
    },
    titleInfoPressable: {
        // flexDirection: 'row',
        borderRadius: 20,
        borderWidth: 1.3,
        borderColor: '#000',
        backgroundColor: '#7f95fa',
        padding: 5,
        marginTop: -5,
    },
});