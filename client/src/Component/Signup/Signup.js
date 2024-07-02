import React, { useState } from 'react'
// import './Signup.css'
import axios from "axios"
import toast from "react-hot-toast"
import { Link, useNavigate } from 'react-router-dom'

function Signup() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const move = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:7000/auth/signup", {
            username, email, password
        }).then(resp => {
            toast.success("user created Succssfully", { position: "top-right" })
            move("/login")
            console.log(resp);
        }).catch(error => {
            console.log(error);
        })
    }

    return (
        <>
            <div className='signup-container'>
                <h2>Signup</h2>
                <form className='signup-form' onSubmit={handleSubmit}>
                    <label htmlFor="username">Username</label>
                    <input type="text" placeholder='Username'
                        onChange={(e) => setUsername(e.target.value)} />

                    <label htmlFor="email">Email</label>
                    <input type="text" placeholder='Email'
                        onChange={(e) => setEmail(e.target.value)} />

                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder='Password'
                        onChange={(e) => setPassword(e.target.value)} />

                    <button type='submit'>Sign up</button>
                    <p>Already an Account    <Link to={"/login"}>Login</Link></p>
                </form>
            </div>
        </>
    )
}

export default Signup