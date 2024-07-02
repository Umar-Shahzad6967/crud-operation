import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import toast from 'react-hot-toast';
import './Alluser.css';  // Make sure this path is correct based on your project structure

function Getall() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:7000/api/getAll");
                setUsers(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    const deleteuser = async (userID) => {
        try {
            await axios.delete(`http://localhost:7000/api/delete/${userID}`);
            setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userID));
            toast.success('User deleted successfully', { position: "top-right" });
        } catch (error) {
            console.log(error);
            toast.error('Failed to delete user', { position: "top-right" });
        }
    };

    return (
        <div className='usertable'>
            <div className="table-container">
                <Link to={'/create'}>Add User</Link>
                <table>
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>User Name</th>
                            <th>User Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user._id}>
                                <td>{index + 1}</td>
                                <td>{user.fname} {user.lname}</td>
                                <td>{user.email}</td>
                                <td>
                                    <button onClick={() => deleteuser(user._id)}>Delete</button>
                                    <button><Link to={`/edit/${user._id}`}>Update</Link></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Getall;
