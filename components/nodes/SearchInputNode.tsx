import { Pressable, Text } from 'react-native';

import { pressable_style } from '../../styles/PressableNode';
import { text_style } from '../../styles/Text';

type SearchInputNodeProps = {
    inputSearch: string;
    pressHandler: (name: string) => void;
};


/**
 * @component - SearchInputNode
 * the node that renders the search input field as an option to search off of.
 */
export function SearchInputNode(props: SearchInputNodeProps) {
    return (
        <Pressable
            onPress={() => props.pressHandler(props.inputSearch)}
            style={({ pressed }) => [ {
                opacity: pressed ? 0.5 : 1,
                transform: [ { scale: pressed ? 0.95 : 1 } ]
            }, pressable_style.suggestionLst ]}
        >
            <Text style={text_style.suggestionHeader}>
                Search for "{props.inputSearch}"
            </Text>
        </Pressable>
    )
}