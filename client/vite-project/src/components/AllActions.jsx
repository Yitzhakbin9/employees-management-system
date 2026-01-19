import React from 'react'
import { Link } from 'react-router-dom';
import UserDetails from './UserDetails';

const AllActions = () => {

    return (

        <div style={{ border: '3px solid #aa3fe0ff' }}>

            <UserDetails />

            <br />
            <br />
            Choose page:<br /><br />

            <Link to={"/employees"}>Employees</Link><br />
            <Link to={"/newEmployee"}>New Employee</Link><br />
            <Link to={"/departments"}>Department</Link><br />
            <Link to={"/editDepartment"}>Edit Department</Link><br />
            <Link to={"/newDepartment"}>New Department</Link><br />
            <Link to={"/users"}>Users</Link><br />

        </div>
    )
}

export default AllActions