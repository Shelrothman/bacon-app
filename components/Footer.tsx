import { Button } from 'react-native'

import { useAppContext } from '../contexts/AppContext'

export default function Footer() {

    const { setSquareState } = useAppContext();
    // TODO: the settings thing into pull up menu


    return (
        <>
            <Button title='reset' onPress={() => setSquareState && setSquareState('movieInput')} />
            <Button title='Info' onPress={() => console.log('hi this to take option to get info for current actor/movie')} />
            <Button title='Back' onPress={() => console.log('go back to previous square state')} />
        </>
    )
}