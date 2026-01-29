import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Paper, Typography, Button, Box, Chip } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';

const UserDetails = () => {
  const userDetails = useSelector((state) => state.userDetails);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleClick = async () => {

    const resp = await fetch('http://localhost:3000/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    sessionStorage.removeItem('token');
    dispatch({ type: 'LOGOUT' });
    navigate('/login')
  }



  return (
    <Paper
      elevation={2}
      sx={{
        p: 2,
        mb: 3,
        borderRadius: 2,
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white'
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <PersonIcon sx={{ mr: 1 }} />
        <Typography variant="h6">User Details</Typography>
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>Name:</strong> {userDetails.name}
        </Typography>
        <Chip
          label={`${userDetails.actionsLeft} actions left`}
          color="warning"
          size="small"
          sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white', fontWeight: 'bold' }}
        />
      </Box>

      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        <Button
          variant="contained"
          size="small"
          onClick={() => navigate('/actionsPage')}
          startIcon={<HomeIcon />}
          sx={{ bgcolor: 'rgba(255,255,255,0.2)', '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' } }}
        >
          Home
        </Button>
        <Button
          variant="contained"
          size="small"
          onClick={handleClick}
          startIcon={<LogoutIcon />}
          sx={{ bgcolor: 'rgba(255,255,255,0.2)', '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' } }}
        >
          Logout
        </Button>
      </Box>
    </Paper>
  )
}

export default UserDetails