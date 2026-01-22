import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import UserDetails from "./UserDetails"
import axios from 'axios';


const EMPLOYEE_DETAILS_URL = 'http://localhost:3000/employees/full-details';
const DEPARTMENT_URL = 'http://localhost:3000/departments';


const Employees = () => {

    const userDetails = useSelector((state) => state.userDetails);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const reduceAcion =         dispatch({ type: 'ACTIONS' });

    /// TEST

    const [employees, setEmployees] = useState([])
    const [filteredByDep, setFilteredByDep] = useState([])
    const [department, setDepartment] = useState([])
    const [departments, setDepartments] = useState([])


    useEffect(() => {
        const fetchData = async () => {

            debugger
            const token = sessionStorage.token; // short for: const token = sessionStorage.getItem(token);

            const { data } = await axios.get(EMPLOYEE_DETAILS_URL, {
                headers: { 'x-access-token': token },
            });
            console.log("Employees: ", data)

            setEmployees(data)
            setFilteredByDep(data)
        };
        fetchData();

        // dispatch({ type: 'ACTIONS' });
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get(DEPARTMENT_URL);
            console.log("Depratments: ", data)
            setDepartments(data);
        };
        fetchData();
    }, []);


    useEffect(() => {
        const filterByDepratment = employees.filter((employee) =>
            employee.department?.department_name === department
        )
        setFilteredByDep(filterByDepratment)
    }, [department]);

    return (
        <div>
            <UserDetails />
            <h1>Employees Page</h1>

            <table border="1" cellPadding="8">
                <thead>
                    <tr>
                        <th>Full Name</th>
                        <th>Department</th>
                        <th>Shifts</th>
                    </tr>
                </thead>

                <tbody>
                    {filteredByDep.map(emp => (
                        <tr key={emp._id}>
                            <td>
                                <Link to={`/editEmployee/${emp._id}`}>{`${emp.first_name} ${emp.last_name}`} </Link>
                            </td>


                            <td>
                                <Link to={`/editDepartment/${emp.department_id}`}>{emp.department?.department_name} </Link>
                            </td>


                            <td>
                                <ul>
                                    {emp.shifts?.map(shift => (
                                        <li key={shift._id}>
                                            {`${new Date(shift.date).toLocaleDateString('he-IL')} :  ${shift.starting_hour} - ${shift.ending_hour}`}
                                        </li>
                                    ))}
                                </ul>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <br />
            <br />
            <br />


            <button onClick={() => navigate('/newEmployee')}>Add New Employee</button>
            <br />
            <br />
            <br />


            <select onChange={e => setDepartment(e.target.value)} defaultValue="" name="department" id="department">
                <option value="Choose department">Choose department</option>
                {
                    departments.map((dep) => <option value={dep.department_name}>{dep.department_name}</option>)
                }
            </select>


            <br />
            <br />
            <br />
        </div>
    )
}

export default Employees