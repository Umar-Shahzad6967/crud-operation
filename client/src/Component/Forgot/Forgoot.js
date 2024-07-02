import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

function Forgotpass() {
    const [email, setEmail] = useState('');
    const move = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:7000/auth/forgotpassword", { email });
            if (response.data.status) {
                toast.success("please check your email", { position: "top-right" });
                move("/resetpassword");
            } else {
                toast.error(response.data.message);
            }
            console.log(response.data)
        } catch (error) {
            console.log(error);
            toast.error("An error occurred.");
        }
    }

    return (
        <>
            <div className='signup-container'>
                <h2>Forgot Password</h2>
                <form className='signup-form' onSubmit={handleSubmit}>

                    <label htmlFor="e">Email</label>
                    <input type="text" placeholder='Email'
                        onChange={(e) => setEmail(e.target.value)} required />
                    <button type='submit'>Send</button>
                    <p>Don't have an account? <Link to={"/signup"}>Sign up</Link></p>
                </form>
            </div>
        </>
    );
}



export default Forgotpass