import React from 'react'
import UserDetails from './UserDetails'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';


const SHIFTS_URL = 'http://localhost:3000/shifts';


const hoursOptions = ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00",
    "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"];

const Shifts = () => {

    const dispatch = useDispatch();
    const [shifts, setShifts] = useState([])


    useEffect(() => {
        const fetchData = async () => {
            
            const token = sessionStorage.token; 

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
        <div style={{ border: '3px solid lightgreen' }}>
            <UserDetails />
            <h1>Shifts Page</h1>

            <table border="1" cellPadding="8">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Start</th>
                        <th>End</th>
                    </tr>
                </thead>

                <tbody>
                    {shifts.map(shift => (
                        <tr key={shift._id}>
                            <td>
                                {new Date(shift.date).toLocaleDateString()}
                            </td>
                            <td>
                                {shift.starting_hour}
                            </td>
                            <td>
                                {shift.ending_hour}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <br />
            <br />
            <br />
        </div>
    )
}

export default Shifts