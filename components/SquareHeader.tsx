import { Text, View } from 'react-native';

import { container_style, text_style } from '../styles';

type SquareHeaderProps = {
    title: string;
}


export function SquareHeader(props: SquareHeaderProps) {
    return (
        <View style={container_style.squareHeaderContainer}>
            <Text style={text_style.squareHeader}>{props.title}</Text>
        </View>
    )
}