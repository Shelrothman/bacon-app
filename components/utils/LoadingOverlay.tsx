import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useEffect } from 'react';
import { Animated, View } from 'react-native';

import { spinBackward, spinForward, startAnimation } from './animation';

export default function LoadingOverlay() {

    useEffect(() => { startAnimation(); }, []);

    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", height: 100, width: 100, flexDirection: 'row' }}>
            <Animated.View style={{ transform: [ { rotate: spinBackward } ], }}>
                <MaterialCommunityIcons name="movie-roll" size={100} color="black" />
            </Animated.View>
            <Animated.View style={{ transform: [ { rotate: spinForward } ], marginTop: -60 }}>
                <MaterialCommunityIcons name="movie-roll" size={75} color="black" />
            </Animated.View>
        </View>
    );
}
