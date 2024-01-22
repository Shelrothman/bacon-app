import { useState } from 'react';
import { View, Text, Switch } from 'react-native';
import { container_style, text_style } from '../../styles';

import { useAppContext } from '../../contexts/AppContext';

export function ActorMovieSwitch() {

    const [ isEnabled, setIsEnabled ] = useState(false);
    /* 
        isEnabled = true -> search by actor
        isEnabled = false -> search by movie
    */
    const { squareState, setSquareState } = useAppContext();

    // const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState);
        if (squareState === 'movieInput') {
            return setSquareState!('actorInput');
        }
        return setSquareState!('movieInput');
    }

    return (
        <View style={container_style.switchContainer}>
            <Text style={text_style.switchText}>search by actor:</Text>
            <Switch
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
            />
        </View>
    )
}