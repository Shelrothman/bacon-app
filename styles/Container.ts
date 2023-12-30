import { StyleSheet } from 'react-native';

/** styles for Container(View) elements */
export const container_style = StyleSheet.create({
    appRootContainer: {
        flex: 1,
        backgroundColor: '#25292e',
        alignItems: 'center',
        position: 'relative',
        justifyContent: 'center',
    },
    mainSquareWrapper: {
        flex: 1,
        paddingTop: 50,
    },
    suggestionListScrollView: {
        backgroundColor: 'transparent',
        borderBottomEndRadius: 18,
        borderBottomStartRadius: 18,
        width: 300,
    },
    inputContainer: {
        backgroundColor: '#25292e',
        flexDirection: 'row',
        width: 300,
        height: 60,
        padding: 14,
        borderBottomWidth: 2,
        borderRadius: 18,
        marginTop: 15,
    },
    containerNoSearch: {
        justifyContent: 'space-evenly',
        flex: 1,
    },
    containerWithSearch: {
        flex: 1,
        justifyContent: 'flex-start'
    },
    mainSquare: {
        width: 350,
        height: 540,
        borderRadius: 18,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        padding: 10,
        flexDirection: 'column',
    },
    squareHeaderContainer: {
        alignSelf: 'center',
        flexDirection: 'row',
        margin: 10,
    },
    shadowProp: {
        shadowColor: '#171717',
        shadowOffset: { width: 2, height: 7 },
        shadowOpacity: 0.7,
        shadowRadius: 3,
    },
    footerOuterWrapper: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        position: 'absolute',
        paddingHorizontal: 30,
        bottom: 50,
    }
});