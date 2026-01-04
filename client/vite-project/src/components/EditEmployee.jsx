import UserDetails from "./UserDetails"
import { useState, useEffect } from 'react';
import { useParams , useNavigate} from 'react-router-dom';
import axios from 'axios';

const EMPLOYEES_URL = 'http://localhost:3000/employees';
const DEPARTMENT_URL = 'http://localhost:3000/departments';
const SHIFTS_URL = 'http://localhost:3000/shifts';
const EMPLOYEE_SHIFTS = 'http://localhost:3000/employeeShifts';
const EMPLOYEES_SHIFTS_BY_ID_URL = 'http://localhost:3000/employeeShifts';

const EditEmployee = () => {

  const navigate = useNavigate();
  const { id } = useParams();
  const [employee, setEmployee] = useState(
    {
      _id: '0',
      first_name: '',
      last_name: '',
      start_year: 0,
      department_id: ''
    })

  const [departments, setDepartments] = useState([])
  const [shiftsCombo, setShiftsCombo] = useState([])
  const [userDepartment, setUserDepartment] = useState('')
  const [chosenDepartmentID, setChosenDepartmentID] = useState('')
  const [employeeShifts, setEmployeeShifts] = useState([])
  const [selectedShift, setSelectedShift] = useState({ date: '', starting_hour: '', ending_hour: '' })


  useEffect(() => {

    const fetchData = async () => {
      const { data } = await axios.get(`${EMPLOYEES_URL}/${id}`);
      setEmployee(data)
    };

    fetchData();
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(DEPARTMENT_URL);
      setDepartments(data);
    };
    fetchData();
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(SHIFTS_URL);
      setShiftsCombo(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`${EMPLOYEES_SHIFTS_BY_ID_URL}/${id}/shifts`);
      setEmployeeShifts(data);
    }; 
    fetchData();
  }, [employeeShifts]);


  useEffect(() => {
    const userCurrentDep = departments.find(dep => (dep._id === employee.department_id))
    setUserDepartment(userCurrentDep?.department_name);
  }, [departments, employee.department_id]);



  const handleSubmit = async (e) => {
    debugger
    e.preventDefault()
    const updatedEmployee = {
      ...employee,
      department_id: chosenDepartmentID || employee.department_id
    }; // if the user didn't change the department, we send the original department

    try {
      const { data } = await axios.put(`${EMPLOYEES_URL}/${id}`, updatedEmployee);
      alert("Employee updated succefully!")
    } catch (err) {
      alert("Failure")
      console.log("Failed to updated: ", err)
    }

  }


  const handleDepartmentOnChange = (e) => {
    debugger
    const chosenDep = departments.find(dep => (dep._id === e.target.value))
    setChosenDepartmentID(chosenDep._id)
  }

  const handleShiftOnChange = (e) => {
    const selected = e.target.value
    const shiftObj = shiftsCombo.find(
      shift => shift._id === selected
    );
    // console.log("shiftObj" , shiftObj);
    setSelectedShift(shiftObj)
  }

  const handleRegisterClick = async () => {
    const { data } = await axios.post(EMPLOYEE_SHIFTS, { employee_id: id, shift_id: selectedShift._id });
    alert("Employee added succefully!")
  }

  const handleDeleteClick = async () => {
    debugger
    try {
      const { data } = await axios.delete(`${EMPLOYEES_URL}/${id}`);
      console.log(data)
      alert("Employee deleted succefully!")
      navigate('/employees')
    } catch (err) {
      console.log("Failed to delete employee: ", err)
    }
  }


  return (
    <div style={{ border: '3px solid blue' }}>
      <UserDetails />
      <h1>Edit Employee Page</h1>

      <form onSubmit={handleSubmit}>

        <br />
        Employee ID: <input type="text" value={id} readOnly /><br />
        First Name: <input onChange={(e) => setEmployee({ ...employee, first_name: e.target.value })} type="text" value={employee.first_name} /> <br />
        Last Name: <input onChange={(e) => setEmployee({ ...employee, last_name: e.target.value })} type="text" value={employee.last_name} /> <br />
        Start Year: <input onChange={(e) => setEmployee({ ...employee, start_year: +e.target.value })} type="text" value={employee.start_year} /> <br />
        Department Name: <input type="text" value={userDepartment} readOnly /> <br />
        <br />
        Change employee's department :
        <select vlaue={chosenDepartmentID} onChange={handleDepartmentOnChange} name="department" id="department">
          <option value="">Department</option>
          {
            departments.map((dep) => <option key={dep._id} value={dep._id}>{dep.department_name}</option>)
          }
        </select>
        <br />
        <br />
        <br />
        <button type='submit'>Update</button>
      </form>
      <br /> <br /> <br />


      <select onChange={handleShiftOnChange} name="shifts" id="shifts">
        <option value="shifts">shifts</option>
        {
          shiftsCombo.map((shift) =>
            <option key={shift._id} value={shift._id}>
              {`${new Date(shift.date).toLocaleDateString('he-IL')} :  ${shift.starting_hour} - ${shift.ending_hour}`}
            </option>
          )

        }
      </select>


      <button onClick={handleRegisterClick}>Register to shift</button>




      <h2>Employee's shifts</h2>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Date</th>
            <th>Starting hour</th>
            <th>Ending hour</th>
          </tr>
        </thead>
        <tbody>
          {
            employeeShifts.map(shift => (

              <tr key={shift._id}>
                <td> {new Date(shift.shift.date).toLocaleDateString('he-IL')}</td>
                <td> {shift.shift.starting_hour}</td>
                <td> {shift.shift.ending_hour}</td>
              </tr>

            ))
          }
        </tbody>
      </table>


      <br />
      <br />
      <button onClick={handleDeleteClick}>Delete Employee</button> (Cannot be undone !)

      <br />
      <br />
      <br />
    </div>
  )
}

export default EditEmployee