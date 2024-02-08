import { FontAwesome, FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Modal, Pressable, RefreshControl, ScrollView, Text, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { helpData, supportData } from './data';
import { sheet_styles } from '../../styles/CustomActionSheet';
import { SheetRow } from './SheetRow';
import { CreditSection } from './CreditSection';


type CustomActionSheetProps = {
    visible: boolean;
    onClose: () => void;
};

// TODO: maybe, future: "App Info"

const CustomActionSheet = ({ visible, onClose }: CustomActionSheetProps) => {

    const RefreshControlComponent: React.ReactElement = <RefreshControl
        refreshing={false}
        onRefresh={() => onClose()}
        colors={[ 'transparent' ]} // make the spinner invisible on android
        tintColor={'transparent'} // make the spinner invisible on iOS
        progressBackgroundColor={'transparent'} // make the background invisible on Android
    />;

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
            text: 'Website',
            url: 'https://shelbyrothman.com/',
        },
        {
            icon: <Foundation name="social-instagram" size={24} color="white" />,
            text: 'Instagram',
            url: 'https://www.instagram.com/00.shel/',
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
    ];

    return (
        <Modal visible={visible} transparent animationType="slide">
            <View style={sheet_styles.container}>
                <ScrollView
                    style={sheet_styles.scrollView}
                    contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end', }}
                    refreshControl={RefreshControlComponent}
                    showsVerticalScrollIndicator={false}
                    stickyHeaderIndices={[ 0 ]}
                >
                    <Pressable style={sheet_styles.stickyHeaderRow} onPress={() => onClose()}>
                        <Text style={sheet_styles.menuTitle}>Menu <AntDesign name="down" size={24} color="#202540" /></Text>
                    </Pressable>
                    <View style={sheet_styles.sheetRow}>
                        <Text style={sheet_styles.sectionTitleText}>How do I do this?</Text>
                        <View style={[ sheet_styles.sectionContainer, { alignItems: 'flex-start' } ]}>
                            {helpData.map((item, index) => (
                                <View
                                    key={item.item}
                                    style={!(index % 2) ? sheet_styles.sectionRow
                                        : (index === helpData.length - 1)
                                            ? [ sheet_styles.sectionRowAlt, sheet_styles.bottomAltRow ]
                                            : sheet_styles.sectionRowAlt
                                        // info: this will only display properly if the data is even amount
                                    }>
                                    <Text style={sheet_styles.numberText}>{item.item}. </Text>
                                    <Text style={sheet_styles.bodyText}>{item.text}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                    <CreditSection />
                    <SheetRow title="Developer Info" data={developerData} />
                    <SheetRow title="Support the App" data={supportData} />
                    {/* <SheetRow title="App Info" data={appInfoData} />*/}
                </ScrollView>
            </View>
        </Modal>
    );
};



export default CustomActionSheet;