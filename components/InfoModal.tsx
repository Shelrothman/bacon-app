import { Pressable, Text, View } from 'react-native';
import Toast from 'react-native-root-toast';

// import { useAppContext } from '../contexts/AppContext';
import { modal_styles } from '../styles/Modal';

type InfoModalProps = {
    modalVisible: boolean;
    setModalVisible: (arg: boolean) => void;
    innerContent: React.ReactNode;
};

export function InfoModal(props: InfoModalProps) {
    const { modalVisible, setModalVisible, innerContent } = props;
    // const { currentMovieTitle, currentMovieOverview, currentMovieReleaseDate } = useAppContext();


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
                {/*  */}
                {innerContent}
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


