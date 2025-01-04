import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../utils/auth"; // Import logout function
import "bootstrap/dist/css/bootstrap.min.css";

const MenuOverlay = ({ role }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [productsDropdown, setProductsDropdown] = useState(false); // State for dropdown
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const toggleProductsDropdown = () => {
    setProductsDropdown(!productsDropdown);
  };

  const handleLogout = () => {
    logout(); // Call the logout function
    navigate("/login"); // Redirect to login page
  };

  return (
    <div
      className={`d-flex flex-column bg-dark text-white vh-100 ${
        collapsed ? "collapsed-menu" : ""
      }`}
      style={{
        width: collapsed ? "50px" : "200px",
        position: "fixed",
        top: "0",
        left: "0",
        zIndex: "1000",
        transition: "width 0.3s ease-in-out",
      }}
    >
      {/* Collapse Button */}
      <button
        className="btn btn-light btn-sm m-2"
        onClick={toggleCollapse}
        style={{
          position: "absolute",
          top: "10px",
          right: collapsed ? "-25px" : "-15px",
          zIndex: "1100",
          borderRadius: "50%",
          width: "30px",
          height: "30px",
        }}
      >
        {collapsed ? "☰" : "✖"}
      </button>

      {/* Menu Title */}
      <h2 className={`text-center my-4 ${collapsed ? "d-none" : ""}`}>Menu</h2>

      {/* Menu Items */}
      <ul className="nav flex-column">
        {/* Common for both admin and user */}
        <li className="nav-item mb-2">
          <button
            className={`btn btn-secondary w-97 ${collapsed ? "d-none" : ""}`}
            onClick={() => handleNavigation("/profile")}
          >
            Profile
          </button>
        </li>

        {/* Admin Menu */}
        {role === "admin" ? (
          <>
            {/* Products with Dropdown */}
            <li className="nav-item mb-2">
              <button
                className={`btn btn-secondary w-97 ${collapsed ? "d-none" : ""}`}
                onClick={toggleProductsDropdown}
              >
                Manage Products
              </button>
              {productsDropdown && !collapsed && (
                <ul
                  className="nav flex-column"
                  style={{
                    marginLeft: "20px",
                    marginTop: "5px",
                  }}
                >
                  <li className="nav-item mb-2">
                    <button
                      className="btn btn-secondary w-100"
                      onClick={() => handleNavigation("/admin/add-product")}
                    >
                      Add Product
                    </button>
                  </li>
                  <li className="nav-item mb-2">
                    <button
                      className="btn btn-secondary w-100"
                      onClick={() => handleNavigation("/admin/view-products")}
                    >
                      View Products
                    </button>
                  </li>
                </ul>
              )}
            </li>
          </>
        ) : (
          /* User Menu */
          <>
            <li className="nav-item mb-2">
              <button
                className={`btn btn-secondary w-97 ${collapsed ? "d-none" : ""}`}
                onClick={() => handleNavigation("/products")}
              >
                Products
              </button>
            </li>
          </>
        )}

        {/* Logout Button (Common for both admin and user) */}
        <li className="nav-item mt-auto">
          <button
            className={`btn btn-danger w-97 ${collapsed ? "d-none" : ""}`}
            onClick={handleLogout}
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default MenuOverlay;
