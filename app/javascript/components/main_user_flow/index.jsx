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
import ValidateOtp from "./ValidateOtp";
import ResumeRedemptionFlow from "./ResumeRedemptionFlow";
import Congratulations from "./Congratulations";

function Index(props) {
    const [screen, setScreen] = useState('getNumber')
    const [number, setNumber] = useState('');
    const [billAmount, setBillAmount] = useState('');
    const [redeemPoints, setRedeemPoints] = useState('');
    const [maxPoints, setMaxPoints] = useState(0)
    const [redemptionFlowId, setRedemptionFlowId] = useState('');

    const selectNumber=(number)=>{
        setNumber(number);
        setScreen('customerDetails')
    }

    const reset=()=>{
        setMaxPoints(0)
        setNumber('');
        setBillAmount('');
        setRedeemPoints('');
        setScreen('getNumber')
        setRedemptionFlowId(null);
    }

    const resetTillCustomerScreen=()=>{
        setMaxPoints(0)
        setBillAmount('');
        setRedeemPoints('');
        setRedemptionFlowId(null);
        setScreen('customerDetails')
    }

    return (<div>
        <InputScreen screen={screen} selectNumber={selectNumber} defaultNumber={number} />
        <NavBar screen={screen} number={number} reset={reset} />
        <CustomerDetails screen={screen} number={number} setScreen={setScreen} setRedemptionFlowId={setRedemptionFlowId} setMaxPoints={setMaxPoints}/>
        <AddBillAmount screen={screen} setScreen={setScreen} setBillAmount={setBillAmount}/>
        <BillConfirmation number={number} screen={screen} setScreen={setScreen} billAmount={billAmount} setRedemptionFlowId={setRedemptionFlowId}/>
        <ResumeRedemptionFlow setScreen={setScreen} redemptionFlowId={redemptionFlowId} resetTillCustomerScreen={resetTillCustomerScreen} screen={screen} />
        <RedeemPoints maxPoints={maxPoints} screen={screen} setScreen={setScreen} setRedeemPoints={setRedeemPoints} />
        <RedemptionConfirmation number={number} screen={screen} setScreen={setScreen} redeemPoints={redeemPoints} redemptionFlowId={redemptionFlowId} />
        <ValidateOtp screen={screen} setScreen={setScreen} redemptionFlowId={redemptionFlowId} resetTillCustomerScreen={resetTillCustomerScreen} />
        <Congratulations screen={screen} setScreen={setScreen} redemptionFlowId={redemptionFlowId} resetTillCustomerScreen={resetTillCustomerScreen}/>
    </div>)

}

export default Index;
