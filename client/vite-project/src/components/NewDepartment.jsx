import React from 'react'
import UserDetails from './UserDetails'

const NewDepartment = () => {

    const handleSubmit = (e) => {
        e.preventDefault()

        //saving the data in the server
    }


    const handleCancelClick = () => {
        //redirecting back to the “Departments” page.
    }




    return (
        <div style={{ border: '3px solid cyan' }}>
            <UserDetails />
            <h1>Add new department</h1>


            <form onSubmit={handleSubmit}>

                <br />
                Department Name: <input onChange={e => setUsername(e.target.value)} type="text" /> <br />
                Manager Name: <input onChange={e => setUsername(e.target.value)} type="text" /> <br />

                <br />
                <button type="submit">Save Department</button>
                <button onClick={handleCancelClick}>Cancel Depratment</button>


            </form>



        </div>
    )
}

export default NewDepartment