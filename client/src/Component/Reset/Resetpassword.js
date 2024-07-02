import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

function Resetpass() {
    const [password, setPassword] = useState('');
    const move = useNavigate();
    const { token } = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:7000/auth/reset`, { password, token });
            if (response.data.success) {
                toast.success("Password updated successfully", { position: "top-right" });
                move("/login");
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
                <h2>Reset Password</h2>
                <form className='signup-form' onSubmit={handleSubmit}>
                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} required />
                    <button type='submit'>Update</button>
                </form>
            </div>
        </>
    );
}

export default Resetpass;
