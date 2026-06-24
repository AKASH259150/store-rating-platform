import { useEffect, useState } from "react";
import axios from "axios";

const Users = () => {

const [users, setUsers] = useState([]);

useEffect(() => {

const fetchUsers = async () => {

  const res = await axios.get(
    "http://localhost:5000/admin/users",
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }
  );

  setUsers(res.data.users);
};

fetchUsers();


}, []);

return ( <div className="p-10">

  <h1 className="text-4xl font-bold mb-6">
    Users
  </h1>

  <table className="w-full border">

    <thead>
      <tr className="bg-gray-200">
        <th className="border p-2">Name</th>
        <th className="border p-2">Email</th>
        <th className="border p-2">Address</th>
        <th className="border p-2">Role</th>
      </tr>
    </thead>

    <tbody>
      {
        users.map((user) => (
          <tr key={user.id}>
            <td className="border p-2">{user.name}</td>
            <td className="border p-2">{user.email}</td>
            <td className="border p-2">{user.address}</td>
            <td className="border p-2">{user.role}</td>
          </tr>
        ))
      }
    </tbody>

  </table>

</div>

);
};

export default Users;
