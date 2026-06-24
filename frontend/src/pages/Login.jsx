import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{

      const res = await axios.post(
        "http://localhost:5000/user/login",
        {
          email,
          password
        }
      );

      localStorage.setItem("token",res.data.token);
      localStorage.setItem("role",res.data.role);

      if(res.data.role==="ADMIN"){
        navigate("/admin");
      }
      else if(res.data.role==="STORE_OWNER"){
        navigate("/store-owner");
      }
      else{
        navigate("/stores");
      }

    }catch(err){
      alert(err.response?.data?.message);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow w-96"
      >

        <h1 className="text-3xl font-bold mb-5">
          Login
        </h1>

        <input
          className="border p-2 w-full mb-4"
          type="email"
          placeholder="Email"
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          className="border p-2 w-full mb-4"
          type="password"
          placeholder="Password"
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button
          className="bg-blue-500 text-white w-full p-2 rounded"
        >
          Login
        </button>

      </form>

    </div>
  );
};

export default Login;