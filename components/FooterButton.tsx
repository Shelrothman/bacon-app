import { Pressable, Text } from 'react-native'

import { pressable_style, text_style } from '../styles';
// import { useAppContext } from '../contexts/AppContext'

type FooterButtonProps = {
    icon: JSX.Element;
    text: string;
    handlePress: () => void;
}

export function FooterButton(props: FooterButtonProps) {
    const { icon, text, handlePress } = props;
    // const { setSquareState } = useAppContext();
    // may need this for when the user clicks the button to go back to the movie input screen

    return (
        <Pressable onPress={handlePress} style={pressable_style.footer}>
            {icon}
            <Text style={text_style.footerText}>{text}</Text>
        </Pressable>
    )
}