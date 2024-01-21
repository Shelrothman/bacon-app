import { FontAwesome, FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Linking, Modal, Pressable, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';

import { AntDesign } from '@expo/vector-icons';

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
    // TODO: use the proper url for writing review once u get the app on the app store.
    const supportData = [
        {
            icon: "📝",
            text: "Write a review",
            url: "https://www.google.com/search?q=todo&rlz=1C1GCEA_enUS997US997&oq=todo&gs_lcrp=EgZjaHJvbWUyFAgAEEUYORhDGIMBGLEDGIAEGIoFMhIIARAAGEMYgwEYsQMYgAQYigUyDAgCEAAYQxiABBiKBTIMCAMQABhDGIAEGIoFMgwIBBAAGEMYgAQYigUyDQgFEC4YgwEYsQMYgAQyDAgGEAAYQxiABBiKBTIKCAcQABixAxiABDINCAgQLhivARjHARiABDINCAkQABiDARixAxiABNIBBzY4NWowajeoAgCwAgA&sourceid=chrome&ie=UTF-8"
            // link: `itms-apps://itunes.apple.com/app/viewContentsUserReviews/id${require("../../../eas.json").submit.production.ios.ascAppId}?action=write-review` <--- use this but with bacon.
        },
        {
            icon: "⭐",
            text: "Star the project on Github",
            url: "https://github.com/Shelrothman/bacon-app"
        },
        {
            icon: "🐛",
            text: "Report a bug",
            url: "https://github.com/Shelrothman/bacon-app/issues/new"
        }
    ];


    // TODO: modulate this out ...


    return (
        <Modal visible={visible} transparent animationType="slide">
            <View style={styles.container}>
                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end', }}
                    refreshControl={RefreshControlComponent}
                    showsVerticalScrollIndicator={false}
                    stickyHeaderIndices={[ 0 ]}
                >
                    <Pressable style={styles.stickyHeaderRow} onPress={() => onClose()}>
                        <Text style={styles.menuTitle}>Menu <AntDesign name="down" size={24} color="#202540" /></Text>
                    </Pressable>
                    <View style={styles.sheetRow}>
                        <Text style={styles.sectionTitleText}>How do I do this?</Text>
                        <View style={styles.sectionContainer}>
                            {helpData.map((item) => (
                                <View key={item.item} style={styles.sectionRow}>
                                    <Text style={styles.numberText}>{item.item}. </Text>
                                    <Text style={styles.bodyText}>{item.text}</Text>
                                </View>
                            ))}
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
                                <View key={index} style={[ styles.sectionRow, { paddingVertical: 10 } ]}>
                                    <Pressable onPress={() => { Linking.openURL(item.url); }}
                                        style={({ pressed }) => [
                                            {
                                                opacity: pressed ? 0.5 : 1,
                                                transform: [ { scale: pressed ? 0.95 : 1 } ],
                                            },
                                            { ...styles.pressableLink }
                                        ]}
                                    >
                                        <Text style={styles.bodyText}>{item.icon}&nbsp;&nbsp;&nbsp;{item.text}</Text>
                                        <FontAwesome name="external-link" size={24} color="#ccc" />
                                    </Pressable>
                                </View>
                            ))}
                        </View>
                    </View>
                    <View style={styles.sheetRow}>
                        <Text style={styles.sectionTitleText}>Support the App</Text>
                        <View style={styles.sectionContainer}>
                            {supportData.map((item, index) => (
                                <View key={index} style={[ styles.sectionRow, { paddingVertical: 10 } ]}>
                                    <Pressable onPress={() => { Linking.openURL(item.url); }}
                                        style={({ pressed }) => [
                                            {
                                                opacity: pressed ? 0.5 : 1,
                                                transform: [ { scale: pressed ? 0.95 : 1 } ],
                                            },
                                            { ...styles.pressableLink }
                                        ]}
                                    >
                                        <Text style={styles.bodyText}>{item.icon}&nbsp;&nbsp;&nbsp;{item.text}</Text>
                                        <FontAwesome name="external-link" size={24} color="#ccc" />
                                    </Pressable>
                                </View>
                            ))}
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

export default CustomActionSheet;