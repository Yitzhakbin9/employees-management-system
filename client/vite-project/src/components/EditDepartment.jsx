import UserDetails from './UserDetails';
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
    Divider,
    Alert
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const DEPARTMENT_URL = 'http://localhost:3000/departments';
const EMPLOYEES_URL = 'http://localhost:3000/employees';


const EditDepartment = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const token = sessionStorage.token;
    const [department, setDepartment] = useState({ department_name: '', manager_id: '' })
    const [employees, setEmployees] = useState([])
    const [employeesCombo, setEmployeesCombo] = useState([])
    const [selectedEmployee, setSelectedEmployee] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            console.log("id: ", id)
            const { data } = await axios.get(`${DEPARTMENT_URL}/${id}`, {
                headers: { 'x-access-token': token },
            });
            console.log("department: ", data)
            setDepartment(data);
        };
        fetchData();
    }, []);


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
        const employeesFiltered = employees.filter(emp => emp.department_id !== id);
        setEmployeesCombo(employeesFiltered);
    }, [employees, id]);


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.put(`${DEPARTMENT_URL}/${id}`, department, {
                headers: { 'x-access-token': token },
            });
            console.log("updated department details: ", department)
            dispatch({ type: 'ACTIONS' });
            alert("Department updated succefully!")
            navigate('/departments')
        } catch (err) {
            alert("Failure")
            console.log("Failed to updated: ", err)
        }

    }

    const handleDeleteClick = async () => {
        try {
            const { data } = await axios.delete(`${DEPARTMENT_URL}/${id}`, {
                headers: { 'x-access-token': token },
            });
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
            const { data } = await axios.put(`${EMPLOYEES_URL}/${selectedEmployee}`, { department_id: id }, {
                headers: { 'x-access-token': token },
            });
            dispatch({ type: 'ACTIONS' });
            alert("Employee updated succefully!")
            navigate('/departments')
        } catch (err) {
            alert("Failure")
            console.log("Failed to updated: ", err)
        }
    }

    const handleChosenEmpOnChange = (e) => {
        setSelectedEmployee(e.target.value)
    }

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <UserDetails />

            <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Edit Department
                </Typography>

                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <TextField
                        fullWidth
                        label="Department ID"
                        variant="outlined"
                        margin="normal"
                        value={id}
                        disabled
                    />

                    <TextField
                        fullWidth
                        label="Department Name"
                        variant="outlined"
                        margin="normal"
                        value={department.department_name}
                        onChange={(e) => setDepartment({ ...department, department_name: e.target.value })}
                        required
                    />

                    <Box sx={{ mt: 3 }}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            startIcon={<SaveIcon />}
                            fullWidth
                        >
                            Update Department
                        </Button>
                    </Box>
                </Box>

                <Divider sx={{ my: 4 }} />

                <Typography variant="h5" gutterBottom>
                    Assign Employee from Other Departments
                </Typography>

                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mt: 2 }}>
                    <FormControl fullWidth>
                        <InputLabel>Choose Employee</InputLabel>
                        <Select
                            label="Choose Employee"
                            value={selectedEmployee}
                            onChange={handleChosenEmpOnChange}
                        >
                            <MenuItem value="">Choose Employee</MenuItem>
                            {employeesCombo.map(emp => (
                                <MenuItem key={emp._id} value={emp._id}>
                                    {emp.first_name} {emp.last_name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<AddIcon />}
                        onClick={handleAddClick}
                        sx={{ minWidth: 200 }}
                    >
                        Add
                    </Button>
                </Box>

                <Divider sx={{ my: 4 }} />

                <Alert severity="warning" sx={{ mb: 2 }}>
                    Warning: Deleting a department cannot be undone!
                </Alert>

                <Button
                    variant="contained"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={handleDeleteClick}
                    fullWidth
                >
                    Delete Department
                </Button>
            </Paper>
        </Container>
    )
}

export default EditDepartment