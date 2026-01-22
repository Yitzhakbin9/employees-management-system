import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const UserDetails = () => {
  const userDetails = useSelector((state) => state.userDetails);
  const navigate = useNavigate();


  const handleClick = () => {


    navigate('/login')
  }



  return (
    <div style={{ border: '3px solid #FF4500', borderRadius: '10px' }}>
      <h3>User Details:</h3>

      Name: {userDetails.name}<br />
      You have {userDetails.actionsLeft} actions left!

      <br />
      <br />
      <button onClick={handleClick}>log out</button>
    </div>
  )
}

export default UserDetails