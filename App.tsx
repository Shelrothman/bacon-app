import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ScrollView, View, SafeAreaView, KeyboardAvoidingView, Platform, Button } from 'react-native';

import { MainSquare } from './components/MainSquare';
import { AppProvider } from './contexts/AppContext';
import Footer from './components/Footer';

export default function App() {

    return (
        <AppProvider>
            <SafeAreaView style={styles.container}>
                {/* light so it shows on dark. */}
                <StatusBar style="light" />
                <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} enabled={true} >
                    {/* info: dismiss it with a tap or a drag anywhere outside the input and keyboard*/}
                    <ScrollView keyboardShouldPersistTaps='never' keyboardDismissMode='on-drag' >
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
