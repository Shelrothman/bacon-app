import { Pressable, Text } from 'react-native'

import { pressable_style, text_style } from '../styles';

type FooterButtonProps = {
    icon: JSX.Element;
    text: string;
    handlePress: () => void;
    /** default is false */
    disabled?: boolean;
}

export function FooterButton(props: FooterButtonProps) {
    const { icon, text, handlePress, disabled } = props;

    return (
        <Pressable onPress={handlePress} style={pressable_style.footer} disabled={disabled}>
            {icon}
            <Text style={[ text_style.footerText, { color: !disabled ? 'white' : '#8e8e8e' } ]}>
                {text}
            </Text>
        </Pressable>
    )
}