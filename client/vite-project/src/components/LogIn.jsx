import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const URL = 'http://localhost:3000/auth/login';



const LogIn = () => {

    const userDetails = useSelector((state) => state.userDetails);
    const navigate = useNavigate();


    const dispatch = useDispatch();
    const [user, setUser] = useState({ name: '', email: '' })


    const handleSubmit = async (e) => {
        
        e.preventDefault()
    



        const resp = await fetch(URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user), 
        });

        const data = await resp.json();
        console.log('data from login:', data);

        sessionStorage.token = data.token; // short for: sessionStorage.setItem('token', data.token);
        location.href = './employees.html'; // location.href - מה שמופיע בשורת כתובת בבראוזר
        // לוקחים את מה שכבר מופיע בשורת כתובת ומוסיפים את products.html
    }


    // if (true) {
    // add logic if user in the db
    // }


    // navigate('/actionsPage')






    return (


        <div style={{ border: '3px solid Crimson' }}>

            <form onSubmit={handleSubmit}>
                <h1>Login</h1>

                <br />
                Username: <input onChange={e => setUser({ ...user, name: e.target.value })} type="text" /> <br />
                Email: <input onChange={e => setUser({ ...user, email: e.target.value })} type="text" /> <br />

                <br />

                <button type="submit">Login</button>
            </form>



        </div>



    )
}

export default LogIn