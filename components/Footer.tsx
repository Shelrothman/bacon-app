import { Button } from 'react-native'

import { useAppContext } from '../contexts/AppContext'

export default function Footer() {

    const { setSquareState } = useAppContext();
    // TODO: the settings thing into pull up menu


    return (
        <>
            <Button title='reset' onPress={() => setSquareState && setSquareState('movieInput')} />
            <Button title='Hi' onPress={() => console.log('hi')} />
        </>
    )
}