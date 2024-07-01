import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";


const Home = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    
    const Logout = () => {
        localStorage.clear();
        navigate("/");
    }
    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await axios.get('http://127.0.0.1:8000/api/manage-user/',{
                    headers:{
                        'Authorization' :  `Bearer ${localStorage.getItem('access_token')}`,
                        'Content-Type': 'application/json',
                    }
                })
                console.log(response.data);
                setUsers(response.data);
                
            }catch(error){
                console.log("Error while fetching data ", error);
            }
        }
        fetchData();
    },[])
    const deleteData = async (id) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this user?");
        if (isConfirmed) {
          try {
            await axios.delete(`http://127.0.0.1:8000/api/manage-user/${id}/`, {
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                'Content-Type': 'application/json',
              },
            });
            setUsers(users.filter((data) => data.id !== id));
          } catch (error) {
            console.log("Error while deleting ", error);
          }
        }
      };
    return (
        <div className="p-4">
        <div className="flex justify-end space-x-4 mb-4">
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded shadow-lg transition duration-300" onClick={Logout}>Logout</button>
            <Link to={'/addUser'}> <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-lg transition duration-300">Add User</button></Link>
        </div>
        <table className="table-auto border-collapse w-full mt-8">
            <thead className="bg-indigo-600 text-white">
                <tr>
                    <th className="border border-black px-4 py-2">Name</th>
                    <th className="border border-black px-4 py-2">Email</th>
                    <th className="border border-black px-4 py-2">Friends</th>
                    <th className="border border-black px-4 py-2">Edit</th>
                    <th className="border border-black px-4 py-2">Delete</th>
                </tr>
            </thead>
            <tbody className="text-black">
            {users.map((user)=> (            
            <tr>
              <td className="border border-black px-4 py-2">{user.username}</td>
              <td className="border border-black px-4 py-2">{user.email}</td>
              <td className="border border-black px-4 py-2">{user.friends_name.join(', ')}</td>
   <td className="border border-black px-4 py-2 font-medium text-cyan-500 hover:underline cursor-pointer"> <Link to={`/editUser?id=${user.id}`}>Edit</Link></td>
              <td className="border border-black px-4 py-2 font-medium text-red-500 hover:underline cursor-pointer" onClick={() => deleteData(user.id)}>Delete</td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  
  export default Home
  