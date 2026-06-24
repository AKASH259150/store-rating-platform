
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Stores = () => {

const [stores, setStores] = useState([]);
const navigate = useNavigate();

useEffect(() => {


const fetchStores = async () => {

  const res = await axios.get(
    "http://localhost:5000/store"
  );

  setStores(res.data.stores);
};

fetchStores();

}, []);

return ( <div className="p-10">


  <div className="flex justify-between items-center mb-8">
  <h1 className="text-4xl font-bold">
    Stores
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

  <div className="grid grid-cols-3 gap-4">

    {
      stores.map((store) => (
        <div
          key={store.id}
          className="border rounded p-4 shadow"
        >
          <h2 className="text-xl font-bold">
            {store.name}
          </h2>

          <p>{store.address}</p>
        </div>
      ))
    }

  </div>

</div>


);
};

export default Stores;
