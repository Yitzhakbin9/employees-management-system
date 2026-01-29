import React from 'react'
import UserDetails from './UserDetails'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import {
    Container,
    Paper,
    Typography,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Box
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';


const SHIFTS_URL = 'http://localhost:3000/shifts';
const EMPLOYEES_URL = 'http://localhost:3000/employees';
const EMPLOYEE_SHIFTS_URL = 'http://localhost:3000/employeeShifts';


const hoursOptions = ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00",
    "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"];

const Shifts = () => {

    const dispatch = useDispatch();
    const token = sessionStorage.token;

    const [shifts, setShifts] = useState([])
    const [newShift, setNewShift] = useState({ starting_hour: "", ending_hour: "", date: new Date() })
    const [employees, setEmployees] = useState([])
    const [chosenEmployee, setChosenEmployee] = useState({ id: '' })


    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get(EMPLOYEES_URL, {
                headers: { 'x-access-token': token },
            });
            console.log("employees: ", data)
            setEmployees(data);
        };
        fetchData();
    }, []);


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


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post(`${SHIFTS_URL}/`, newShift, {
                headers: { 'x-access-token': token },
            });
            console.log("new shift: ", data)
            const id = data.split(": ")[1];
            setShifts([...shifts, newShift]);
            setNewShift({ starting_hour: "", ending_hour: "", date: new Date() })

            const employeeShift = {
                "employee_id": chosenEmployee.id,
                "shift_id": id
            }

            const { data: employeeShiftData } = await axios.post(`${EMPLOYEE_SHIFTS_URL}/`, employeeShift, {
                headers: { 'x-access-token': token },
            });
            console.log("new employee shift: ", employeeShiftData)

            dispatch({ type: 'ACTIONS' });
            alert("Shift added succefully!")
        } catch (err) {
            alert("Failed to add new shift, try again later.")
            console.log("Failed to add shift: ", err)
        }
    }


    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <UserDetails />

            <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Create New Shift
                </Typography>

                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <FormControl fullWidth margin="normal" required>
                        <InputLabel>Starting Hour</InputLabel>
                        <Select
                            label="Starting Hour"
                            value={newShift.starting_hour}
                            onChange={(e) => setNewShift({ ...newShift, starting_hour: e.target.value })}
                        >
                            <MenuItem value="">-</MenuItem>
                            {hoursOptions.map((h) => (
                                <MenuItem key={h} value={h}>{h}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl fullWidth margin="normal" required>
                        <InputLabel>Ending Hour</InputLabel>
                        <Select
                            label="Ending Hour"
                            value={newShift.ending_hour}
                            onChange={(e) => setNewShift({ ...newShift, ending_hour: e.target.value })}
                        >
                            <MenuItem value="">-</MenuItem>
                            {hoursOptions.map((h) => (
                                <MenuItem key={h} value={h}>{h}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <TextField
                        fullWidth
                        label="Date"
                        type="date"
                        variant="outlined"
                        margin="normal"
                        value={newShift.date}
                        onChange={(e) => setNewShift({ ...newShift, date: e.target.value })}
                        InputLabelProps={{ shrink: true }}
                        required
                    />

                    <FormControl fullWidth margin="normal" required>
                        <InputLabel>Employee</InputLabel>
                        <Select
                            label="Employee"
                            value={chosenEmployee.id}
                            onChange={(e) => setChosenEmployee({ id: e.target.value })}
                        >
                            <MenuItem value="">Choose Employee</MenuItem>
                            {employees.map(emp => (
                                <MenuItem key={emp._id} value={emp._id}>
                                    {emp.first_name} {emp.last_name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <Box sx={{ mt: 3 }}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            startIcon={<SaveIcon />}
                            fullWidth
                        >
                            Save
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Container>
    )
}

export default Shifts