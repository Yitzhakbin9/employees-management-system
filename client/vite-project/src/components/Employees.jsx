import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import UserDetails from "./UserDetails"
import axios from 'axios';
import {
    Container,
    Paper,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Box,
    List,
    ListItem,
    ListItemText
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';


const EMPLOYEE_DETAILS_URL = 'http://localhost:3000/employees/full-details';
const DEPARTMENT_URL = 'http://localhost:3000/departments';


const Employees = () => {

    const userDetails = useSelector((state) => state.userDetails);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [employees, setEmployees] = useState([])
    const [filteredByDep, setFilteredByDep] = useState([])
    const [department, setDepartment] = useState([])
    const [departments, setDepartments] = useState([])


    useEffect(() => {
        const fetchData = async () => {

            const token = sessionStorage.token;

            const { data } = await axios.get(EMPLOYEE_DETAILS_URL, {
                headers: { 'x-access-token': token },
            });
            console.log("Employees: ", data)

            setEmployees(data)
            setFilteredByDep(data)
        };
        fetchData();
        dispatch({ type: 'ACTIONS' });
    }, []);

    useEffect(() => {

        const fetchData = async () => {
            const token = sessionStorage.token;
            const { data } = await axios.get(DEPARTMENT_URL, {
                headers: { 'x-access-token': token },
            });
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
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <UserDetails />

            <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Employees
                </Typography>

                <Box sx={{ mb: 3 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<AddIcon />}
                        onClick={() => navigate('/newEmployee')}
                    >
                        Add New Employee
                    </Button>
                </Box>

                <Box sx={{ mb: 3, maxWidth: 300 }}>
                    <FormControl fullWidth>
                        <InputLabel>Filter by Department</InputLabel>
                        <Select
                            value={department}
                            label="Filter by Department"
                            onChange={e => setDepartment(e.target.value)}
                        >
                            <MenuItem value="">All Departments</MenuItem>
                            {departments.map((dep) => (
                                <MenuItem key={dep._id} value={dep.department_name}>
                                    {dep.department_name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>

                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ bgcolor: 'primary.main' }}>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Full Name</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Department</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Shifts</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {filteredByDep.map((emp, index) => (
                                <TableRow
                                    key={emp._id}
                                    sx={{
                                        '&:nth-of-type(odd)': { bgcolor: 'action.hover' },
                                        '&:hover': { bgcolor: 'action.selected' }
                                    }}
                                >
                                    <TableCell>
                                        <Link
                                            to={`/editEmployee/${emp._id}`}
                                            style={{
                                                textDecoration: 'none',
                                                color: '#1976d2',
                                                fontWeight: 500
                                            }}
                                        >
                                            {`${emp.first_name} ${emp.last_name}`}
                                        </Link>
                                    </TableCell>

                                    <TableCell>
                                        <Link
                                            to={`/editDepartment/${emp.department_id}`}
                                            style={{
                                                textDecoration: 'none',
                                                color: '#1976d2',
                                                fontWeight: 500
                                            }}
                                        >
                                            {emp.department?.department_name}
                                        </Link>
                                    </TableCell>

                                    <TableCell>
                                        {emp.shifts && emp.shifts.length > 0 ? (
                                            <List dense disablePadding>
                                                {emp.shifts.map(shift => (
                                                    <ListItem key={shift._id} disablePadding>
                                                        <ListItemText
                                                            primary={`${new Date(shift.date).toLocaleDateString('he-IL')} : ${shift.starting_hour} - ${shift.ending_hour}`}
                                                            primaryTypographyProps={{ variant: 'body2' }}
                                                        />
                                                    </ListItem>
                                                ))}
                                            </List>
                                        ) : (
                                            <Typography variant="body2" color="text.secondary">
                                                No shifts
                                            </Typography>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Container>
    )
}

export default Employees