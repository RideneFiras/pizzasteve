// utils/auth.js
export const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    return !!token; // Returns true if token exists, otherwise false
  };
  
  export const logout = () => {
    localStorage.removeItem("token"); // Clear token
  };
  