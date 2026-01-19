import { useSelector } from 'react-redux';
import UserDetails from './UserDetails';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const DEPARTMENT_URL = 'http://localhost:3000/departments';
const EMPLOYEES_URL = 'http://localhost:3000/employees';


const EditDepartment = () => {

    const navigate = useNavigate();
    const { id } = useParams();

    const [department, setDepartment] = useState({ department_name: '', manager_id: '' })
    const [departments, setDepartments] = useState([])
    const [employees, setEmployees] = useState([])
    const [employeesCombo, setEmployeesCombo] = useState([])
    const [selectedEmployee, setSelectedEmployee] = useState([])
    const [updatedEmployee, setUpdatedEmployee] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            console.log("id: ", id)

            const { data } = await axios.get(`${DEPARTMENT_URL}/${id}`);
            console.log("department: ", data)
            setDepartment(data);
        };
        fetchData();
    }, []);


    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get(EMPLOYEES_URL);
            // console.log("employees: ", data)
            setEmployees(data);
        };
        fetchData();
    }, []);


    useEffect(() => {
        const employeesFiltered = employees.filter(emp => emp.department_id !== id);
        setEmployeesCombo(employeesFiltered);
    }, [employees, id]);


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.put(`${DEPARTMENT_URL}/${id}`, department);
            console.log("updated department details: ", department)
            alert("Department updated succefully!")
        } catch (err) {
            alert("Failure")
            console.log("Failed to updated: ", err)
        }

    }

    const handleDeleteClick = async () => {
        try {
            const {data} = await axios.delete(`${DEPARTMENT_URL}/${id}`);
            console.log("updated department details: ", data)
            alert("Department updated succefully!")
            navigate('/employees')
        } catch (err) {
            alert("Failure")
            console.log("Failed to updated: ", err)
        }
    }

    const handleAddClick = async () => {
        try {
            const { data } = await axios.put(`${EMPLOYEES_URL}/${selectedEmployee}`, { department_id: id });
            alert("Employee updated succefully!")
        } catch (err) {
            alert("Failure")
            console.log("Failed to updated: ", err)
        }
    }

    const handleChosenEmpOnChange = (e) => {
        // console.log(e.target.value)
        setSelectedEmployee(e.target.value)
    }

    return (
        <div style={{ border: '3px solid magenta' }}>
            <UserDetails />

            <h1>Edit department</h1>

            <form onSubmit={handleSubmit}>

                <br />
                Department ID: <input type="text" value={id} readOnly /><br />
                Department Name: <input onChange={(e) => setDepartment({ ...department, department_name: e.target.value })} type="text" value={department.department_name} /> <br />
                Manager Name: <input onChange={(e) => setDepartment({ ...department, manger_id: e.target.value })} type="text" value={department.manger_id} /> <br />


                <br />
                <button type="submit">Update Department</button>

            </form>
            <br />



            <select onChange={handleChosenEmpOnChange}>
                <option value="">Employees</option>
                {employeesCombo.map(emp => (
                    <option key={emp._id} value={emp._id}> {emp.first_name} {emp.last_name} </option>
                ))}
            </select>
            <br />
            <br />
            Add Selected Employee to this department
            <br />
            <button onClick={handleAddClick}>Add</button>

            <br />
            <br />
            <br />
            <br />

            <button onClick={handleDeleteClick}>Delete Depratment</button> (Cannot be undone!)
            <br />
            <br />




        </div>
    )
}

export default EditDepartment