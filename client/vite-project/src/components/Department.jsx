import React from 'react'
import { useSelector } from 'react-redux';
import UserDetails from './UserDetails';

const Department = () => {

    const userDetails = useSelector((state) => state.userDetails);

    const handleNewDepClick = () => {
        // add redirect to “Add Department” Page
    }



    return (
        <div style={{ border: '3px solid yellow' }}>
            <UserDetails />
            <h1>Hello {userDetails.name}</h1><br />
            You have {userDetails.actionsLeft} actions left!

            <table border="1" cellpadding="8">
                <tr>
                    <th>Department Name</th>
                    <th>Manager Name</th>
                    <th>List of employees</th>
                </tr>
                <tr>
                    <td>Tech (link)</td>
                    <td>Aaron</td>
                    <td>list
                        <ul>
                            <li>first employee (link)</li>
                            <li>second employee (link)</li>
                        </ul>
                    </td>
                </tr>

            </table>

            <br />
            <br />
            <button onClick={handleNewDepClick}>New Department</button>


        </div>
    )
}

export default Department