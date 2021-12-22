import React, {Component, useRef, useState} from 'react';
import Keyboard from 'react-simple-keyboard';

import 'react-simple-keyboard/build/css/index.css';

function AddBillAmount({ screen, setScreen }) {
    if(screen!== 'addBillAmount') {
        return null;
    }

    const keyboardRef = useRef(null);
    const [amount, setAmount] = useState(0)

    const onChange = (input) => {
        if(input.indexOf('clear')>=0) {
            setAmount(0);
            keyboardRef.current.clearInput();
        } else {
            setAmount(input);
        }
    }

    const formattedAmount = amount ? parseInt(amount).toLocaleString('en-IN', {
        maximumFractionDigits: 2,
        style: 'currency',
        currency: 'INR'
    }) : '';

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
                setAmount(amount);
            }} className="w-full text-3xl border rounded mt-2 p-3 bg-gray-200 text-center shadow">Add {formattedAmount}</button>
            <button onClick={()=>{setScreen('customerDetails')
            }} className="w-full text-3xl border rounded mt-2 p-3 bg-gray-200 text-center shadow">Cancel</button>

        </div>
    );
}

export default AddBillAmount;
