import React from 'react';
import RedeemPoints from "../main_user_flow/RedeemPoints";


function Index(props) {
    return (
        <RedeemPoints maxPoints={10} screen={'redeemPoints'} setScreen={()=>{}} setRedeemPoints={()=>{}} />
    );
}

export default Index;