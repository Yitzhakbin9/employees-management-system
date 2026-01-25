import React from 'react'
import UserDetails from './UserDetails'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

const DEPARTMENT_URL = 'http://localhost:3000/departments';

const NewDepartment = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [department, setDepartment] = useState({ department_name: '', manager_id: 0 })
    const token = sessionStorage.token;


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post(`${DEPARTMENT_URL}/`, department, {
                headers: { 'x-access-token': token },
            });
            console.log("new department: ", data)
            alert("Department added succefully!")
            dispatch({ type: 'ACTIONS' });
            navigate('/actionsPage')
        } catch (err) {
            alert("Failed to add Department, try again later.")
            console.log("Failed to add department: ", err)
        }
    }


    return (
        <div style={{ border: '3px solid cyan' }}>
            <UserDetails />
            <h1>Add new department</h1>

            <form onSubmit={handleSubmit}>
                <br />
                Department Name: <input onChange={e => setDepartment({ ...department, department_name: e.target.value })} type="text" /> <br />

                <button type="submit">Save Department</button>
                <br />
            </form>

            <button onClick={() => navigate('/actionsPage')}>Cancel</button>

        </div>
    )
}

export default NewDepartment