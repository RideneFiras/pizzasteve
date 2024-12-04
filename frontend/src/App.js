import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/user-temp/Login";
import Register from "./pages/user-temp/Register";
import Profile from "./pages/user-temp/profile";
import PrivateRoute from "./components/PrivateRoute";
import './styles/global.css';

const App = () => {
  return (
    <div className="app-background">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Wrap /profile with PrivateRoute */}
          <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
