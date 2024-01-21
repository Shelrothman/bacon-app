import { View, Text, Pressable, Linking } from 'react-native'
import { sheet_styles } from '../../styles/CustomActionSheet';
import { FontAwesome } from '@expo/vector-icons';
import { SettingData } from '../../types/ui';


type SheetRowProps = {
    title: string,
    data: SettingData[],
}

export function SheetRow({ title, data }: SheetRowProps) {
    return (
        <View style={sheet_styles.sheetRow}>
            <Text style={sheet_styles.sectionTitleText}>{title}</Text>
            <View style={sheet_styles.sectionContainer}>
                {data.map((item, index) => (
                    <View key={index} style={[ sheet_styles.sectionRow, { paddingVertical: 10 } ]}>
                        <Pressable onPress={() => { Linking.openURL(item.url); }}
                            style={({ pressed }) => [
                                {
                                    opacity: pressed ? 0.5 : 1,
                                    transform: [ { scale: pressed ? 0.95 : 1 } ],
                                },
                                { ...sheet_styles.pressableLink }
                            ]}
                        >
                            <Text style={sheet_styles.bodyText}>{item.icon}&nbsp;&nbsp;&nbsp;{item.text}</Text>
                            <FontAwesome name="external-link" size={24} color="#ccc" />
                        </Pressable>
                    </View>
                ))}
            </View>
        </View>
    )
}