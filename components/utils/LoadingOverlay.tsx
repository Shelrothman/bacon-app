import { ActivityIndicator,View } from "react-native";

export default function LoadingOverlay() {
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", height: 100, width: 100, }}>
            <ActivityIndicator size="large" color='#fff' />
        </View>
    );
}
