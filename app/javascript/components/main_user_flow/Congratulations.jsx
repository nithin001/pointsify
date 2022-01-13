import React, {useCallback} from 'react';
import {AxiosInstance} from "../common/axios";
import useApi from "../common/useApi";

function Congratulations({ screen, redemptionFlowId, resetTillCustomerScreen}) {
    const redemptionFlowApi = useCallback(()=>{
        if(screen==='congratulations') {
            return AxiosInstance().get(`/redemption_flows/${redemptionFlowId}.json`)
        }
        return Promise.resolve({data: {}})
    },[screen, redemptionFlowId]);

    const [redemptionFlowLoaded, redemptionFlowError, redemptionFlow] = useApi(redemptionFlowApi);

    if(screen !== 'congratulations') {
        return null;
    }

    if(!redemptionFlowLoaded || redemptionFlow.status === undefined) {
        return null;
    }

    if(redemptionFlow.status === 'unverified' || redemptionFlow.status === 'get_otp') {
        return (<div>
            <h1 className="mx-auto text-white text-center text-3xl mt-4">This is a pending transaction!</h1>
            <div className="flex p-1">
                <button onClick={()=>{resetTillCustomerScreen();}} className="text-2xl w-full mt-4 border rounded p-2 bg-transparent text-white text-center shadow">Go Back</button>
            </div>
        </div>)
    }

    const billAmount = redemptionFlow.bill_amount ? parseInt(redemptionFlow.bill_amount) : 0;
    const pointsRedeemed = redemptionFlow.status === 'redeem_points' && redemptionFlow.redemption_amount ? parseInt(redemptionFlow.redemption_amount) : 0;
    const formattedAmount = billAmount.toLocaleString('en-IN', {
        maximumFractionDigits: 2,
        style: 'currency',
        currency: 'INR'
    });
    const formattedTotal = (billAmount - pointsRedeemed).toLocaleString('en-IN', {
        maximumFractionDigits: 2,
        style: 'currency',
        currency: 'INR'
    });

    const rewards = redemptionFlow.transactions.filter(transaction=>transaction.type === 'Reward')
    const pointsAdded = rewards.length > 0 ? parseInt(rewards[0].amount) : 0;
    return (
        <div>
           <h1 className="mx-auto text-white text-center text-3xl mt-4">Congratulations!</h1>
            <table className="min-w-full divide-y divide-gray-200 mt-4 rounded">
                <thead className="bg-gray-50 rounded">
                <tr>
                    <th scope="col"
                        colSpan="2"
                        className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Transaction Details
                    </th>
                </tr>
                </thead>
                <tbody className="bg-white">
                    <tr >
                        <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                            Bill Amount
                        </td>
                        <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500 text-right">
                            {formattedAmount}
                        </td>
                    </tr>
                    <tr className="bg-gray-50">
                        <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                            Points Redeemed
                        </td>
                        <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500 text-right">
                            {pointsRedeemed}
                        </td>
                    </tr>
                    <tr className="bg-gray-200">
                        <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                            Total
                        </td>
                        <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500 text-right">
                            {formattedTotal}
                        </td>
                    </tr>
                    <tr className="bg-gray-100">
                        <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                            Points added for this bill
                        </td>
                        <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500 text-right">
                            {pointsAdded}
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className="flex p-1">
                <button onClick={()=>{resetTillCustomerScreen();}} className="text-2xl w-full mt-4 border rounded p-2 bg-transparent text-white text-center shadow">Restart</button>
            </div>
        </div>
    );
}

export default Congratulations;