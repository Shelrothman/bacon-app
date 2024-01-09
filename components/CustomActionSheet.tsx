import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type CustomActionSheetProps = {
    visible: boolean;
    onClose: () => void;
    // options: string[];
};

// PICKUP: HERE:  get this looking nice

const CustomActionSheet = ({ visible, onClose }: CustomActionSheetProps) => {
    // const options = [ 'Menu', 'What is this', 'Special Thanks', 'Developer Info', 'Support the App', 'App Info' ];
    // const options = [ 'What is this', 'Special Thanks', 'Developer Info', 'Support the App', 'App Info' ];
    const options = [
        {
            title: 'What is this',
            body: 'lorem ipsim lorems lorem lor lorem lorem lorem lor'
        },
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

    return (
        <Modal visible={visible} transparent animationType="slide">
            <View style={styles.container}>
                <TouchableOpacity style={styles.titleRow} onPress={() => onClose()}>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Text style={[ styles.text, styles.menuTitle ]}>Menu</Text>
                    </View>
                    <Text style={styles.exitButton}>v</Text>
                </TouchableOpacity>
                {/* <ScrollView */}
                <ScrollView
                    style={{ maxHeight: '50%' }}
                    contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end' }}>
                {options.map((option, index) => (
                    <View key={index} style={styles.sheetRow}>
                        <Text style={styles.text}>{option.title}</Text>
                        <View style={styles.bodyContainer}>
                            <Text>{option.body}</Text>
                        </View>
                    </View>
                ))}
                </ScrollView> 
                {/* <TouchableOpacity style={styles.sheetRow} onPress={() => onClose()}>
                    <Text style={styles.text}>Cancel</Text>
                </TouchableOpacity> */}
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    bodyContainer: {
        backgroundColor: '#25292e',
        // padding: 20,
        borderRadius: 10,
        color: '#fff'
    },
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        // maxHeight: '50%',
        // backgroundColor: 'rgba(0, 0, 0, 0.5)',
        // backgroundColor: 'transparent'
    },
    sheetRow: {
        padding: 10,
        backgroundColor: '#4157be',
        borderTopWidth: 1,
        borderTopColor: '#ccc',
    },
    titleRow: {
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'flex-end',
        backgroundColor: '#4158BE',
    },
    text: {
        fontSize: 22,
        fontFamily: 'Bacon-Reg',
    },
    exitButton: {
        fontSize: 18,
    },
    menuTitle: {
        // justifyContent: 'center',
        // alignItems: 'center',
        // flexDirection: 'row',
        // alignSelf: 'flex-start',
    },
});

export default CustomActionSheet;