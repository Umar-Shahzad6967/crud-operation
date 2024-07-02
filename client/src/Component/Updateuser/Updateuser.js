import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import axios from "axios"
import toast from "react-hot-toast"
import "./Updateuser.css"



function Update() {
    const users = {
        fname: "",
        lname: "",
        email: ""

    }
    const move = useNavigate();

    const { id } = useParams();
    const [user, setuser] = useState(users)

    const inputchangehandler = (e) => {
        const { name, value } = e.target;
        setuser({ ...user, [name]: value });
    }
    useEffect(() => {
        axios.get(`http://localhost:7000/api/getone/${id}`).then((responce) => {
            setuser(responce.data);
        }).catch((error) => {
            console.log(error);
        })
    }, [id])

    const submitdata = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:7000/api/update/${id}`, user)
            .then((res) => {
                toast.success("user updated  Succssfully", { position: "top-right" })
                move("/")
                console.log(res);

            }).catch(error => console.log(error))

    }

    return (
        <div className='adduser'>
            <Link to={"/"}>Back</Link>
            <h3>Update USER </h3>
            <form onSubmit={submitdata}>
                <div className='inputgroup'>
                    <label htmlFor="fname">First Name</label>
                    <input type="text" value={user.fname} onChange={inputchangehandler} id='fname' name='fname' autoComplete='off' placeholder='first name' />
                </div>
                <div className='inputgroup'>
                    <label htmlFor="lname">Last Name</label>
                    <input type="text" value={user.lname} onChange={inputchangehandler} id='lname' name='lname' autoComplete='off' placeholder='last name' />
                </div>
                <div className='inputgroup'>
                    <label htmlFor="email">Email</label>
                    <input type="email" value={user.email} onChange={inputchangehandler} id='email' name='email' autoComplete='off' placeholder='email' />
                </div>
                <div className='inputgroup'>
                    <button type='submit'>Update User</button>
                </div>
            </form>
        </div>
    )
}

export default Update