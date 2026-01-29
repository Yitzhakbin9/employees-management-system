import React from 'react'
import UserDetails from './UserDetails'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import {
    Container,
    Paper,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Box
} from '@mui/material';


const SHIFTS_URL = 'http://localhost:3000/shifts';


const hoursOptions = ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00",
    "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"];

const Shifts = () => {

    const dispatch = useDispatch();
    const [shifts, setShifts] = useState([])
    const token = sessionStorage.token;


    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get(SHIFTS_URL, {
                headers: { 'x-access-token': token },
            });
            console.log("shifts: ", data)
            setShifts(data)
        };
        fetchData();
        dispatch({ type: 'ACTIONS' });

    }, []);


    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <UserDetails />

            <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Shifts
                </Typography>

                <TableContainer sx={{ mt: 3 }}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ bgcolor: 'primary.main' }}>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Date</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Start Time</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>End Time</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {shifts.map((shift, index) => (
                                <TableRow
                                    key={shift._id}
                                    sx={{
                                        '&:nth-of-type(odd)': { bgcolor: 'action.hover' },
                                        '&:hover': { bgcolor: 'action.selected' }
                                    }}
                                >
                                    <TableCell>
                                        {new Date(shift.date).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell>
                                        {shift.starting_hour}
                                    </TableCell>
                                    <TableCell>
                                        {shift.ending_hour}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Container>
    )
}

export default Shifts