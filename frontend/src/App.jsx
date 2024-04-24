import Admin from "./pages/Admin";
import React from "react";
import ProtectedRoute from "./components/ProtectedRoute";
import { Routes, Route, useLocation } from "react-router-dom";
import CreateFood from "./pages/CreateFood";
import EditFood from "./pages/EditFood";
import DeleteFood from "./pages/DeleteFood";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminNavbar from "./pages/AdminNavbar";
import Navbar from "./pages/Navbar";
import Home from "./pages/Home";
import Footer from "./pages/Footer";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";
import Dashboard from "./pages/Dashboard";
import DeleteOrder from "./pages/DeleteOrder";

const App = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
    {isAdminRoute ? <AdminNavbar/> : <Navbar/> }
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/contact" element={<Contact/>} />
      <Route path="/cart" element={<Cart/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/success" element={<Success/>} />
      <Route path="/cancel" element={<Cancel/>} />
      <Route path="/register" element={<Register/>} />
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute>
            <AdminRoutes/>
          </ProtectedRoute>
        }
      />
    </Routes>
    <Footer/>

    </>
  );
};


const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Admin/>} />
      <Route path="/dashboard" element={<Dashboard/>} />
      <Route path="/order/delete/:id" element={<DeleteOrder/>} />
      <Route path="/food/create" element={<CreateFood/>} />
      <Route path="/food/edit/:id" element={<EditFood/>} />
      <Route path="/food/delete/:id" element={<DeleteFood/>} />
    </Routes>
  );
};

export default App;