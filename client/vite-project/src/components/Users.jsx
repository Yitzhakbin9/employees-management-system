import React from 'react'
import UserDetails from './UserDetails'
import { useNavigate } from 'react-router-dom';
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
  Box
} from '@mui/material';


const USERS_URL = 'http://localhost:3000/users';



const Users = () => {

  const userDetails = useSelector((state) => state.userDetails);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = sessionStorage.token;

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(USERS_URL, {
        headers: { 'x-access-token': token },
      });
      console.log("usesrs: ", data)
      setUsers(data)
    };
    fetchData();
    dispatch({ type: 'ACTIONS' });
  }, []);



  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <UserDetails />

      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Users (Managers)
        </Typography>

        <TableContainer sx={{ mt: 3 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: 'primary.main' }}>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Full Name</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Max Actions</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Actions Left Today</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {users.map((user, index) => (
                <TableRow
                  key={user._id}
                  sx={{
                    '&:nth-of-type(odd)': { bgcolor: 'action.hover' },
                    '&:hover': { bgcolor: 'action.selected' }
                  }}
                >
                  <TableCell>{user.full_name}</TableCell>
                  <TableCell>{user.max_actions}</TableCell>
                  <TableCell>{user.actions_left_today}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  )
}

export default Users