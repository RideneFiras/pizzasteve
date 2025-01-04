import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/global.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/user/api/users/login", {
        email,
        password,
      });
      const { token, role } = response.data;

      setMessage("Login successful!");
      localStorage.setItem("token", token); // Save token in localStorage
      localStorage.setItem("role", role); // Save role in localStorage

      setTimeout(() => {
        if (role === "admin") {
          navigate("/admin/view-products"); // Redirect admin to admin products page
        } else {
          navigate("/profile"); // Redirect user to profile page
        }
      }, 1000); // Add delay for user feedback
    } catch (err) {
      setError(err.response?.data?.message || "Failed to login. Please try again.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-4" style={{ width: "100%", maxWidth: "400px", borderRadius: "10px" }}>
        <h2 className="text-center text-primary mb-4">🍕 Pizza Pete - Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
        {message && <div className="alert alert-success mt-3">{message}</div>}
        {error && <div className="alert alert-danger mt-3">{error}</div>}
        <p className="text-center mt-3">
          Don't have an account?{" "}
          <Link to="/register" className="text-decoration-none text-primary">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
