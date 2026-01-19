import React from 'react'
import { useSelector } from 'react-redux';
import UserDetails from './UserDetails';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';


const DEPARTMENT_URL = 'http://localhost:3000/departments/department-with-employees';


const Department = () => {

    const navigate = useNavigate();
    const userDetails = useSelector((state) => state.userDetails);

    const [departments, setDepartments] = useState([])


    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get(DEPARTMENT_URL);
            console.log("Depratments: ", data)
            setDepartments(data);
        };
        fetchData();
    }, []);


    const handleNewDepClick = () => {
        // add redirect to “Add Department” Page
    }



    return (
        <div style={{ border: '3px solid yellow' }}>
            <UserDetails />

            <h1>Departments</h1>
            <br />

            <table border="1" cellPadding="8">
                <thead>
                    <tr>
                        <th>Department Name</th>
                        <th>Manager Name</th>
                        <th>List of employees</th>
                    </tr>
                </thead>


                <tbody>
                    {departments.map(dep => {
                        const manager = dep.employees.find(
                            emp => emp._id === dep.manager_id
                        );

                        const employees = dep.employees.filter(
                            emp => emp._id !== dep.manager_id
                        );

                        return (
                            <tr key={dep._id}>
                                <td>
                                    <Link to={`/editDepartment/${dep._id}`}>
                                        {dep.department_name}
                                    </Link>
                                </td>

                                <td>
                                    {manager
                                        ? `${manager.first_name} ${manager.last_name}`
                                        : '—'}
                                </td>

                                <td>
                                    {employees.length > 0 ? (
                                        <ul>
                                            {employees.map(emp => (
                                                <li key={emp._id}>
                                                    {emp.first_name} {emp.last_name}
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        'No employees'
                                    )}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            <br />
            <br />
            <button onClick={() => navigate('/newDepartment')}> New Department  </button>

        </div>
    )
}

export default Department