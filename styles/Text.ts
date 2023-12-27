import { StyleSheet } from "react-native";


/**
 * styles for various Text Components
 */
export const text_style = StyleSheet.create({
    suggestionTitle: {
        color: '#25292e',
        // fontWeight: 'bold',
        // fontFamily: 'Bacon-Stencil-Bold'
        fontFamily: 'Bacon-Bold'
    },
    suggestionReleaseDate: {
        color: '#25292e',
        fontFamily: 'Bacon-Inline'
    },
    suggestionHeader: {
        color: '#25292e',
        fontSize: 16,
        marginVertical: 5,
        textAlign: 'right',
        fontFamily: 'Bacon-Bold',
        textDecorationLine: 'underline',
        textDecorationStyle: 'double',
    },
});

// TODO: on export, add font family to all text components