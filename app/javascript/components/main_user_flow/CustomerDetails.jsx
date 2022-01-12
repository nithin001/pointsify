import React, {useCallback, useEffect, useState} from 'react';
import {AxiosInstance} from "../common/axios";
import useApi from "../common/useApi";
import Transactions from "./Transactions";
import moment from "moment";
import PendingTransactions from "./PendingTransactions";

function CustomerDetails({screen, setScreen, number, setMaxPoints, setRedemptionFlowId}){
    const transactionsApi = useCallback(()=>{
        if(screen==='customerDetails') {
            return AxiosInstance().get(`/transactions.json?number=${number}`)
        }
        return Promise.resolve({data: []})
    },[screen, number]);


    const redemptionsFlowApi = useCallback(()=>{
        if(screen==='customerDetails') {
            return AxiosInstance().get(`/redemption_flows.json?number=${number}`)
        }
        return Promise.resolve({data: []})
    },[screen, number]);

    const [transactionsLoaded, transactionsError, transactions] = useApi(transactionsApi);
    const [redemptionFlowsLoaded, redemptionFlowsError, redemptionFlows] = useApi(redemptionsFlowApi);

    if(screen!== 'customerDetails') {
        return null;
    }

    if(!transactionsLoaded || !redemptionFlowsLoaded) {
        return null;
    }

    const totalRewards = transactions.reduce((previous, current) => {
        if(current.type !== 'Reward') {
            return previous;
        }

        return previous + current.amount;
    },0)

    const totalRedemptions = transactions.reduce((previous, current) => {
        if(current.type !== 'Redemption') {
            return previous;
        }

        return previous + current.amount;
    },0)

    transactions.sort((a,b)=>moment.utc(b.created_at).diff(moment.utc(a.created_at)));
    const visitCount = transactions.filter(transaction=>transaction.type==='Bill').length;
    const availablePoints = totalRewards - totalRedemptions;

    return (
        <div className="font-sans">
            <div className="w-full flex mt-2 p-1">
                <button onClick={()=>{setScreen('addBillAmount')}} className="border rounded w-full p-2 mr-1 bg-transparent text-white text-center shadow text-2xl">
                    Add Bill Amount</button>
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
                            <h3 className="text-3xl">{visitCount}</h3>
                            <h5 className="text-gray-500">Visits</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            <PendingTransactions rows={redemptionFlows} setScreen={setScreen} setRedemptionFlowId={setRedemptionFlowId}/>
            <Transactions rows={transactions}/>
        </div>
    );
}

export default CustomerDetails;