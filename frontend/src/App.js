import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/user-temp/Login";
import Register from "./pages/user-temp/Register";
import Profile from "./pages/user-temp/profile";
import PrivateRoute from "./components/PrivateRoute";
import ViewProducts from './pages/user-temp/ViewProducts';
import AdminViewProducts from './pages/admin-temp/AdminViewProducts';
import AdminAddProduct from './pages/admin-temp/AdminAddProduct';
import AdminModifyProduct from './pages/admin-temp/AdminModifyProduct';
import './styles/global.css';

const App = () => {
  return (
    <div className="app-background">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
          <Route path="/products" element={<PrivateRoute element={<ViewProducts />} />} />
          <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />

  <Route
    path="/admin/view-products"
    element={<PrivateRoute element={<AdminViewProducts />} requiredRole="admin" />}

  />
   <Route
    path="/admin/add-product"
    element={<PrivateRoute element={<AdminAddProduct />} requiredRole="admin" />}

  />
  <Route
    path="/admin/modify-product/:id"
    element={<PrivateRoute element={<AdminModifyProduct />} requiredRole="admin" />}

  />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
