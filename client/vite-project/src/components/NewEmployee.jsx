import UserDetails from "./UserDetails"
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
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
import CancelIcon from '@mui/icons-material/Cancel';

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
            role: 'employee'
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
        <Container maxWidth="md" sx={{ py: 4 }}>
            <UserDetails />

            <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Add New Employee
                </Typography>

                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
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

                    <FormControl fullWidth margin="normal" required>
                        <InputLabel>Department</InputLabel>
                        <Select
                            label="Department"
                            onChange={handleOnChange}
                        >
                            <MenuItem value="">Choose Department</MenuItem>
                            {departments.map((dep) => (
                                <MenuItem key={dep._id} value={dep.department_name}>
                                    {dep.department_name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            startIcon={<SaveIcon />}
                            fullWidth
                        >
                            Save
                        </Button>
                        <Button
                            variant="outlined"
                            color="secondary"
                            startIcon={<CancelIcon />}
                            fullWidth
                            onClick={() => navigate('/employees')}
                        >
                            Cancel
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Container>
    )
}

export default Employee