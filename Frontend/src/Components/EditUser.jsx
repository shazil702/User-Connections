import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom";

const EditUser = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [selectedFriends, setSelectedFriends] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/manage-user/${id}/`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                        'Content-Type': 'application/json',
                    }
                });
                const userData = response.data;
                setUsername(userData.username);
                setEmail(userData.email);
                setSelectedFriends(userData.friends);
            } catch (error) {
                console.log("Error while fetching user data", error);
            }
        };

        const fetchAllUsers = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/manage-user/', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                        'Content-Type': 'application/json',
                    }
                });
                setAllUsers(response.data.filter(user => user.id !== parseInt(id))); // Exclude the user being edited
            } catch (error) {
                console.log("Error while fetching users", error);
            }
        };

        fetchUserData();
        fetchAllUsers();
    }, [id]);

    const handleUpdateUser = async () => {
        try {
            await axios.put(`http://127.0.0.1:8000/api/manage-user/${id}/`, {
                username,
                email,
                friends: selectedFriends
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                    'Content-Type': 'application/json',
                }
            });
            navigate('/home');
        } catch (error) {
            console.log("Error while updating user", error);
        }
    };

    const handleFriendSelection = (friendId) => {
        setSelectedFriends(prev =>
            prev.includes(friendId) ? prev.filter(id => id !== friendId) : [...prev, friendId]
        );
    };

    return (
        <div className="max-w-lg mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-6">Edit User</h2>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                <input
                    type="text"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                <input
                    type="email"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Friends</label>
                <div className="flex flex-wrap">
                    {allUsers.map(user => (
                        <div key={user.id} className="mr-4 mb-2">
                            <label className="inline-flex items-center">
                                <input
                                    type="checkbox"
                                    className="form-checkbox"
                                    checked={selectedFriends.includes(user.id)}
                                    onChange={() => handleFriendSelection(user.id)}
                                />
                                <span className="ml-2">{user.username}</span>
                            </label>
                        </div>
                    ))}
                </div>
            </div>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={handleUpdateUser}
            >
                Update User
            </button>
        </div>
    );
};

export default EditUser;
