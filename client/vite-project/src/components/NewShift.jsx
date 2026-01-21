import React from 'react'
import UserDetails from './UserDetails'
import { useState, useEffect } from 'react';
import axios from 'axios';


const SHIFTS_URL = 'http://localhost:3000/shifts';
const EMPLOYEES_URL = 'http://localhost:3000/employees';
const EMPLOYEE_SHIFTS_URL = 'http://localhost:3000/employeeShifts';


const hoursOptions = ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00",
    "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"];

const Shifts = () => {

    const [shifts, setShifts] = useState([])
    const [newShift, setNewShift] = useState({ starting_hour: "", ending_hour: "", date: new Date() })
    const [employees, setEmployees] = useState([])
    const [chosenEmployee, setChosenEmployee] = useState({ id: '' })


    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get(EMPLOYEES_URL);
            console.log("employees: ", data)
            setEmployees(data);
        };
        fetchData();
    }, []);


    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get(SHIFTS_URL);
            console.log("shifts: ", data)
            setShifts(data)
        };
        fetchData();
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault()
        debugger
        try {
            const { data } = await axios.post(`${SHIFTS_URL}/`, newShift);
            console.log("new shift: ", data)
            const id = data.split(": ")[1];
            setShifts([...shifts, newShift]);
            setNewShift({ starting_hour: "", ending_hour: "", date: new Date() })

            const employeeShift = {
                "employee_id": chosenEmployee.id,
                "shift_id": id
            }

            const { data: employeeShiftData } = await axios.post(`${EMPLOYEE_SHIFTS_URL}/`, employeeShift);
            console.log("new employee shift: ", employeeShiftData)

            alert("Shift added succefully!")
        } catch (err) {
            alert("Failed to add new shift, try again later.")
            console.log("Failed to add shift: ", err)
        }
    }


    return (
        <div style={{ border: '3px solid lightgreen' }}>
            <UserDetails />
            <h1>Create new shift</h1>

            <form onSubmit={handleSubmit}>
                <br />
                Starting hour :  <select onChange={(e) => (setNewShift({ ...newShift, starting_hour: e.target.value }))}>
                    <option>-</option>
                    {
                        hoursOptions.map((h) => <option value={h}>{h}</option>)
                    } </select>
                <br />
                Ending hour :  <select onChange={(e) => (setNewShift({ ...newShift, ending_hour: e.target.value }))}>
                    <option>-</option>
                    {
                        hoursOptions.map((h) => <option value={h}>{h}</option>)
                    } </select>

                <br />
                Date : <input
                    type="date"
                    value={newShift.date}
                    onChange={(e) => setNewShift({ ...newShift, date: e.target.value })}
                />

                <br />
                Employees :   <select onChange={(e) => setChosenEmployee({ id: e.target.value })}>
                    <option value="">Choose Employee</option>
                    {employees.map(emp => (
                        <option key={emp._id} value={emp._id}> {emp.first_name} {emp.last_name} </option>
                    ))}
                </select>

                <br />
                <br />
                <button type='submit'>Save</button>
            </form>

            <br />
            <br />
        </div>
    )
}

export default Shifts