import { Text, View } from "react-native";


export function ExpoIcon() {
    return (
        <View style={{
            borderCurve: "continuous",
            borderRadius: 6,
            padding: 6,
            backgroundColor: '#000',
            transform: [ { translateY: 3 } ],
        }}>
            <Text style={{ color: '#fff', fontWeight: '900', }}>
                𝝠
            </Text>
        </View>
    );
}