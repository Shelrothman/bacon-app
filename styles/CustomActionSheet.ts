import { StyleSheet } from 'react-native';

export const sheet_styles = StyleSheet.create({
    pressableLink: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 1,
    },
    scrollView: {
        maxHeight: '60%',
    },
    sectionContainer: {
        backgroundColor: '#25292e',
        borderRadius: 10,
        color: '#fff',
        padding: 10,
    },
    container: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    sheetRow: {
        padding: 10,
        backgroundColor: '#09192e',
        paddingTop: 20,
    },
    stickyHeaderRow: {
        flexDirection: 'row',
        borderTopEndRadius: 15,
        borderTopStartRadius: 15,
        backgroundColor: '#c8c1d4',
    },
    sectionTitleText: {
        fontSize: 20,
        fontFamily: 'Bacon-Limelight',
        color: '#ccc',
        paddingLeft: 10,
        paddingBottom: 5,
    },
    menuTitle: {
        color: '#202540',
        fontSize: 24,
        fontFamily: 'Bacon-Stencil',
        textAlign: 'center',
        padding: 5,
    },
    bodyText: {
        color: '#ccc',
        fontSize: 16,
        flexShrink: 1,
    },
    sectionRow: {
        flexDirection: 'row',
        paddingVertical: 5,
    },
    numberText: {
        color: '#ccc',
        fontSize: 14,
        textAlign: 'left',
    },
});