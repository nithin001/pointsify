import React from 'react';
import axios from 'axios';
import {AxiosInstance} from "../common/axios";

function RedemptionConfirmation({screen, setScreen, number, redeemPoints}) {
    if(screen!== 'redeemConfirmation') {
        return null;
    }

    const redeemPointsApi = () => {
        AxiosInstance().post(`/redemptions.json`, {
            phone_number: number,
            points: redeemPoints
        }).then(_ => {
            setScreen('customerDetails');
        })
    }

    return (
        <>
        <div
            className="w-full bg-white border-dashed rounded p-6 m-1 text-gray-600">
            <div className="flex flex-col items-center text-center">
                <div className="flex-1">
                    <h3 className="text-2xl">Confirm?<br/>
                        <span className="font-bold text-3xl">{redeemPoints}</span></h3>
                </div>
            </div>
        </div>
            <div className="w-full flex mt-2 p-1">
                <button onClick={()=>{setScreen('addBillAmount')}} className="border rounded w-1/2 p-2 mr-1 bg-transparent text-white text-center shadow text-2xl">
                    No</button>
                <button onClick={redeemPointsApi} className="border rounded w-1/2 p-2 ml-1 bg-transparent text-white text-center shadow text-2xl">
                    Yes</button>
            </div>
        </>
    );
}

export default RedemptionConfirmation;