import UserDetails from "./UserDetails"
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';

const EMPLOYEES_URL = 'http://localhost:3000/employees';
const DEPARTMENT_URL = 'http://localhost:3000/departments';



const Employee = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = sessionStorage.token;

    const [departments, setDepartments] = useState([])
    const [employee, setEmployee] = useState(
        {
            first_name: '',
            last_name: '',
            start_year: 2000,
            department_id: '',
            role: 'employee' // we can only add employee. manager should be added directly in the DB
        })

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get(DEPARTMENT_URL, {
                headers: { 'x-access-token': token },
            });
            setDepartments(data);
        };
        fetchData();
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post(`${EMPLOYEES_URL}/`, employee, {
                headers: { 'x-access-token': token },
            });
            console.log("new employee: ", data)
            dispatch({ type: 'ACTIONS' });
            alert("Employee added succefully!")
            navigate('/employees')
        } catch (err) {
            alert("Failed to add employee, try again later.")
            console.log("Failed to add employee: ", err)
        }
    }

    const handleOnChange = (e) => {
        const chosenDep = departments.find(dep => (dep.department_name === e.target.value))
        setEmployee({ ...employee, department_id: chosenDep._id })
    }

    return (
        <div style={{ border: '3px solid green' }}>
            <UserDetails />
            <h1>Add new employee</h1>

            <form onSubmit={handleSubmit}>

                <br />
                First Name: <input onChange={(e) => setEmployee({ ...employee, first_name: e.target.value })} type="text" value={employee.first_name} /> <br />
                Last Name: <input onChange={(e) => setEmployee({ ...employee, last_name: e.target.value })} type="text" value={employee.last_name} /> <br />
                Start Year: <input onChange={(e) => setEmployee({ ...employee, start_year: +e.target.value })} type="text" value={employee.start_year} /> <br />
                Department :  <select value={departments} onChange={handleOnChange} name="department" id="department">
                    <option value="Department">Department</option>
                    {
                        departments.map((dep) => <option value={dep.department_name}>{dep.department_name}</option>)
                    }
                </select>
                <br />
                <br />

                <br />
                <button type='submit'>Save</button>
            </form>
            <br />
            <button onClick={() => navigate('/employees')}>Cancel</button>
        </div>
    )
}

export default Employee