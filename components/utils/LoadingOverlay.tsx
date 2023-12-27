import { ActivityIndicator,View } from "react-native";

// TODO: a custom cool looking spinner.. like a movie reel spinning

// PICKUP: a loading scree with the squares right over it wold be perfect like looking like waves rolling kind of always being the color of the upcoming nodes to bring in/
//https://reactnative.dev/docs/animated


// the bak back grounf f have like deesing in it.

export default function LoadingOverlay() {
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", height: 100, width: 100, }}>
            <ActivityIndicator size="large" color='#fff' />
        </View>
    );
}
