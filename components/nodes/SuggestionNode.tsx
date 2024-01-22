import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable, Text } from 'react-native';
import { pressable_style } from '../../styles/PressableNode';
import { text_style } from '../../styles/Text';
import { BaconMovie } from '../../types/api';

type SuggestionNodeProps = {
    handleOnPress: (name: string) => void;
    title: string;
    release_date?: string;
    known_for?: BaconMovie[];
};


/**
 * @component
 * a clickable option for the user to select from in the suggestion list
 */
export function SuggestionNode(props: SuggestionNodeProps) {

    return (
        <Pressable
            onPress={() => props.handleOnPress(props.title)}
            style={({ pressed }) => [ {
                opacity: pressed ? 0.5 : 1,
                transform: [ { scale: pressed ? 0.95 : 1 } ]
            }, pressable_style.suggestionLst ]}
        >
            <Text>
                <Text style={text_style.suggestionTitle}>
                    {props.title} {`\n`}
                </Text>
                <MaterialCommunityIcons name="theater" size={20} color="black" />
                <Text style={text_style.suggestionReleaseDate}>
                    {`\t\t`}{props.release_date && props.release_date}
                    {props.known_for && props.known_for[ 0 ].title}
                </Text>
            </Text>
        </Pressable>
    )
}
