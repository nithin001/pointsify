import React, {Component, useEffect, useRef, useState} from 'react';
import Keyboard from 'react-simple-keyboard';

import 'react-simple-keyboard/build/css/index.css';
import {AxiosInstance} from "../common/axios";

function ValidateOtp({ screen, setScreen, resetTillCustomerScreen, redemptionFlowId }) {
    const keyboardRef = useRef(null);
    const [number, setNumber] = useState('')
    const [error, setError] = useState(false);

    useEffect(()=>{
        setNumber('');
        setError(false);
    },[redemptionFlowId])

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
    const selectNumber = () => {
        setError(false);
        AxiosInstance().patch(`/redemption_flows/${redemptionFlowId}.json`, {
            redemption_flow:
                { current_otp: number, status: 2}
           ,
        }).then(_ => {
            setScreen('congratulations');
        }).catch((error)=>{
            setError(true);
        })
    }
    const restart = () => {
        AxiosInstance().delete(`/redemption_flows/${redemptionFlowId}.json`).then(_ => {
            resetTillCustomerScreen();
        })
    }

    if(screen !== 'validateOtp') {
        return null;
    }

    return (
        <div className="mt-2 font-sans">
            <div className="p-2 mx-auto font-sans font-medium text-left text-white">
                <p>Please enter the OTP received on customer mobile:</p>
            </div>
            {error && <div className="w-full mx-auto mt-2 mb-4">
                <div className="notice bg-transparent border-2 border-red-300 rounded">
                    <div className="container p-4 mx-auto font-sans font-medium text-center text-white">
                        Invalid OTP. Please try again.
                    </div>
                </div>
            </div>}
            <div className="flex p-1">
                <input
                    className="w-3/4 text-2xl border rounded mt-2 mr-2 p-2 bg-white"
                    type="number"
                    value={number}
                    onChange={event => onChange(event.target.value, null,true)}
                />
                <button onClick={()=>{selectNumber(number)}} className="w-1/4 ml-2 mt-2 text-2xl border rounded p-2 bg-transparent text-white text-center shadow">GO</button>

            </div>
                        <Keyboard keyboardRef={r => (keyboardRef.current = r)}
                      layout={{
                          default: ["1 2 3", "4 5 6", "7 8 9", "0 {bksp} clear"],
                      }}
                      theme={"hg-theme-default hg-layout-numeric numeric-theme mt-2 bg-transparent"}
                      onChange={onChange}
                      preventMouseDownDefault
                                  autoUseTouchEvents
                                  disableButtonHold
                                  disableCaretPositioning
                                  useButtonTag={false}

            />
            <div className="flex p-1">
                <button onClick={()=>{restart();}} className="text-2xl w-full mr-1 border rounded p-2 bg-transparent text-white text-center shadow">Restart</button>
                <button onClick={()=>{resetTillCustomerScreen();}} className="text-2xl w-full ml-1 border rounded p-2 bg-transparent text-white text-center shadow">Cancel</button>
            </div>
        </div>
    );
}

export default ValidateOtp;
