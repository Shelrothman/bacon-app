import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useCallback } from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';

import Footer from './components/Footer';
import { MainSquare } from './components/MainSquare';
import { AppProvider } from './contexts/AppContext';


// TODO: a cool engagin splash screeen like ready to get that off your tongue yahoo thing

export default function App() {


    const [ fontsLoaded ] = useFonts({
        'Bacon-Play': require('./assets/fonts/PlaypenSans-Regular.ttf'),
        'Bacon-Reg': require('./assets/fonts/BigShouldersDisplay-Regular.ttf'),
        'Bacon-Bold': require('./assets/fonts/BigShouldersDisplay-Bold.ttf'),
        'Bacon-Boldest': require('./assets/fonts/BigShouldersDisplay-Black.ttf'),
        'Bacon-Light': require('./assets/fonts/BigShouldersDisplay-Light.ttf'),
    });

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [ fontsLoaded ]);

    if (!fontsLoaded) {
        return null;
    }

    return (
        <AppProvider>
            <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
                {/* light so it shows on dark. */}
                <StatusBar style="light" />
                <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} enabled={true} >
                    {/* info: dismiss it with a tap or a drag anywhere outside the input and keyboard*/}
                    <ScrollView
                        keyboardShouldPersistTaps='never'
                        keyboardDismissMode='on-drag'
                        showsVerticalScrollIndicator={false}
                        //???: not sure about this..
                        // contentContainerStyle={{ maxHeight: '100%' }}
                    >
                        <View style={styles.squareContainer}>
                            <MainSquare />
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
                <View style={styles.footerContainer}>
                    <Footer />
                </View>
            </SafeAreaView>
        </AppProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#25292e',
        alignItems: 'center',
        position: 'relative',
        justifyContent: 'center',
        // paddingTop: 40,
    },
    squareContainer: {
        flex: 1,
        paddingTop: 50,
    },
    footerContainer: {
        flexDirection: 'row',
        // alignItems: 'stretch',
        justifyContent: 'space-between',
        position: 'absolute',
        bottom: 50,
    },
});
