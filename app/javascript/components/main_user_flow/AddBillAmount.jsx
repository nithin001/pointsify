import React, {Component, useRef, useState} from 'react';
import Keyboard from 'react-simple-keyboard';

import 'react-simple-keyboard/build/css/index.css';

function AddBillAmount({ screen, setScreen, setBillAmount }) {
    if(screen!== 'addBillAmount') {
        return null;
    }

    const keyboardRef = useRef(null);
    const [amount, setAmount] = useState('')

    const onChange = (input, _, fromKeyboard) => {
        if(fromKeyboard!==undefined) {
            keyboardRef.current.replaceInput({default: input});
            setAmount(input);
        } else {
            if(input.indexOf('clear')>=0) {
                keyboardRef.current.clearInput();
                setAmount('');
            } else {
                setAmount(input);
            }
        }
    }

    return (
        <div className="mt-2 font-sans">
            <div className="flex p-1">
                <input
                    className="w-3/4 text-2xl border rounded mt-2 mr-2 p-2 bg-white"
                    type="number"
                    value={amount}
                    onChange={event => onChange(event.target.value, null,true)}
                />
                <button onClick={()=>{
                    setBillAmount(amount);
                    setScreen('billConfirmation');
                }} className="w-1/4 ml-2 mt-2 text-2xl border rounded p-2 bg-transparent text-white text-center shadow">ADD</button>

            </div>

            <Keyboard keyboardRef={r => (keyboardRef.current = r)}
                      layout={{
                          default: ["1 2 3", "4 5 6", "7 8 9", "0 {bksp} clear"],
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

export default AddBillAmount;
