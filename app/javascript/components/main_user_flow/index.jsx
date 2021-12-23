import React, {Component, useRef, useState} from 'react';
import Keyboard from 'react-simple-keyboard';

import 'react-simple-keyboard/build/css/index.css';
import InputScreen from "./InputScreen";
import CustomerDetails from "./CustomerDetails";
import AddBillAmount from "./AddBillAmount";
import RedeemPoints from "./RedeemPoints";
import NavBar from "./NavBar";

function Index(props) {
    const [screen, setScreen] = useState('customerDetails')
    const [number, setNumber] = useState('9865330003');

    const selectNumber=(number)=>{
        setNumber(number);
        setScreen('customerDetails')
    }

    const reset=()=>{
        setNumber('-');
        setScreen('getNumber')
    }

    return (<div>
        <InputScreen screen={screen} selectNumber={selectNumber} defaultNumber={number} />
        <NavBar screen={screen} number={number} reset={reset} />
        <CustomerDetails screen={screen} number={number} setScreen={setScreen}/>
        <AddBillAmount screen={screen} setScreen={setScreen} />
        <RedeemPoints screen={screen} setScreen={setScreen} maxPoints={100} />
    </div>)

}

export default Index;
