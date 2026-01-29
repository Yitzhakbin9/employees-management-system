import React from 'react'
import { Link } from 'react-router-dom';
import UserDetails from './UserDetails';
import { Container, Paper, Typography, Box, Grid, Card, CardContent, CardActionArea } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import BusinessIcon from '@mui/icons-material/Business';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import ScheduleIcon from '@mui/icons-material/Schedule';
import AddAlarmIcon from '@mui/icons-material/AddAlarm';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';

const AllActions = () => {

    const menuItems = [
        { title: 'Employees', path: '/employees', icon: <PeopleIcon sx={{ fontSize: 40 }} />, color: '#1976d2' },
        { title: 'New Employee', path: '/newEmployee', icon: <PersonAddIcon sx={{ fontSize: 40 }} />, color: '#2e7d32' },
        { title: 'Departments', path: '/departments', icon: <BusinessIcon sx={{ fontSize: 40 }} />, color: '#ed6c02' },
        { title: 'New Department', path: '/newDepartment', icon: <AddBusinessIcon sx={{ fontSize: 40 }} />, color: '#9c27b0' },
        { title: 'Shifts', path: '/shifts', icon: <ScheduleIcon sx={{ fontSize: 40 }} />, color: '#0288d1' },
        { title: 'New Shift', path: '/newShifts', icon: <AddAlarmIcon sx={{ fontSize: 40 }} />, color: '#d32f2f' },
        { title: 'Users (Managers)', path: '/users', icon: <SupervisorAccountIcon sx={{ fontSize: 40 }} />, color: '#7b1fa2' },
    ];

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <UserDetails />

            <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
                    Choose Page
                </Typography>

                <Grid container spacing={3}>
                    {menuItems.map((item, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card
                                elevation={2}
                                sx={{
                                    height: '100%',
                                    transition: 'transform 0.2s, box-shadow 0.2s',
                                    '&:hover': {
                                        transform: 'translateY(-4px)',
                                        boxShadow: 6
                                    }
                                }}
                            >
                                <CardActionArea
                                    component={Link}
                                    to={item.path}
                                    sx={{ height: '100%', p: 2 }}
                                >
                                    <CardContent sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        gap: 2
                                    }}>
                                        <Box sx={{ color: item.color }}>
                                            {item.icon}
                                        </Box>
                                        <Typography variant="h6" component="div" align="center">
                                            {item.title}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Paper>
        </Container>
    )
}

export default AllActions