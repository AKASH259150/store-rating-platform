import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = ()=> {
    
  const[form, setForm] = useState({
    name:"",
    email:"",
    password:"", 
    address:""
  })
  const navigate = useNavigate();
  
  const handleSubmit = async(e)=>{
    e.preventDefault();
  
  try{

    await axios.post("http://localhost:5000/user/register", form)
    alert("Registered successfully");
  }
catch(err){
    alert(err.response?.data?.message);
}
}


  return (
    <div className="min-h-screen flex justify-center items-center">
        <form onSubmit={handleSubmit}  className="bg-white p-6 shadow rounded w-96">

            <h1 className="text-3xl font-bold mb-5">Register</h1>

            <input 
                className="border p-2 w-full mb-3"
                placeholder="Name"
                onChange={(e)=>setForm({...form,name:e.target.value})}
            />

             <input
                className="border p-2 w-full mb-3"
                placeholder="email"
                onChange={(e)=>setForm({...form,email:e.target.value})}
            />

             <input 
                className="border p-2 w-full mb-3"
                placeholder="password"
                onChange={(e)=>setForm({...form,password:e.target.value})}
            />

             <input 
                className="border p-2 w-full mb-3"
                placeholder="address"
                onChange={(e)=>setForm({...form,address:e.target.value})}
            />

            <button 
                className="bg-green-600 text-white w-full p-2"
            >
                Register
            </button>
        </form>

        <p className="mt-4 text-center">
  Already have an account?
  <span
    className="text-blue-500 cursor-pointer ml-2"
    onClick={() => navigate("/login")}
  >
    Login
  </span>
</p>
      
    </div>
  )
}

export default Register;
