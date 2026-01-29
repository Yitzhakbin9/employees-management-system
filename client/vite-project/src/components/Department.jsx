import React from 'react'
import UserDetails from './UserDetails';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
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
    Box,
    List,
    ListItem,
    ListItemText
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';


const DEPARTMENT_URL = 'http://localhost:3000/departments/department-with-employees';


const Department = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userDetails = useSelector((state) => state.userDetails);
    const token = sessionStorage.token;

    const [departmentsFull, setDepartmentsFull] = useState([])


    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get(DEPARTMENT_URL, {
                headers: { 'x-access-token': token },
            });
            console.log("Depratments: ", data)
            setDepartmentsFull(data);
        };
        fetchData();
        dispatch({ type: 'ACTIONS' });
    }, []);

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <UserDetails />

            <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Departments
                </Typography>

                <Box sx={{ mb: 3 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<AddIcon />}
                        onClick={() => navigate('/newDepartment')}
                    >
                        New Department
                    </Button>
                </Box>

                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ bgcolor: 'primary.main' }}>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Department Name</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Manager Name</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>List of Employees</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {departmentsFull.map((dep, index) => {
                                const manager = dep.employees.find(
                                    emp => emp._id === dep.manager_id
                                );

                                const employees = dep.employees.filter(
                                    emp => emp._id !== dep.manager_id
                                );

                                return (
                                    <TableRow
                                        key={dep._id}
                                        sx={{
                                            '&:nth-of-type(odd)': { bgcolor: 'action.hover' },
                                            '&:hover': { bgcolor: 'action.selected' }
                                        }}
                                    >
                                        <TableCell>
                                            <Link
                                                to={`/editDepartment/${dep._id}`}
                                                style={{
                                                    textDecoration: 'none',
                                                    color: '#1976d2',
                                                    fontWeight: 500
                                                }}
                                            >
                                                {dep.department_name}
                                            </Link>
                                        </TableCell>

                                        <TableCell>
                                            {manager
                                                ? `${manager.first_name} ${manager.last_name}`
                                                : '—'}
                                        </TableCell>

                                        <TableCell>
                                            {employees.length > 0 ? (
                                                <List dense disablePadding>
                                                    {employees.map(emp => (
                                                        <ListItem key={emp._id} disablePadding>
                                                            <ListItemText
                                                                primary={`${emp.first_name} ${emp.last_name}`}
                                                                primaryTypographyProps={{ variant: 'body2' }}
                                                            />
                                                        </ListItem>
                                                    ))}
                                                </List>
                                            ) : (
                                                <Typography variant="body2" color="text.secondary">
                                                    No employees
                                                </Typography>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Container>
    )
}

export default Department