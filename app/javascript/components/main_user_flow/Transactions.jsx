import * as React from 'react';
import moment from "moment";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
const getText = ({type}) => {
    if(type==='Bill') {
        return 'Bill added on '
    } else if(type === 'Reward') {
        return 'Points added on ';
    } else {
        return 'Points redeemed on ';
    }
}
const getData = (row) => {
    const { type} = row;
    if(type==='Bill') {
        return  <span className="text-right text-green-600">+{row.amount}</span>
    } else if(type === 'Reward') {
        return <span className="text-right text-green-600">+{row.amount}</span>
    } else {
        return <span className="text-right text-red-600">-{row.amount}</span>
    }
}

export default function Transactions({rows}) {
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
                            <TableCell>Transactions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={`${row.type} + ${row.id}`}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" className="flex justify-between">
                                <span>
                                    {getText(row)}
                                    {moment(row.created_at).format('DD-MM-YYYY')}
                                </span>
                                    {getData(row)}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>

    );
}
