import React from 'react';
import {AxiosInstance} from "../common/axios";

function ResumeRedemptionFlow({screen, setScreen, redemptionFlowId, resetTillCustomerScreen}) {
    if(screen!== 'resumeRedemptionFlow') {
        return null;
    }

    const addBill = () => {
        AxiosInstance().patch(`/redemption_flows/${redemptionFlowId}.json`, {
            redemption_flow:
                { status: 3}
        }).then(_ => {
            setScreen('congratulations');
        })
    }

    return (
        <>
            <div
                className="w-full bg-white border-dashed rounded p-6 m-1 text-gray-600">
                <div className="flex flex-col items-center text-center">
                    <div className="flex-1">
                        <h3 className="text-2xl">Do you wish to redeem points on this bill?</h3>
                    </div>
                </div>
            </div>
            <div className="w-full flex mt-2 p-1">
                <button onClick={()=>{addBill()}} className="border rounded w-1/2 p-2 mr-1 bg-transparent text-white text-center shadow text-2xl">
                    No</button>
                <button onClick={()=>{
                    setScreen('redeemPoints');
                }} className="border rounded w-1/2 p-2 ml-1 bg-transparent text-white text-center shadow text-2xl">
                    Yes</button>
            </div>
        </>
    );
}

export default ResumeRedemptionFlow;