import React, {Component, useRef, useState} from 'react';
import Keyboard from 'react-simple-keyboard';

import 'react-simple-keyboard/build/css/index.css';
import InputScreen from "./InputScreen";
import CustomerDetails from "./CustomerDetails";
import AddBillAmount from "./AddBillAmount";
import RedeemPoints from "./RedeemPoints";
import NavBar from "./NavBar";
import BillConfirmation from "./BillConfirmation";
import RedemptionConfirmation from "./RedemptionConfirmation";

function Index(props) {
    const [screen, setScreen] = useState('getNumber')
    const [number, setNumber] = useState('');
    const [billAmount, setBillAmount] = useState('');
    const [redeemPoints, setRedeemPoints] = useState('');

    const selectNumber=(number)=>{
        setNumber(number);
        setScreen('customerDetails')
    }

    const reset=()=>{
        setNumber('');
        setBillAmount('');
        setRedeemPoints('');
        setScreen('getNumber')
    }

    return (<div>
        <InputScreen screen={screen} selectNumber={selectNumber} defaultNumber={number} />
        <NavBar screen={screen} number={number} reset={reset} />
        <CustomerDetails screen={screen} number={number} setScreen={setScreen}/>
        <AddBillAmount screen={screen} setScreen={setScreen} setBillAmount={setBillAmount}/>
        <BillConfirmation number={number} screen={screen} setScreen={setScreen} billAmount={billAmount}/>
        <RedeemPoints screen={screen} setScreen={setScreen} setRedeemPoints={setRedeemPoints} />
        <RedemptionConfirmation number={number} screen={screen} setScreen={setScreen} redeemPoints={redeemPoints}/>
    </div>)

}

export default Index;
