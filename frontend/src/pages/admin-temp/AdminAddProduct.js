import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import MenuOverlay from "../../components/MenuOverlay";

const AdminAddProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await axios.post(
        "http://localhost:8080/product-service/api/products/addProduct",
        {
          name,
          description,
          price,
          category,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage("Product added successfully!");
      setError("");
      // Redirect or reset the form
      setTimeout(() => navigate("/admin/view-products"), 2000);
    } catch (err) {
      console.error("Error adding product:", err);
      setMessage("");
      setError(err.response?.data?.message || "Failed to add product.");
    }
  };

  return (
    <div className="container mt-5">
      <MenuOverlay role="admin" /> {/* Include the MenuOverlay for admin */}
      <div className="bg-light p-4 rounded shadow-sm mx-auto" style={{ maxWidth: "600px" }}>
        <h1 className="text-center text-primary mb-4 p-3 bg-light rounded">Add a New Product</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Product Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="price" className="form-label">
              Price
            </label>
            <input
              type="number"
              className="form-control"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="category" className="form-label">
              Category
            </label>
            <input
              type="text"
              className="form-control"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Add Product
          </button>
        </form>
        {message && <div className="alert alert-success mt-3">{message}</div>}
        {error && <div className="alert alert-danger mt-3">{error}</div>}
      </div>
    </div>
  );
};

export default AdminAddProduct;