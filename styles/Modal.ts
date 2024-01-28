import { StyleSheet } from 'react-native';

export const modal_styles = StyleSheet.create({
    exitButtonWrapper: {
        alignSelf: 'flex-end',
        borderRadius: 20,
        borderWidth: 1.5,
        borderColor: '#000',
        padding: 10,
        // elevation: 2,
        backgroundColor: '#2196F3',
    },
    exitText: {
        color: '#000',
        // fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
        fontFamily: 'Bacon-Inline',
    },
    releaseDate: {
        textAlign: 'right',
        fontStyle: 'italic',
    },
    movieOverview: {
        fontFamily: 'Bacon-Bold',
        fontSize: 16,
        overflow: 'scroll',
    },
    movieTitle: {
        textAlign: 'center',
        fontFamily: 'Bacon-Limelight',
        textDecorationLine: 'underline',
        fontSize: 25,
    },
    image: { width: 185, height: 150 },
});