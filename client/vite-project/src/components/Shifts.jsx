import React from 'react'
import UserDetails from './UserDetails'

const Shifts = () => {

    const handleSubmit = (e) => {
        e.preventDefault()

        //saving the data in the server
    }


    const handleAddClick = () => {
        // Add employee to current shift
    }

    return (
        <div style={{ border: '3px solid lightgreen' }}>
            <UserDetails />

            <form onSubmit={handleSubmit}>

                <br />
                Date: <input onChange={e => setUsername(e.target.value)} type="text" /> <br />
                Starting Hour: <input onChange={e => setUsername(e.target.value)} type="text" /> <br />
                Ending Hour: <input onChange={e => setUsername(e.target.value)} type="text" /> <br />

                <br />
                <button type="submit">Save New Shift</button>

                <br />
                <br />
                <br />
                <p>Add employee to shift</p>
                <select name="employees" id="employees">
                    <option value="employee1">Adam</option>
                    <option value="employee2">Sapir</option>
                </select>
                <br />
                <br />
                <button onClick={handleAddClick}>Add</button>
            </form>





        </div>
    )
}

export default Shifts