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
        margin: 10,
    },
    exitText: {
        color: '#000',
        // fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
        fontFamily: 'Bacon-Inline',
        // padding: 5,
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
    actorName: {
        fontFamily: 'Bacon-Bold',
        fontSize: 20,
        textAlign: 'center',
    },
    movieTitle: {
        textAlign: 'center',
        fontFamily: 'Bacon-Limelight',
        textDecorationLine: 'underline',
        fontSize: 25,
    },
    image: {
        width: 185,
        height: 150,
        marginVertical: 10,
        marginHorizontal: 10,
    },
    actorModalContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlignVertical: 'center',
        textAlign: 'center',
        width: 200,
        maxWidth: 200,
        height: 200,
        maxHeight: 200,
    },
});