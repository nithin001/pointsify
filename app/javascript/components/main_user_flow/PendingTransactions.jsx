import * as React from 'react';
import moment from "moment";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function PendingTransactions({rows, setScreen, setRedemptionFlowId}) {
    if(rows.length ===0){
        return null;
    }

    return (
        <div
        className="mt-2 p-1">
            <TableContainer component={Paper} className="w-full">
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Pending Transactions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={`${row.id}`}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" className="flex justify-between">
                                    <span>
                                        Bill Amount: {row.bill_amount ? parseInt(row.bill_amount).toLocaleString('en-IN', {
                                            maximumFractionDigits: 2,
                                            style: 'currency',
                                            currency: 'INR'
                                        }) : ''}<br/>
                                        Points: {row.redemption_amount || '0'}<br/>
                                        {moment(row.created_at).format('DD-MM-YYYY')}
                                    </span>
                                    <button
                                        onClick={()=>{
                                            setRedemptionFlowId(row.id);
                                            setScreen('resumeRedemptionFlow');
                                        }}
                                        className="btn btn-default border border-gray-300 text-right text-green-600">
                                        Continue
                                    </button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>

    );
}
