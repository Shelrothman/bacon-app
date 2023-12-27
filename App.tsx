import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useCallback } from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';

import Footer from './components/Footer';
import { MainSquare } from './components/MainSquare';
import { AppProvider } from './contexts/AppContext';

// TODO: an info icon thing to show user the overview at any popint in the app.

// TODO: a cool engagin splash screeen like ready to get that off your tongue yahoo thing

export default function App() {


    // TODO: got rhough asses and delete the ones that are not used from here and tehj actual files themselves

    const [ fontsLoaded ] = useFonts({
        'Bacon-Reg': require('./assets/fonts/BigShouldersDisplay-Regular.ttf'),
        'Bacon-Bold': require('./assets/fonts/BigShouldersDisplay-Black.ttf'),
        'Bacon-Inline': require('./assets/fonts/InlineBlackTitle.ttf'),
        'Bacon-Limelight': require('./assets/fonts/Limelight-Regular.ttf'),
        'Bacon-Stencil': require('./assets/fonts/StencilTitle.ttf'),
        'Bacon-Script': require('./assets/fonts/Script.ttf'),
        'Bacon-Stencil-Bold': require('./assets/fonts/Stencil-Bold.ttf'),
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
                <StatusBar style="light" />{/* light so it shows on dark. */}
                <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} enabled={true} >
                    {/* info: dismiss it with a tap or a drag anywhere outside the input and keyboard*/}
                    <ScrollView keyboardDismissMode='on-drag' showsVerticalScrollIndicator={false} >
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
        width: '100%',
        justifyContent: 'space-between',
        position: 'absolute',
        // marginHorizontal: 20,
        paddingHorizontal: 30,
        bottom: 50,
    },
});
