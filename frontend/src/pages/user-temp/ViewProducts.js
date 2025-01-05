import React, { useState, useEffect } from "react";
import axios from "axios";
import MenuOverlay from "../../components/MenuOverlay"; // Import MenuOverlay
import "bootstrap/dist/css/bootstrap.min.css";


const ViewProducts = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [role, setRole] = useState(""); // State to store user role

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Unauthorized! Please log in.");
      return;
    }

    // Decode token to extract role
    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    setRole(decodedToken.role);

    axios
      .get("http://localhost:8080/product-service/api/products/getProducts", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        alert("Failed to fetch products.");
      });
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice = maxPrice === "" || product.price <= parseFloat(maxPrice);
    return matchesSearch && matchesPrice;
  });

  return (
    <div className="d-flex">
      {/* Menu Overlay */}
      <MenuOverlay role={role} />

      {/* Main Content */}
      <div className="container mt-5" style={{ marginLeft: "200px" }}>
        <div className="bg-light p-4 rounded mb-4">
          <h1 className="text-primary text-center mb-3">PRODUCTS</h1>
          <div className="d-flex justify-content-center gap-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ maxWidth: "300px" }}
            />
            <input
              type="number"
              className="form-control"
              placeholder="Filter by max price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              style={{ maxWidth: "300px" }}
            />
          </div>
        </div>
        {filteredProducts.length > 0 ? (
  <div className="row bg">
    {filteredProducts.map((product) => (
      <div className="col-md-4 mb-4" key={product._id}>
    <div className="card bg-muted text-dark">{/* Add bg-dark and text-white classes */}
          <div className="card-body">
            <h5 className="card-title">{product.name}</h5>
            <p className="card-text">
              {product.description || "No description available."}
            </p>
            <p className="card-text">Price: ${product.price}</p>
            <p className="card-text">Category: {product.category}</p>
          </div>
        </div>
      </div>
    ))}
  </div>
) : (
  <p className="text-center">No products available.</p>
)}
      </div>
    </div>
  );
};

export default ViewProducts;
