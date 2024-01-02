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

    const { currentMovieTitle, currentMovieOverview, currentMovieReleaseDate } = useAppContext();


    return (
        <Toast
            opacity={0.9}
            visible={modalVisible}
            position={Toast.positions.TOP}
            onHide={() => setModalVisible(false)}
            backgroundColor='#6779cb'
            textColor='#000'
            hideOnPress={false}
        >
            <View>
                <Text style={modal_styles.movieTitle}>{currentMovieTitle}</Text>
                <Text style={modal_styles.releaseDate}>{currentMovieReleaseDate}</Text>
                <Text style={modal_styles.movieOverview}>{currentMovieOverview}</Text>
                <Pressable
                    style={({ pressed }) => [ {
                        opacity: pressed ? 0.5 : 1,
                        transform: [ { scale: pressed ? 0.95 : 1 } ],
                    }, modal_styles.exitButtonWrapper
                    ]}
                    onPress={() => setModalVisible(false)}>
                    <Text style={modal_styles.exitText}>OK</Text>
                </Pressable>
            </View>
        </Toast>
    )
}


const modal_styles = StyleSheet.create({
    exitButtonWrapper: {
        alignSelf: 'flex-end',
        borderRadius: 20,
        borderWidth: 1.5,
        borderColor: '#000',
        padding: 10,
        // elevation: 2,
        backgroundColor: '#2196F3',
    },
    exitText: {
        color: '#000',
        // fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
        fontFamily: 'Bacon-Inline',
    },
    releaseDate: {
        textAlign: 'right',
        fontStyle: 'italic',
    },
    movieOverview: {
        fontFamily: 'Bacon-Bold',
        fontSize: 16,
        overflow: 'scroll',
    },
    movieTitle: {
        textAlign: 'center',
        fontFamily: 'Bacon-Limelight',
        textDecorationLine: 'underline',
        fontSize: 25,
    },
});