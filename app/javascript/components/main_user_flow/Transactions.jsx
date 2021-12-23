import * as React from 'react';
import moment from "moment";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function Transactions({rows}) {
    return (
        <div
        className="mt-2 p-1">
            <TableContainer component={Paper} className="w-full">
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Transaction</TableCell>
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
                                    {row.type === 'Bill' ? `Bill added on ` : `Points redeemed on `}
                                    {moment(row.created_at).format('DD-MM-YYYY')}
                                </span>
                                {row.type === 'Bill' ? <span className="text-right text-green-600">+{row.amount}</span> :
                                    <span className="text-right text-red-600">-{row.points}</span>}

                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>

    );
}
