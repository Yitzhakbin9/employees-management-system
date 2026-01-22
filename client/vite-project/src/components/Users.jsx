import React from 'react'
import UserDetails from './UserDetails'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import axios from 'axios';


const USERS_URL = 'http://localhost:3000/users';



const Users = () => {

  const userDetails = useSelector((state) => state.userDetails);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = sessionStorage.token;

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
    <div style={{ border: '3px solid lightblue' }}>
      <UserDetails />
      <h1>Users Page</h1>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Full name</th>
            <th>Max actions</th>
            <th>Actions left today</th>
          </tr>
        </thead>

        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>
                {user.full_name}
              </td>
              <td>
                {user.max_actions}
              </td>
              <td>
                {user.actions_left_today}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <br />
    </div>
  )
}

export default Users