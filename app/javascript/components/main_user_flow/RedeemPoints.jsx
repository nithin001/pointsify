import React, {Component, useRef, useState} from 'react';
import Keyboard from 'react-simple-keyboard';

import 'react-simple-keyboard/build/css/index.css';

function RedeemPoints({ screen, setScreen, maxPoints }) {
    if(screen!== 'redeemPoints') {
        return null;
    }
    const keyboardRef = useRef(null);
    const [points, setPoints] = useState()

    const onChange = (input) => {
        if(input.indexOf('clear')>=0) {
            setPoints();
            keyboardRef.current.clearInput();
        } else if(input.indexOf('all')>=0) {
            setPoints(maxPoints);
            keyboardRef.current.clearInput();
        } else {
            setPoints(input);
        }
    }

    const formattedPoints = points ? `${points} points` : '';
    return (
        <div className="mt-2 font-sans">
            <Keyboard keyboardRef={r => (keyboardRef.current = r)}
                      layout={{
                          default: ["1 2 3", "4 5 6", "7 8 9", "0 {bksp} clear", "all"],
                      }}
                      theme={"hg-theme-default hg-layout-numeric numeric-theme"}
                      onChange={onChange}
            />
            <button onClick={()=>{
                setPoints(points);
            }} className="w-full text-3xl border rounded mt-2 p-3 bg-gray-200 text-center shadow">Redeem {formattedPoints}</button>
            <button onClick={()=>{setScreen('customerDetails')
            }} className="w-full text-3xl border rounded mt-2 p-3 bg-gray-200 text-center shadow">Cancel</button>
        </div>
    );
}

export default RedeemPoints;
