import React, {Component, useEffect, useRef, useState} from 'react';
import Keyboard from 'react-simple-keyboard';

import 'react-simple-keyboard/build/css/index.css';

function InputScreen({ screen, selectNumber, defaultNumber }) {
    const keyboardRef = useRef(null);
    const [number, setNumber] = useState('-')

    useEffect(()=>{
        setNumber(defaultNumber)
    },[defaultNumber])

    const onChange = (input) => {
        if(input.indexOf('clear')>=0) {
            setNumber('-');
            keyboardRef.current.clearInput();
        } else {
            setNumber(input);
        }
    }

    if(screen!== 'getNumber') {
        return null;
    }

    return (
        <div className="mt-2 font-display">
            <Keyboard keyboardRef={r => (keyboardRef.current = r)}
                      layout={{
                          default: ["1 2 3", "4 5 6", "7 8 9", "0 {bksp} clear"],
                      }}
                      theme={"hg-theme-default hg-layout-numeric numeric-theme"}
                      onChange={onChange}
            />
            <button onClick={()=>{
                selectNumber(number);
            }} className="w-full text-3xl border rounded mt-2 p-3 bg-gray-200 text-center shadow">{number}</button>
        </div>
    );
}

export default InputScreen;
