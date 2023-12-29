import { Animated, Easing } from 'react-native';

const spinValue = new Animated.Value(0);

// ???: would it be better to have this in a hook?

export const startAnimation = () => {
    spinValue.setValue(0); // reset the spin value
    Animated.loop(
        Animated.timing(spinValue, {
            toValue: 1,
            duration: 1100, // lower the number, the faster it spins
            easing: Easing.linear,
            useNativeDriver: true,
        }),
    ).start();
};

// to make this appear slower i could add a delay to the loop

export const spinForward = spinValue.interpolate({
    inputRange: [ 0, 1 ],
    outputRange: [ '0deg', '360deg' ],
});

export const spinBackward = spinValue.interpolate({
    inputRange: [ 0, 1 ],
    outputRange: [ '360deg', '0deg' ],
});