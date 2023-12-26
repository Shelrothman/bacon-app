import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, Text } from 'react-native';

import { pressable_style } from '../../styles/PressableNode';

type NodeWrapperProps = {
    /** name of movie or actor at hand */
    handleOnPress: (id: number, name: string) => void;
    nameOrTitle: string;
    id: number;
    innerIcon: React.ReactNode;
    /** 4 colors for the gradient */
    backgrounds: string[];
    characterName?: string;
}


/**
 * @component
 * Wrapper for the nodes that are pressable from the squares
 */

export function NodeWrapper(props: NodeWrapperProps) {
    const { handleOnPress, nameOrTitle, id, innerIcon, backgrounds, characterName } = props;

    return (
        <Pressable
            onPress={() => handleOnPress(id, nameOrTitle)}
            id={nameOrTitle}
            style={({ pressed }) => [ { opacity: pressed ? 0.5 : 1, transform: [ { scale: pressed ? 0.95 : 1 } ] } ]}
        >
            <LinearGradient style={pressable_style.innerContainerWrapper} colors={backgrounds} >
                <Text>
                    {innerIcon}
                    <Text style={{ fontFamily: 'Bacon-Limelight', fontSize: 20 }}> {nameOrTitle}</Text> {`\n`}
                    <Text style={{ textAlign: 'right', fontFamily: 'Bacon-Inline', fontSize: 20 }}>{characterName || 'unknown'}</Text>
                </Text>
            </LinearGradient>
        </Pressable>
    )
}

