import React from 'react'
import UserDetails from './UserDetails'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URLS } from '../constants/api';
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



const Users = () => {

  const userDetails = useSelector((state) => state.userDetails);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = sessionStorage.token;

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(API_URLS.users, {
        headers: { 'x-access-token': token },
      });
      console.log("usesrs: ", data)
      setUsers(data)
    };
    fetchData();
  }, []);



  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <UserDetails />

      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Users (Managers)
        </Typography>

        <TableContainer
          sx={{
            mt: 3,
            borderRadius: 3,
            border: '1px solid',
            borderColor: 'divider',
            overflow: 'hidden',
            boxShadow: '0 8px 24px rgba(15, 23, 42, 0.08)',
            backgroundColor: 'background.paper'
          }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: 'primary.main' }}>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Full Name</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Max Actions</TableCell>
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
