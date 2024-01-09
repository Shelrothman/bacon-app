import { Modal, Pressable, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';

type CustomActionSheetProps = {
    visible: boolean;
    onClose: () => void;
    // options: string[];
};




const CustomActionSheet = ({ visible, onClose }: CustomActionSheetProps) => {
    /** just using these as i develop, will delete */
    const fake_options = [
        {
            title: 'Special Thanks',
            body: 'lorem ipsim lorems lorem lor lorem lorem lorem lor'
        },
        {
            title: 'Developer Info',
            body: 'lorem ipsim lorems lorem lor lorem lorem lorem lor'
        },
        {
            title: 'Support the App',
            body: 'lorem ipsim lorems lorem lor lorem lorem lorem lor'
        },
        {
            title: 'App Info',
            body: 'lorem ipsim lorems lorem lor lorem lorem lorem lor'
        },
    ];

    const helpData = [
        { item: '1', text: 'Enter a movie title', },
        { item: '2', text: 'Select or enter your search', },
        { item: '3', text: 'Select an actor from the list to view their movies.', },
        { item: '4', text: 'Then select a movie from that list, to view the cast.', },
        { item: '5', text: 'Keep going till your hearts content. 🤗', },
    ];

    return (
        <Modal visible={visible} transparent animationType="slide">
            <View style={styles.container}>
                <Pressable style={styles.stickyHeaderRow} onPress={() => onClose()}>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Text style={styles.menuTitle}>Menu</Text>
                    </View>
                    <Text style={styles.exitButton}>
                        &#8964;
                    </Text>
                </Pressable>
                <ScrollView
                    style={{ maxHeight: '60%', backgroundColor: '#25292e' }}
                    contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end', }}
                    refreshControl={<RefreshControl
                        refreshing={false}
                        onRefresh={() => onClose()}
                        colors={[ 'transparent' ]} // make the spinner invisible on android
                        tintColor={'transparent'} // make the spinner invisible on iOS
                        progressBackgroundColor={'transparent'} // make the background invisible on Android
                    />}
                >
                    <View style={styles.sheetRow}>
                        <Text style={styles.sectionTitleText}>How do I do this?</Text>
                        <View style={styles.sectionContainer}>
                            {/* <View style={styles.sectionRow}>
                                <Text style={styles.numberText}>1. </Text>
                                <Text style={styles.bodyText}>Enter a movie title</Text>
                            </View>
                            <View style={styles.sectionRow}>
                                <Text style={styles.numberText}>2. </Text>
                                <Text style={styles.bodyText}>Select or enter your search </Text>
                            </View>
                            <View style={styles.sectionRow}>
                                <Text style={styles.numberText}>3. </Text>
                                <Text style={styles.bodyText}>Select an actor from the list to view their movies.</Text>
                            </View>
                            <View style={styles.sectionRow}>
                                <Text style={styles.numberText}>4. </Text>
                                <Text style={styles.bodyText}>Then select a movie from that list, to view the cast.</Text>
                            </View>
                            <View style={styles.sectionRow}>
                                <Text style={styles.numberText}>5. </Text>
                                <Text style={styles.bodyText}>Keep going till your hearts content. 🤗</Text>
                            </View> */}
                            {helpData.map((item) => (
                                <View key={item.item} style={styles.sectionRow}>
                                    <Text style={styles.numberText}>{item.item}. </Text>
                                    <Text style={styles.bodyText}>{item.text}</Text>
                                </View>
                            )
                            )}
                        </View>
                    </View>
                    {fake_options.map((option, index) => (
                        <View key={index} style={styles.sheetRow}>
                            <Text style={styles.sectionTitleText}>{option.title}</Text>
                            <View style={styles.sectionContainer}>
                                <Text>{option.body}</Text>
                            </View>
                        </View>
                    ))}
                </ScrollView>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    sectionContainer: {
        backgroundColor: '#202540',
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
        backgroundColor: '#25292e',
    },
    stickyHeaderRow: {
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'flex-end',
        // backgroundColor: '#25292e',
        backgroundColor: '#202540'
    },
    sectionTitleText: {
        fontSize: 20,
        fontFamily: 'Bacon-Limelight',
        color: '#ccc',
        paddingLeft: 10,
        paddingBottom: 5,
    },
    exitButton: {
        fontSize: 18,
        color: '#ccc',
    },
    menuTitle: {
        color: '#ccc',
        fontSize: 24,
        fontFamily: 'Bacon-Stencil',
    },
    bodyText: {
        color: '#ccc',
        fontSize: 14,
        flexShrink: 1,
    },
    sectionRow: {
        flexDirection: 'row',
        paddingVertical: 5,
        justifyContent: 'flex-start',
    },
    numberText: {
        color: '#ccc',
        fontSize: 14,
        textAlign: 'left',
    },
});

export default CustomActionSheet;