export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return !!token;
};

export const getUserRole = () => {
  const role = localStorage.getItem("role"); // Fetch role from localStorage
  return role || null;
};

export const setAuthData = (token, role) => {
  localStorage.setItem("token", token);
  localStorage.setItem("role", role);
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
};
