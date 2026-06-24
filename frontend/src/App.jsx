import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Users from "./pages/UserList";
import Stores from "./pages/StoreList";
import StoreOwnerDashboard from "./pages/StoreOwnerDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<ProtectedRoutes role="ADMIN">
          <AdminDashboard />
        </ProtectedRoutes>} />

        <Route path="/admin/users" element={<Users />} />

        <Route path="/stores" element={<Stores />} />

        <Route path="/store-owner" element={<StoreOwnerDashboard />} />

      </Routes>
    </BrowserRouter>

  );
}

export default App;
