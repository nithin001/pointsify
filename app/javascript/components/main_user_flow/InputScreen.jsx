import React, {Component, useEffect, useRef, useState} from 'react';
import Keyboard from 'react-simple-keyboard';

import 'react-simple-keyboard/build/css/index.css';

function InputScreen({ screen, selectNumber, defaultNumber }) {
    const keyboardRef = useRef(null);
    const [number, setNumber] = useState('')

    useEffect(()=>{
        setNumber(defaultNumber)
    },[defaultNumber])

    const onChange = (input, _, fromKeyboard) => {
        if(fromKeyboard!==undefined) {
            keyboardRef.current.replaceInput({default: input});
            setNumber(input);
        } else {
            if(input.indexOf('clear')>=0) {
                keyboardRef.current.clearInput();
                setNumber('');
            } else {
                setNumber(input);
            }
        }
    }

    if(screen!== 'getNumber') {
        return null;
    }

    return (
        <div className="mt-2 font-sans">
            <div className="flex p-1">
                <input
                    className="w-3/4 text-2xl border rounded mt-2 mr-2 p-2 bg-white"
                    type="number"
                    value={number}
                    onChange={event => onChange(event.target.value, null,true)}
                    autoFocus
                />
                <button onClick={()=>{selectNumber(number)}} className="w-1/4 ml-2 text-2xl border rounded mt-2 p-2 bg-transparent text-white text-center shadow">GO</button>

            </div>
                        <Keyboard keyboardRef={r => (keyboardRef.current = r)}
                      layout={{
                          default: ["1 2 3", "4 5 6", "7 8 9", "0 {bksp} clear"],
                      }}
                      theme={"hg-theme-default hg-layout-numeric numeric-theme mt-2 bg-transparent"}
                      onChange={onChange}
                      preventMouseDownDefault
                //           buttonTheme={[
                // {
                //     class: "font-sans",
                //     buttons: "1 2 3 4 5 6 7 8 9 0 {bksp} clear"
                // }]}
            />
        </div>
    );
}

export default InputScreen;
