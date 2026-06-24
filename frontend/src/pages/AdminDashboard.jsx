import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminDashboard =()=> {

    const[data, setData] = useState({});
    const navigate = useNavigate();

    useEffect(
        ()=>{
            const fetchData = async()=>{

                const res = await axios.get("http://localhost:5000/admin/dashboard",
                    {
                        headers:{
                            Authorization:`Bearer ${localStorage.getItem("token")}`
                        }
                    }
                )

                setData(res.data);
                
            }
            fetchData();
        },
        []
    )


  return (
    
      <div className="p-10">

      <div className="flex justify-between items-center mb-8">

  <h1 className="text-4xl font-bold">
    Admin Dashboard
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

      <div className="grid grid-cols-3 gap-5">

        <div className="bg-blue-200 p-5 rounded">
          Total Users
          <h2>{data.totalUsers}</h2>
        </div>

        <div className="bg-green-200 p-5 rounded">
          Total Stores
          <h2>{data.totalStores}</h2>
        </div>

        <div className="bg-yellow-200 p-5 rounded">
          Total Ratings
          <h2>{data.totalRatings}</h2>
        </div>

      </div>

    </div>
  )
}

export default AdminDashboard;
