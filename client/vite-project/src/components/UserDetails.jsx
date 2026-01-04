import React from 'react'
import { useSelector } from 'react-redux';

const UserDetails = () => {
  const userDetails = useSelector((state) => state.userDetails);

  return (
    <div style={{ border: '3px solid #FF4500' , borderRadius: '10px'}}>
      <h3>User Details:</h3>

      Name: {userDetails.name}<br />
      You have {userDetails.actionsLeft} actions left!

    </div>
  )
}

export default UserDetails