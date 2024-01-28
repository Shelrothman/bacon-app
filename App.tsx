import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useCallback } from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, View } from 'react-native';
import { RootSiblingParent } from 'react-native-root-siblings';
import Footer from './components/Footer';
import { MainSquare } from './components/squarestates/MainSquare';
import { AppProvider } from './contexts/AppContext';
import { container_style } from './styles';

// TODO: a cool engagin splash screeen like ready to get that off your tongue yahoo thing


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

    // TODO: organze this into a better structure
    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [ fontsLoaded ]);

    if (!fontsLoaded) {
        return null;
    }
    // we are using the RootSiblingParent to allow for the use of the Toasts
    return (
        <RootSiblingParent>
            <AppProvider>
                <SafeAreaView style={container_style.appRootContainer} onLayout={onLayoutRootView}>
                    <StatusBar style="light" />{/* light so it shows on dark. */}
                    <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} enabled={true} >
                        {/* info: dismiss it with a tap or a drag anywhere outside the input and keyboard*/}
                        {/* ???: potentially not have the scrollView here. */}
                        <ScrollView keyboardShouldPersistTaps='handled' keyboardDismissMode='on-drag' showsVerticalScrollIndicator={false}>
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
        </RootSiblingParent>
    );
}

