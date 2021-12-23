import React, {Component, useRef, useState} from 'react';
import Keyboard from 'react-simple-keyboard';

import 'react-simple-keyboard/build/css/index.css';

function RedeemPoints({ screen, setScreen, maxPoints, setRedeemPoints }) {
    if(screen!== 'redeemPoints') {
        return null;
    }

    const keyboardRef = useRef(null);
    const [points, setPoints] = useState('')

    const onChange = (input, _, fromKeyboard) => {
        if(fromKeyboard!==undefined) {
            keyboardRef.current.replaceInput({default: input});
            setPoints(input);
        } else {
            if(input.indexOf('clear')>=0) {
                keyboardRef.current.clearInput();
                setPoints('');
            } else if(input.indexOf('all')>=0) {
                setPoints(maxPoints);
                keyboardRef.current.clearInput();
            } else {
                setPoints(input);
            }
        }
    }

    return (
        <div className="mt-2 font-sans">
            <div className="flex p-1">
                <input
                    className="w-3/4 text-2xl border rounded mt-2 mr-2 p-2 bg-white"
                    type="number"
                    value={points}
                    onChange={event => onChange(event.target.value, null,true)}
                />
                <button onClick={()=>{
                    setRedeemPoints(points);
                    setScreen('redeemConfirmation');
                }} className="w-1/3 ml-2 mt-2 text-2xl border rounded p-2 bg-transparent text-white text-center shadow">REDEEM</button>

            </div>

            <Keyboard keyboardRef={r => (keyboardRef.current = r)}
                      layout={{
                          default: ["1 2 3", "4 5 6", "7 8 9", "0 {bksp} clear", "all"],
                      }}
                      theme={"hg-theme-default hg-layout-numeric numeric-theme mt-2 bg-transparent"}
                      onChange={onChange}
                      preventMouseDownDefault

            />
            <div className="flex p-1">
                <button onClick={()=>{setScreen('customerDetails')
                }} className="w-full text-2xl border rounded p-2 bg-transparent text-white text-center shadow">Cancel</button>
            </div>
        </div>
    );
}

export default RedeemPoints;
