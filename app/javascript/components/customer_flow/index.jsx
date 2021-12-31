import React, {useState} from 'react';
import InputScreen from "../main_user_flow/InputScreen";

function Index(props) {
    const [screen, setScreen] = useState('getNumber')
    const [number, setNumber] = useState('');

    const selectNumber = (val) => {
        setNumber(val);
        setScreen('whatCanYouDo');
    }
    return (
        <>
            <p className="ml-2 text-3xl font-bold text-white">What is your mobile number?</p>
            <InputScreen screen={screen} selectNumber={selectNumber} />
        </>
    );
}

export default Index;