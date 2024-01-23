import { StyleSheet } from "react-native";


/**
 * styles for various Text Components
 */
export const text_style = StyleSheet.create({
    suggestionTitle: {
        color: '#25292e',
        fontFamily: 'Bacon-Bold'
    },
    suggestionReleaseDate: {
        color: '#25292e',
        fontFamily: 'Bacon-Inline'
    },
    switchText: {
        color: '#000',
        marginRight: 5,
        fontStyle: 'italic',
    },
    switchTextBold: {
        color: '#000',
        marginRight: 5,
        fontWeight: 'bold',
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
    /** one and only input in MovieInput state */
    textInput: {
        width: 219,
        color: '#fff',
        paddingLeft: 10,
        fontFamily: 'Bacon-Script',
    },
    movieInputHeader: {
        fontFamily: 'Bacon-Limelight',
        fontSize: 24,
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    footerText: {
        fontFamily: 'Bacon-Stencil',
        fontSize: 18,
    },
    squareHeader: {
        fontFamily: 'Bacon-Stencil-Bold',
        fontSize: 26,
        color: '#2b3a7d',
        textAlign: 'center',
    }
});
