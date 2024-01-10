import { FontAwesome, FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Linking, Modal, Pressable, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';

import TMDB_LOGO from "../../assets/tmdb_logo.svg";
import { ExpoIcon } from './ExpoIcon';
// import EXPO_LOGO from "../../assets/expo.svg";
type CustomActionSheetProps = {
    visible: boolean;
    onClose: () => void;
    // options: string[];
};

// FUTURE:
// import { A } from '@expo/html-elements'; // use like 'Linking' @expo-linking, just a wrapper as an element.
// Built by Shel Rothman 🐚 \n Powered by Expo 𝝠 todo: put this somewhere not in the thanks but somewhere.

// const Slate = {
//     "900": "#191A20",
//     "800": "#282A35",
//     "500": "#64719E",
//     "400": "#3d4051",
//     "200": "#F1F1F1",
//     "100": "#ffffff",
// };



const CustomActionSheet = ({ visible, onClose }: CustomActionSheetProps) => {

    const RefreshControlComponent: React.ReactElement = <RefreshControl
        refreshing={false}
        onRefresh={() => onClose()}
        colors={[ 'transparent' ]} // make the spinner invisible on android
        tintColor={'transparent'} // make the spinner invisible on iOS
        progressBackgroundColor={'transparent'} // make the background invisible on Android
    />;

    /** just using these as i develop, will delete */
    const fake_options = [
        // {
        //     title: 'Special Thanks',
        //     body: 'lorem ipsim lorems lorem lor lorem lorem lorem lor'
        // },
        // {
        //     title: 'Developer Info',
        //     body: 'lorem ipsim lorems lorem lor lorem lorem lorem lor'
        // },
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
    const developerData = [
        {
            icon: <Ionicons name="logo-github" size={24} color="white" />,
            text: 'Github',
            url: 'https://github.com/Shelrothman',
        },
        {
            icon: <MaterialCommunityIcons name="email-send" size={24} color="white" />,
            text: 'Email',
            url: 'mailto:shel.programmer@gmail.com', /// make sure this works...
        },
        {
            icon: <MaterialCommunityIcons name="web" size={24} color="white" />,
            text: 'Professional Website',
            url: 'https://shelbyrothman.com/',
        },
        {
            icon: <FontAwesome5 name="tiktok" size={24} color="white" />,
            text: 'TikTok',
            url: 'https://www.tiktok.com/@shel.0000'
        },
        {
            icon: <FontAwesome name="linkedin-square" size={24} color="white" />,
            text: 'LinkedIn',
            url: 'https://www.linkedin.com/in/shelby-anne-rothman/',
        },
        // TODO: instagram after i make one lol
    ];

    // TODO: modulate this out ...


    // PICKUP: here. keep doing what done here with all the other sections. slowly replacing the fake options.
    // NEXT do the dev data.

    return (
        <Modal visible={visible} transparent animationType="slide">
            <View style={styles.container}>
                <Pressable style={styles.stickyHeaderRow} onPress={() => onClose()}>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Text style={styles.menuTitle}>Menu</Text>
                    </View>
                    <Text style={styles.exitButton}>&#8964;</Text>
                </Pressable>
                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end', }}
                    refreshControl={RefreshControlComponent}
                >
                    <View style={styles.sheetRow}>
                        <Text style={styles.sectionTitleText}>How do I do this?</Text>
                        <View style={styles.sectionContainer}>
                            {helpData.map((item) => (
                                <View key={item.item} style={styles.sectionRow}>
                                    <Text style={styles.numberText}>{item.item}. </Text>
                                    <Text style={styles.bodyText}>{item.text}</Text>
                                </View>
                            )
                            )}
                        </View>
                    </View>
                    <View style={styles.sheetRow}>
                        <Text style={styles.sectionTitleText}>Special Thanks</Text>
                        <View style={styles.sectionContainer}>
                            <View style={[ styles.sectionRow, { justifyContent: 'space-evenly' } ]}>
                                {/* REQUIRED: attribute TMDB as the source of the data */}
                                <Text style={[ styles.bodyText, { textAlign: 'left' } ]}>Data Source:</Text>
                                <Text style={{ textAlign: 'right' }}>
                                    <TMDB_LOGO width={175} height={30} />
                                </Text>
                            </View>
                            <View style={[ styles.sectionRow, { justifyContent: 'space-between' } ]}>
                                <Text style={[ styles.bodyText, { fontStyle: 'italic', textAlign: 'center' } ]}>
                                    This product uses the TMDB API but is not endorsed or certified by TMDB.
                                </Text>
                            </View>
                            <View style={[ styles.sectionRow, { justifyContent: 'center', paddingBottom: 0 } ]}>
                                <Text style={styles.bodyText}>Built By: Shel Rothman 🐚</Text>
                            </View>
                            <View style={[ styles.sectionRow, { justifyContent: 'center', paddingVertical: 0 } ]}>
                                <Text style={styles.bodyText}>Powered By: Expo <ExpoIcon /></Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.sheetRow}>
                        <Text style={styles.sectionTitleText}>Developer Info</Text>
                        <View style={styles.sectionContainer}>
                            {developerData.map((item, index) => (
                                <View key={index} style={styles.sectionRow}>
                                    <Pressable onPress={() => { Linking.openURL(item.url); }}
                                        style={({ pressed }) => [
                                            {
                                                opacity: pressed ? 0.5 : 1,
                                                transform: [ { scale: pressed ? 0.95 : 1 } ],
                                                flexDirection: 'row', alignItems: 'center',
                                                justifyContent: 'space-between',
                                                flex: 1,    
                                            }
                                        ]}

                                    // style={{
                                    //     flexDirection: 'row', alignItems: 'center',
                                    //     justifyContent: 'space-between',
                                    //     flex: 1,
                                    // }}
                                    >
                                        {/* <Text>{item.icon}</Text> */}
                                        <Text style={styles.bodyText}>{item.icon}&nbsp;&nbsp;&nbsp;{item.text}</Text>
                                        <FontAwesome name="external-link" size={24} color="#ccc" />
                                    </Pressable>
                                </View>
                            ))}
                            {/* <View style={[ styles.sectionRow, { justifyContent: 'space-evenly' } ]}>
                                <Text style={[ styles.bodyText, { textAlign: 'left' } ]}>Data Source:</Text>
                                <Text style={{ textAlign: 'right' }}>
                                    <TMDB_LOGO width={175} height={30} />
                                </Text>
                            </View>
                            <View style={[ styles.sectionRow, { justifyContent: 'space-between' } ]}>
                                <Text style={[ styles.bodyText, { fontStyle: 'italic', textAlign: 'center' } ]}>
                                    This product uses the TMDB API but is not endorsed or certified by TMDB.
                                </Text>
                            </View>
                            <View style={[ styles.sectionRow, { justifyContent: 'center', paddingBottom: 0 } ]}>
                                <Text style={styles.bodyText}>Built By: Shel Rothman 🐚</Text>
                            </View>
                            <View style={[ styles.sectionRow, { justifyContent: 'center', paddingVertical: 0 } ]}>
                                <Text style={styles.bodyText}>Powered By: Expo <ExpoIcon /></Text>
                            </View> */}
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
    scrollView: {
        maxHeight: '60%',
        backgroundColor: '#09192e',
        borderRightColor: '#ccc',
        borderRightWidth: 1,
        borderLeftColor: '#ccc',
        borderLeftWidth: 1,
    },
    sectionContainer: {
        // backgroundColor: '#202540',
        backgroundColor: '#25292e',
        borderRadius: 10,
        color: '#fff',
        padding: 10,
    },
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        // borderRadius
    },
    sheetRow: {
        padding: 10,
        backgroundColor: '#09192e'
    },
    stickyHeaderRow: {
        flexDirection: 'row',
        padding: 10,
        borderTopEndRadius: 15,
        borderTopStartRadius: 15,
        borderTopColor: '#ccc',
        borderTopWidth: 1,
        borderLeftColor: '#ccc',
        borderLeftWidth: 1,
        borderRightColor: '#ccc',
        borderRightWidth: 1,
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
        fontWeight: 'bold',
    },
    menuTitle: {
        color: '#ccc',
        fontSize: 24,
        fontFamily: 'Bacon-Stencil',
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

export default CustomActionSheet;