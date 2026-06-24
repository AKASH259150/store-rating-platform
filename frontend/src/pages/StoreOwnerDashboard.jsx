
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const StoreOwnerDashboard = () => {

const [data, setData] = useState(null);
const navigate = useNavigate();

useEffect(() => {


const fetchData = async () => {

  const res = await axios.get(
    "http://localhost:5000/store-owner/dashboard",
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }
  );

  setData(res.data);
};

fetchData();


}, []);

return ( <div className="p-10">


  <div className="flex justify-between items-center mb-8">
  <h1 className="text-4xl font-bold">
    Store Owner Dashboard
  </h1>

  <button
    className="bg-red-500 text-white px-4 py-2 rounded"
    onClick={() => {
      localStorage.clear();
      navigate("/login");
    }}
  >
    Logout
  </button>
</div>

 <div className="bg-white shadow rounded p-6 mb-6">
    <h2 className="text-2xl font-bold">
      {data?.store?.name}
    </h2>

    <p className="mt-2">
      Average Rating:
      <span className="font-bold ml-2">
        {data?.store?.averageRating}
      </span>
    </p>
  </div>

  <h2 className="text-2xl font-bold mb-4">
    Users Who Rated
  </h2>

  <table className="w-full border">

    <thead>
      <tr className="bg-gray-200">
        <th className="border p-2">Name</th>
        <th className="border p-2">Email</th>
        <th className="border p-2">Rating</th>
      </tr>
    </thead>

    <tbody>

      {data?.ratings?.map((user, index) => (
        <tr key={index}>
          <td className="border p-2">{user.name}</td>
          <td className="border p-2">{user.email}</td>
          <td className="border p-2">{user.rating}</td>
        </tr>
      ))}

    </tbody>

  </table>

</div>


);
};

export default StoreOwnerDashboard;

