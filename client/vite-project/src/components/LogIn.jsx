import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Paper,
    TextField,
    Button,
    Typography,
    Box,
    Alert
} from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';

const URL = 'http://localhost:3000/auth/login';

const LogIn = () => {

    const userDetails = useSelector((state) => state.userDetails);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [user, setUser] = useState({ username: '', email: '' })
    const [error, setError] = useState('');


    const handleSubmit = async (e) => {

        e.preventDefault()
        setError('');
        try {
            const resp = await fetch(URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user),
            });

            const data = await resp.json();
            console.log('data from login:', data);
            sessionStorage.token = data.token;
            dispatch({ type: 'USER_NAME', payload: user.username });
            navigate('/actionsPage');

        } catch (error) {
            setError('Invalid credentials, please try again.');
            console.error('Login failed:', error);
        }
    }

    return (
        <Container maxWidth="sm">
            <Box sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        mb: 3
                    }}>
                        <LoginIcon color="primary" sx={{ fontSize: 48, mb: 2 }} />
                        <Typography variant="h4" component="h1" gutterBottom>
                            Login
                        </Typography>
                    </Box>

                    {error && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {error}
                        </Alert>
                    )}

                    <Box component="form" onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            label="Username"
                            variant="outlined"
                            margin="normal"
                            value={user.username}
                            onChange={e => setUser({ ...user, username: e.target.value })}
                            required
                        />

                        <TextField
                            fullWidth
                            label="Email"
                            type="email"
                            variant="outlined"
                            margin="normal"
                            value={user.email}
                            onChange={e => setUser({ ...user, email: e.target.value })}
                            required
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            size="large"
                            sx={{ mt: 3 }}
                            startIcon={<LoginIcon />}
                        >
                            Login
                        </Button>
                    </Box>
                </Paper>
            </Box>
        </Container>
    )
}

export default LogIn