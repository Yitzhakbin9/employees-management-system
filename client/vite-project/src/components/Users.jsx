import React from 'react'
import UserDetails from './UserDetails'

const Users = () => {
  return (
    <div style={{ border: '3px solid lightblue' }}>
      <UserDetails />
      <h1>Users Page</h1>
      <table border="1" cellpadding="8">
        <tr>
          <th>User Name</th>
          <th>Maximum action allowed</th>
          <th>Current action allowed today</th>
        </tr>
        <tr>
          <td>Adam</td>
          <td>10</td>
          <td>2</td>
        </tr>
        <tr>
          <td>Sapir</td>
          <td>10</td>
          <td>6</td>
        </tr>

      </table>


    </div>
  )
}

export default Users