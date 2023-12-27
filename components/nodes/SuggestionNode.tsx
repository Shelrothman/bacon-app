import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable, Text } from 'react-native';

import { pressable_style } from '../../styles/PressableNode';
import { text_style } from '../../styles/Text';



type SuggestionNodeProps = {
    handleOnPress: (name: string) => void;
    title: string;
    release_date: string;
    // id: number;
};


/**
 * @component
 * a clickable option for the user to select from in the suggestion list
 */
export function SuggestionNode(props: SuggestionNodeProps) {


    return (
        <Pressable
            // id={props.id + ""}
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
                    {`\t\t`}{props.release_date}
                </Text>
            </Text>
        </Pressable>
    )
}
