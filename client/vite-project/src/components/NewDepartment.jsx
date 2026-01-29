import React from 'react'
import UserDetails from './UserDetails'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import {
    Container,
    Paper,
    Typography,
    TextField,
    Button,
    Box
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

const DEPARTMENT_URL = 'http://localhost:3000/departments';

const NewDepartment = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [department, setDepartment] = useState({ department_name: '', manager_id: 0 })
    const token = sessionStorage.token;


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post(`${DEPARTMENT_URL}/`, department, {
                headers: { 'x-access-token': token },
            });
            console.log("new department: ", data)
            alert("Department added succefully!")
            dispatch({ type: 'ACTIONS' });
            navigate('/actionsPage')
        } catch (err) {
            alert("Failed to add Department, try again later.")
            console.log("Failed to add department: ", err)
        }
    }


    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <UserDetails />

            <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Add New Department
                </Typography>

                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <TextField
                        fullWidth
                        label="Department Name"
                        variant="outlined"
                        margin="normal"
                        value={department.department_name}
                        onChange={e => setDepartment({ ...department, department_name: e.target.value })}
                        required
                    />

                    <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            startIcon={<SaveIcon />}
                            fullWidth
                        >
                            Save Department
                        </Button>
                        <Button
                            variant="outlined"
                            color="secondary"
                            startIcon={<CancelIcon />}
                            fullWidth
                            onClick={() => navigate('/actionsPage')}
                        >
                            Cancel
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Container>
    )
}

export default NewDepartment