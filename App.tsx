import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ScrollView, View, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { MainSquare } from './components/MainSquare';
import { AppProvider } from './contexts/AppContext';


export default function App() {
    return (
        <AppProvider>
            <SafeAreaView style={styles.container}>
                {/* light so it shows on dark. */}
                <StatusBar style="light" />
                <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} enabled={true} >
                    {/* info: dismiss it with a tap or a drag anywhere outside the input */}
                    <ScrollView keyboardShouldPersistTaps='never' keyboardDismissMode='on-drag' >
                        <View style={styles.squareContainer}>
                            <MainSquare />
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </AppProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#25292e',
        alignItems: 'center',
        justifyContent: 'center',
    },
    squareContainer: {
        flex: 1,
        paddingTop: 50,
    },
    // TODO: the footer container holding reset and settings.
    // footerContainer: {},

});
