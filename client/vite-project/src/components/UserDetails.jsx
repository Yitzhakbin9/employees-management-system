import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

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
    <div style={{ border: '3px solid #FF4500', borderRadius: '10px' }}>
      <h3>User Details:</h3>

      Name: {userDetails.name}<br />
      You have {userDetails.actionsLeft} actions left!

      <br />
      <br />
      <button onClick={handleClick}>Log out</button>
    </div>
  )
}

export default UserDetails