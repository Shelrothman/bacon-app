import { Pressable, Text, View } from 'react-native';

import { container_style, pressable_style, text_style } from '../styles';
// import { InfoModal } from './InfoModal';


type SquareHeaderProps = {
    title: string;
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}


export function SquareHeader({ title, setModalVisible }: SquareHeaderProps) {

    return (
        <>
            <View style={container_style.squareHeaderContainer}>
                <Pressable
                    style={({ pressed }) => [ {
                        opacity: pressed ? 0.5 : 1,
                        transform: [ { scale: pressed ? 0.95 : 1 } ],
                    }, pressable_style.titleInfoPressable
                    ]}
                    onPress={() => setModalVisible(true)}
                >
                    <Text style={text_style.squareHeader}>{title}</Text>
                </Pressable>
            </View>
        </>
    )
}