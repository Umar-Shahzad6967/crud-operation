import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const move = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:7000/auth/login", { email, password });
            if (response.data.status) {
                toast.success("You are successfully logged in", { position: "top-right" });
                move("/home");
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("An error occurred.");
        }
    }

    return (
        <>
            <div className='signup-container'>
                <h2>Login</h2>
                <form className='signup-form' onSubmit={handleSubmit}>

                    <label htmlFor="email">Email</label>
                    <input type="text" placeholder='Email'
                        onChange={(e) => setEmail(e.target.value)} required />

                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder='Password'
                        onChange={(e) => setPassword(e.target.value)} required />
                    <Link to={'/forgotpassword'}>forgotpassword</Link>

                    <button type='submit'>Login</button>
                    <p>Don't have an account? <Link to={"/signup"}>Sign up</Link></p>
                </form>
            </div>
        </>
    );
}

export default Login;
