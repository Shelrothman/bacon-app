import { View, Text } from 'react-native'
import { sheet_styles } from '../../styles/CustomActionSheet';
import TMDB_LOGO from "../../assets/tmdb_logo.svg";
import { ExpoIcon } from './ExpoIcon';



export function CreditSection() {
    return (
        <View style={sheet_styles.sheetRow}>
            <Text style={sheet_styles.sectionTitleText}>Credits</Text>
            <View style={sheet_styles.sectionContainer}>
                <View style={[ sheet_styles.sectionRow, sheet_styles.topAltRow, { justifyContent: 'center' } ]}>
                    <Text style={sheet_styles.bodyText}>Built By: Shel Rothman 🐚</Text>
                </View>
                <View style={[ sheet_styles.sectionRowAlt, { justifyContent: 'center' } ]}>
                    <Text style={[ sheet_styles.bodyText, { transform: [ { translateY: -4 } ] } ]}>Powered By: Expo <ExpoIcon /></Text>
                </View>
                <View style={sheet_styles.sectionRow}>
                    {/* REQUIRED: attribute TMDB as the source of the data */}
                    <Text style={sheet_styles.bodyText}>Data Source: </Text>
                    <Text style={sheet_styles.tmdbLogo}>
                        <TMDB_LOGO width={175} height={30} />
                    </Text>
                </View>
                <View style={[ sheet_styles.sectionRowAlt, sheet_styles.bottomAltRow ]}>
                    <Text style={[ sheet_styles.bodyText, { fontStyle: 'italic', textAlign: 'center', fontSize: 13 } ]}>
                        This product uses the TMDB API but is not endorsed or certified by TMDB.
                    </Text>
                </View>

            </View>
        </View >
    )
}