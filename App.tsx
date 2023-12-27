import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useCallback } from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, View } from 'react-native';

import Footer from './components/Footer';
import { MainSquare } from './components/MainSquare';
import { AppProvider } from './contexts/AppContext';
import { container_style } from './styles';

// TODO: an info icon thing to show user the overview at any popint in the app.

// TODO: a cool engagin splash screeen like ready to get that off your tongue yahoo thing

// TODO: must do proper accreditation for the tmdb api


export default function App() {

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
            <SafeAreaView style={container_style.appRootContainer} onLayout={onLayoutRootView}>
                <StatusBar style="light" />{/* light so it shows on dark. */}
                <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} enabled={true} >
                    {/* info: dismiss it with a tap or a drag anywhere outside the input and keyboard*/}
                    <ScrollView keyboardDismissMode='on-drag' showsVerticalScrollIndicator={false} >
                        <View style={container_style.mainSquareWrapper}>
                            <MainSquare />
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
                <View style={container_style.footerOuterWrapper}>
                    <Footer />
                </View>
            </SafeAreaView>
        </AppProvider>
    );
}

