// import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Toast from 'react-native-root-toast';

import { useAppContext } from '../contexts/AppContext';

type InfoModalProps = {
    modalVisible: boolean;
    setModalVisible: (arg: boolean) => void;
};

export function InfoModal(props: InfoModalProps) {
    const { modalVisible, setModalVisible } = props;

    const { currentMovieTitle } = useAppContext();
    // const [ modalVisible, setModalVisible ] = useState(false);

    return (
        <Toast
            visible={modalVisible}
            position={Toast.positions.TOP}
            onHide={() => setModalVisible(false)}
            backgroundColor='#6779cb'
            textColor='#000'
        >
            <View>
                <Text style={modal_styles.movieTitle}>
                    {currentMovieTitle}
                </Text>
                <Pressable
                    style={[ modal_styles.button, modal_styles.buttonClose ]}
                    onPress={() => setModalVisible(!modalVisible)}>
                    <Text style={modal_styles.textStyle}>X</Text>
                </Pressable>
            </View>
        </Toast>
    )
}


const modal_styles = StyleSheet.create({
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    movieTitle: {
        marginBottom: 15,
        textAlign: 'center',
        fontFamily: 'Bacon-Limelight',
        textDecorationLine: 'underline',
    },
});