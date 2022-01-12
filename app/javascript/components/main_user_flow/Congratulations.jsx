import React, {useCallback} from 'react';
import {AxiosInstance} from "../common/axios";
import useApi from "../common/useApi";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import moment from "moment";
import TableContainer from "@mui/material/TableContainer";

function Congratulations({ screen,setScreen, redemptionFlowId, resetTillCustomerScreen}) {
    const redemptionFlowApi = useCallback(()=>{
        if(screen==='congratulations') {
            return AxiosInstance().get(`/redemption_flows/${redemptionFlowId}.json`)
        }
        return Promise.resolve({data: []})
    },[screen, redemptionFlowId]);

    const [redemptionFlowLoaded, redemptionFlowError, redemptionFlow] = useApi(redemptionFlowApi);

    if(screen !== 'congratulations') {
        return null;
    }

    if(!redemptionFlowLoaded) {
        return null;
    }

    if(redemptionFlow.status === 0 || redemptionFlow.status === 1) {
        setScreen('resumeRedemptionFlow');
        return null;
    }

    const billAmount = redemptionFlow.bill_amount ? parseInt(redemptionFlow.bill_amount) : 0;
    const pointsRedeemed = redemptionFlow.status = 2 && redemptionFlow.redemption_amount ? parseInt(redemptionFlow.redemption_amount) : 0;
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
                </tbody>
            </table>
            <div className="flex p-1">
                <button onClick={()=>{resetTillCustomerScreen();}} className="text-2xl w-full mt-4 border rounded p-2 bg-transparent text-white text-center shadow">Restart</button>
            </div>
        </div>
    );
}

export default Congratulations;