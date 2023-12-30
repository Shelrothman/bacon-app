import { Text, View } from 'react-native';

import { container_style, text_style } from '../styles';

// TODO: perhaps a little subheader for the release date..
// and/or that info icon somewhere

// THE header itself can be the clickable thing for info! or pressable

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