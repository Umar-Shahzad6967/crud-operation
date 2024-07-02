import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

function Create() {
    const [user, setUser] = useState({
        fname: '',
        lname: '',
        email: '',
        password: ''
    });

    const inputHandler = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const submitForm = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:7000/api/create', user);
            toast.success(response.data.msg, { position: 'top-right' });
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.msg, { position: 'top-right' });
            } else {
                toast.error("Something went wrong", { position: 'top-right' });
            }
        }
    };

    return (
        <div className='adduser'>
            <Link to={"/"}>Back</Link>
            <h3>ADD USER</h3>
            <form className='text-c' onSubmit={submitForm}>
                <div className='inputgroup'>
                    <label htmlFor="fname">First Name</label>
                    <input type="text" onChange={inputHandler} id='fname' name='fname' autoComplete='off' placeholder='First name' />
                </div>
                <div className='inputgroup'>
                    <label htmlFor="lname">Last Name</label>
                    <input type="text" onChange={inputHandler} id='lname' name='lname' autoComplete='off' placeholder='Last name' />
                </div>
                <div className='inputgroup'>
                    <label htmlFor="email">Email</label>
                    <input type="email" onChange={inputHandler} id='email' name='email' autoComplete='off' placeholder='Email' />
                </div>
                <div className='inputgroup'>
                    <label htmlFor="password">Password</label>
                    <input type="password" onChange={inputHandler} id='password' name='password' autoComplete='off' placeholder='Password' />
                </div>
                <div className='inputgroup'>
                    <button type='submit'>Add User</button>
                </div>
            </form>
        </div>
    );
}

export default Create;
