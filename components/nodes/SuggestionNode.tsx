import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable, Text } from 'react-native';
import { pressable_style } from '../../styles/PressableNode';
import { text_style } from '../../styles/Text';
import { BaconMovie } from '../../types/api';
import { InputMode } from '../../types/ui';

type SuggestionNodeProps = {
    handleOnPress: (name: string) => void;
    title: string;
    release_date?: string;
    known_for?: BaconMovie;
    inputMode: InputMode;
};

// TODO: return hwew to customize the look for the suggestion node for actorInput

/**
 * @component
 * a clickable option for the user to choose to search by
 */
export function SuggestionNode(props: SuggestionNodeProps) {
    const { handleOnPress, inputMode, title, release_date, known_for } = props;
    return (
        <Pressable
            onPress={() => handleOnPress(title)}
            style={({ pressed }) => [ {
                opacity: pressed ? 0.5 : 1,
                transform: [ { scale: pressed ? 0.95 : 1 } ]
            }, pressable_style.suggestionLst ]}
        >
            <Text>
                <Text style={text_style.suggestionTitle}>
                    {title} {`\n`}
                </Text>
                <MaterialCommunityIcons name={inputMode === InputMode.movieInput ? 'theater' : 'movie-open-star'} size={20} color="black" />
                <Text style={text_style.suggestionReleaseDate}>
                    {`\t\t`}{release_date && release_date}
                    {known_for && (known_for?.title || known_for?.name || 'no known movies')}
                </Text>
            </Text>
        </Pressable>
    )
}
