import React, {useCallback, useEffect, useState} from 'react';
import {AxiosInstance} from "../common/axios";
import useApi from "../common/useApi";
import Transactions from "./Transactions";
import moment from "moment";

function CustomerDetails({screen, setScreen, number, setMaxPoints}) {
    const billsApi = useCallback(()=>{
        if(screen==='customerDetails') {
            return AxiosInstance().get(`/bills.json?number=${number}`)
        }
        return Promise.resolve({data: []})
    },[screen, number]);

    const redemptionsApi = useCallback(()=>{
        if(screen==='customerDetails') {
            return AxiosInstance().get(`/redemptions.json?number=${number}`)
        }
        return Promise.resolve({data: []})
    },[screen, number]);

    const rewardsApi = useCallback(()=>{
        if(screen==='customerDetails') {
            return AxiosInstance().get(`/rewards.json?number=${number}`)
        }
        return Promise.resolve({data: []})
    },[screen, number]);

    const [billsLoaded, billsError, bills] = useApi(billsApi);
    const [redemptionsLoaded, redemptionsError, redemptions] = useApi(redemptionsApi);
    const [rewardsLoaded, rewardsError, rewards] = useApi(rewardsApi);


    if(screen!== 'customerDetails') {
        return null;
    }

    if(!billsLoaded || !redemptionsLoaded || !rewardsLoaded) {
        return null;
    }

    const totalRewards = rewards.reduce((previous, current) => {
        return previous + current.points;
    },0)

    const totalRedemptions = redemptions.reduce((previous, current) => {
        return previous + current.points;
    },0)

    const rows = redemptions.concat(bills).concat(rewards)
    rows.sort((a,b)=>moment.utc(b.created_at).diff(moment.utc(a.created_at)));

    const availablePoints = totalRewards - totalRedemptions;

    return (
        <div className="font-sans">
            <div className="w-full flex mt-2 p-1">
                <button onClick={()=>{setScreen('addBillAmount')}} className="border rounded w-1/2 p-2 mr-1 bg-transparent text-white text-center shadow text-2xl">
                    Add Bill Amount</button>
                <button onClick={()=>{
                    setMaxPoints(availablePoints);
                    setScreen('redeemPoints')}} className="border rounded w-1/2 p-2 ml-1 bg-transparent text-white text-center shadow text-2xl">
                    Redeem Points</button>
            </div>
        <div className="flex mt-2">
            <div className="w-1/2">
                <div
                    className="bg-white border-dashed rounded p-6 m-1 text-gray-600">
                    <div className="flex flex-col items-center text-center">
                        <div className="flex-1">
                            <h3 className="text-3xl">{availablePoints}</h3>
                            <h5 className="text-gray-500">Total Points</h5>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-1/2">
                <div
                    className="bg-white border-dashed rounded p-6 m-1 text-gray-600">
                    <div className="flex flex-col items-center text-center">
                        <div className="flex-1">
                            <h3 className="text-3xl">{bills.length}</h3>
                            <h5 className="text-gray-500">Visits</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            <Transactions rows={rows}/>
        </div>
    );
}

export default CustomerDetails;