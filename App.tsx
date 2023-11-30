import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ScrollView, View, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';

import { MainSquare } from './components/MainSquare';
import { AppProvider, useAppContext } from './contexts/AppContext';
import LoadingOverlay from './components/utils/LoadingOverlay';

export default function App() {

    const { isLoading } = useAppContext();

    return (
        <AppProvider>
            <SafeAreaView style={styles.container}>
                {/* light so it shows on dark. */}
                <StatusBar style="light" />
                {/* {isLoading && <LoadingOverlay />} */}
                <KeyboardAvoidingView
                    behavior={Platform.OS == "ios" ? "padding" : "height"} enabled={true}
                    // style={isLoading ? styles.hidden : null}
                >
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
        position: 'relative',
        justifyContent: 'center',
    },
    squareContainer: {
        flex: 1,
        paddingTop: 50,
    },
    hidden: {
        display: 'none',
    }
    // TODO: the footer container holding reset and settings.
    // footerContainer: {},

});
