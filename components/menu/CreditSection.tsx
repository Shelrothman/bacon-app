import { View, Text } from 'react-native'
import { sheet_styles } from '../../styles/CustomActionSheet';
import TMDB_LOGO from "../../assets/tmdb_logo.svg";
import { ExpoIcon } from './ExpoIcon';



export function CreditSection() {
    return (
        <View style={sheet_styles.sheetRow}>
            <Text style={sheet_styles.sectionTitleText}>Special Thanks</Text>
            <View style={sheet_styles.sectionContainer}>
                <View style={[ sheet_styles.sectionRow, { justifyContent: 'space-evenly' } ]}>
                    {/* REQUIRED: attribute TMDB as the source of the data */}
                    <Text style={[ sheet_styles.bodyText, { textAlign: 'left' } ]}>Data Source:</Text>
                    <Text style={{ textAlign: 'right' }}>
                        <TMDB_LOGO width={175} height={30} />
                    </Text>
                </View>
                <View style={[ sheet_styles.sectionRow, { justifyContent: 'space-between' } ]}>
                    <Text style={[ sheet_styles.bodyText, { fontStyle: 'italic', textAlign: 'center', fontSize: 13 } ]}>
                        This product uses the TMDB API but is not endorsed or certified by TMDB.
                    </Text>
                </View>
                <View style={[ sheet_styles.sectionRow, { justifyContent: 'center', paddingBottom: 0 } ]}>
                    <Text style={sheet_styles.bodyText}>Built By: Shel Rothman 🐚</Text>
                </View>
                <View style={[ sheet_styles.sectionRow, { justifyContent: 'center', paddingVertical: 0 } ]}>
                    <Text style={sheet_styles.bodyText}>Powered By: Expo <ExpoIcon /></Text>
                </View>
            </View>
        </View>
    )
}