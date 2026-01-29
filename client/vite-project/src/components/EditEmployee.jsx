import UserDetails from "./UserDetails"
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
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
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Divider,
  Alert
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const EMPLOYEES_URL = 'http://localhost:3000/employees';
const DEPARTMENT_URL = 'http://localhost:3000/departments';
const SHIFTS_URL = 'http://localhost:3000/shifts';
const EMPLOYEE_SHIFTS = 'http://localhost:3000/employeeShifts';
const EMPLOYEES_SHIFTS_BY_ID_URL = 'http://localhost:3000/employeeShifts';

const EditEmployee = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = sessionStorage.token;
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
      const { data } = await axios.get(`${EMPLOYEES_URL}/${id}`, {
        headers: { 'x-access-token': token },
      });
      setEmployee(data)
    };

    fetchData();
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(DEPARTMENT_URL, {
        headers: { 'x-access-token': token },
      });
      setDepartments(data);
    };
    fetchData();
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(SHIFTS_URL, {
        headers: { 'x-access-token': token },
      });
      setShiftsCombo(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`${EMPLOYEES_SHIFTS_BY_ID_URL}/${id}/shifts`, {
        headers: { 'x-access-token': token },
      });
      setEmployeeShifts(data);
    };
    fetchData();
  }, [employeeShifts]);


  useEffect(() => {
    const userCurrentDep = departments.find(dep => (dep._id === employee.department_id))
    setUserDepartment(userCurrentDep?.department_name);
  }, [departments, employee.department_id]);



  const handleSubmit = async (e) => {
    e.preventDefault()
    const updatedEmployee = {
      ...employee,
      department_id: chosenDepartmentID || employee.department_id
    };

    try {
      const { data } = await axios.put(`${EMPLOYEES_URL}/${id}`, updatedEmployee, {
        headers: { 'x-access-token': token },
      });
      dispatch({ type: 'ACTIONS' });
      alert("Employee updated succefully!")
      navigate('/employees')
    } catch (err) {
      alert("Failure")
      console.log("Failed to updated: ", err)
    }

  }


  const handleDepartmentOnChange = (e) => {
    const chosenDep = departments.find(dep => (dep._id === e.target.value))
    setChosenDepartmentID(chosenDep._id)
  }

  const handleShiftOnChange = (e) => {
    const selected = e.target.value
    const shiftObj = shiftsCombo.find(
      shift => shift._id === selected
    );
    setSelectedShift(shiftObj)
  }

  const handleRegisterClick = async () => {
    const { data } = await axios.post(EMPLOYEE_SHIFTS, { employee_id: id, shift_id: selectedShift._id }, {
      headers: { 'x-access-token': token },
    });
    dispatch({ type: 'ACTIONS' });
    alert("Employee added succefully!")
  }

  const handleDeleteClick = async () => {
    try {
      const { data } = await axios.delete(`${EMPLOYEES_URL}/${id}`, {
        headers: { 'x-access-token': token },
      });
      console.log(data)
      alert("Employee deleted succefully!")
      navigate('/employees')
    } catch (err) {
      console.log("Failed to delete employee: ", err)
    }
  }


  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <UserDetails />

      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Edit Employee
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            fullWidth
            label="Employee ID"
            variant="outlined"
            margin="normal"
            value={id}
            disabled
          />

          <TextField
            fullWidth
            label="First Name"
            variant="outlined"
            margin="normal"
            value={employee.first_name}
            onChange={(e) => setEmployee({ ...employee, first_name: e.target.value })}
            required
          />

          <TextField
            fullWidth
            label="Last Name"
            variant="outlined"
            margin="normal"
            value={employee.last_name}
            onChange={(e) => setEmployee({ ...employee, last_name: e.target.value })}
            required
          />

          <TextField
            fullWidth
            label="Start Year"
            type="number"
            variant="outlined"
            margin="normal"
            value={employee.start_year}
            onChange={(e) => setEmployee({ ...employee, start_year: +e.target.value })}
            required
          />

          <TextField
            fullWidth
            label="Current Department"
            variant="outlined"
            margin="normal"
            value={userDepartment}
            disabled
          />

          <FormControl fullWidth margin="normal">
            <InputLabel>Change Department</InputLabel>
            <Select
              label="Change Department"
              value={chosenDepartmentID}
              onChange={handleDepartmentOnChange}
            >
              <MenuItem value="">Select Department</MenuItem>
              {departments.map((dep) => (
                <MenuItem key={dep._id} value={dep._id}>
                  {dep.department_name}
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
              Update Employee
            </Button>
          </Box>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h5" gutterBottom>
          Assign Shift
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mt: 2 }}>
          <FormControl fullWidth>
            <InputLabel>Select Shift</InputLabel>
            <Select
              label="Select Shift"
              onChange={handleShiftOnChange}
            >
              <MenuItem value="">Select Shift</MenuItem>
              {shiftsCombo.map((shift) => (
                <MenuItem key={shift._id} value={shift._id}>
                  {`${new Date(shift.date).toLocaleDateString('he-IL')} : ${shift.starting_hour} - ${shift.ending_hour}`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleRegisterClick}
            sx={{ minWidth: 200 }}
          >
            Register
          </Button>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h5" gutterBottom>
          Employee's Shifts
        </Typography>

        <TableContainer sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: 'primary.main' }}>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Date</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Starting Hour</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Ending Hour</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employeeShifts.map((shift, index) => (
                <TableRow
                  key={shift._id}
                  sx={{
                    '&:nth-of-type(odd)': { bgcolor: 'action.hover' },
                    '&:hover': { bgcolor: 'action.selected' }
                  }}
                >
                  <TableCell>{new Date(shift.shift.date).toLocaleDateString('he-IL')}</TableCell>
                  <TableCell>{shift.shift.starting_hour}</TableCell>
                  <TableCell>{shift.shift.ending_hour}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Divider sx={{ my: 4 }} />

        <Alert severity="warning" sx={{ mb: 2 }}>
          Warning: Deleting an employee cannot be undone!
        </Alert>

        <Button
          variant="contained"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={handleDeleteClick}
          fullWidth
        >
          Delete Employee
        </Button>
      </Paper>
    </Container>
  )
}

export default EditEmployee

//   }


// const handleDepartmentOnChange = (e) => {
//   const chosenDep = departments.find(dep => (dep._id === e.target.value))
//   setChosenDepartmentID(chosenDep._id)
// }

// const handleShiftOnChange = (e) => {
//   const selected = e.target.value
//   const shiftObj = shiftsCombo.find(
//     shift => shift._id === selected
//   );
//   // console.log("shiftObj" , shiftObj);
//   setSelectedShift(shiftObj)
// }

// const handleRegisterClick = async () => {
//   const { data } = await axios.post(EMPLOYEE_SHIFTS, { employee_id: id, shift_id: selectedShift._id }, {
//     headers: { 'x-access-token': token },
//   });
//   dispatch({ type: 'ACTIONS' });
//   alert("Employee added succefully!")
// }

// const handleDeleteClick = async () => {
//   try {
//     const { data } = await axios.delete(`${EMPLOYEES_URL}/${id}`, {
//       headers: { 'x-access-token': token },
//     });
//     console.log(data)
//     alert("Employee deleted succefully!")
//     navigate('/employees')
//   } catch (err) {
//     console.log("Failed to delete employee: ", err)
//   }
// }


// return (
//   <div style={{ border: '3px solid blue' }}>
//     <UserDetails />
//     <h1>Edit Employee Page</h1>

//     <form onSubmit={handleSubmit}>

//       <br />
//       Employee ID: <input type="text" value={id} readOnly /><br />
//       First Name: <input onChange={(e) => setEmployee({ ...employee, first_name: e.target.value })} type="text" value={employee.first_name} /> <br />
//       Last Name: <input onChange={(e) => setEmployee({ ...employee, last_name: e.target.value })} type="text" value={employee.last_name} /> <br />
//       Start Year: <input onChange={(e) => setEmployee({ ...employee, start_year: +e.target.value })} type="text" value={employee.start_year} /> <br />
//       Department Name: <input type="text" value={userDepartment} readOnly /> <br />
//       <br />
//       Change employee's department :
//       <select vlaue={chosenDepartmentID} onChange={handleDepartmentOnChange} name="department" id="department">
//         <option value="">Department</option>
//         {
//           departments.map((dep) => <option key={dep._id} value={dep._id}>{dep.department_name}</option>)
//         }
//       </select>
//       <br />
//       <br />
//       <br />
//       <button type='submit'>Update</button>
//     </form>
//     <br /> <br /> <br />


//     <select onChange={handleShiftOnChange} name="shifts" id="shifts">
//       <option value="shifts">shifts</option>
//       {
//         shiftsCombo.map((shift) =>
//           <option key={shift._id} value={shift._id}>
//             {`${new Date(shift.date).toLocaleDateString('he-IL')} :  ${shift.starting_hour} - ${shift.ending_hour}`}
//           </option>
//         )

//       }
//     </select>


//     <button onClick={handleRegisterClick}>Register to shift</button>




//     <h2>Employee's shifts</h2>
//     <table border="1" cellPadding="8">
//       <thead>
//         <tr>
//           <th>Date</th>
//           <th>Starting hour</th>
//           <th>Ending hour</th>
//         </tr>
//       </thead>
//       <tbody>
//         {
//           employeeShifts.map(shift => (

//             <tr key={shift._id}>
//               <td> {new Date(shift.shift.date).toLocaleDateString('he-IL')}</td>
//               <td> {shift.shift.starting_hour}</td>
//               <td> {shift.shift.ending_hour}</td>
//             </tr>

//           ))
//         }
//       </tbody>
//     </table>


//     <br />
//     <br />
//     <button onClick={handleDeleteClick}>Delete Employee</button> (Cannot be undone !)

//     <br />
//     <br />
//     <br />
//   </div>
// )
// }

// export default EditEmployee