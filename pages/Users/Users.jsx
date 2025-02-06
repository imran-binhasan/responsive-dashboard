import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Users = () => {
    const [users,setUsers] = useState([])
    useEffect(()=>{
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then(res => setUsers(res.data))
    },[])
    console.log(users);
    return (
        <div>
           <table className="w-full border shadow overflow-hidden rounded">
            <thead>
                <tr>
                    <th className="py-3 px-4 text-left font-medium text-gray-700">
                    #
                    </th>
                    <th className="py-3 px-4 text-left font-medium text-gray-700">
                    Name
                    </th>
                    <th className="py-3 px-4 text-left font-medium text-gray-700">
                    Email
                    </th>
                    <th className="py-3 px-4 text-left font-medium text-gray-700">
                    CITY
                    </th>
                    <th className="py-3 px-4 text-left font-medium text-gray-700">
                    ACTION
                    </th>
                </tr>
            </thead>
            <tbody>
                {users?.map((user,index) => 
                <tr key={user.id}>
                    <td className="text-left py-2 px-2 md:px-4 text-sm text-gray-700">
                    {index+1}
                    </td>
                    <td className="text-left py-2 px-2 md:px-4 text-sm text-gray-700">
                    {user.name}
                    </td>
                    <td className="text-left py-2 px-2 md:px-4 text-sm text-gray-700">
                    {user.email}
                    </td>
                    <td className="text-left py-2 px-2 md:px-4 text-sm text-gray-700">
                    {user.address?.city}
                    </td>
                    <td className="text-left py-2 px-2 md:px-4 text-sm text-gray-700">
                        <Link to={`/user/${user.id}`} className="border py-1.5 px-3 ">Details</Link>
                    </td>
                </tr>)}
            </tbody>
           </table>
        </div>
    );
};

export default Users;