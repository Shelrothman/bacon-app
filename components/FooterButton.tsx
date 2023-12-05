// import { FontAwesome } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text } from 'react-native'

// import { useAppContext } from '../contexts/AppContext'

type FooterButtonProps = {
    icon: JSX.Element;
    text: string;
    handlePress: () => void;
}

export function FooterButton(props: FooterButtonProps) {
    const { icon, text, handlePress } = props;
    // const { setSquareState } = useAppContext();
    // TODO: the settings thing into pull up menu


    return (
            <Pressable onPress={handlePress} style={styles.container}>
                {icon}
                <Text style={styles.text}>{text}</Text>
            </Pressable>
    )
}

const styles = StyleSheet.create({
    text: {
        color: 'white',
        fontFamily: 'Bacon-Stencil',
        fontSize: 18,
    },
    container: {
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
})