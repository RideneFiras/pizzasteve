import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../utils/auth";
import axios from "axios";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      axios
        .get("http://localhost:8080/user/api/users/profile", {
            
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          console.log("Profile Data:", response.data); // Log response data
          setProfile(response.data);
          setError("");
        })
        .catch((err) => {
          console.error("Error fetching profile:", err); // Log error
          setError("Failed to fetch profile data");
        });
    }
  }, [navigate]);
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="container mt-5">
      <div
        className="card mx-auto"
        style={{
          maxWidth: "600px",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          borderRadius: "10px",
        }}
      >
        <div className="card-body text-center">
          <h1 className="card-title mb-4">Welcome to Your Profile</h1>
          {error && <p className="text-danger">{error}</p>}
          {profile ? (
            <>
              <h3>{`${profile.firstName} ${profile.lastName}`}</h3>
              <p>Email: {profile.email}</p>
              <p>Role: {profile.role}</p>
              <button
                className="btn btn-danger mt-4"
                style={{ width: "100%" }}
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <p>Loading profile...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
