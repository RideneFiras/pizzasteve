import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import MenuOverlay from "../../components/MenuOverlay";

const AdminModifyProduct = () => {
  const { id } = useParams(); // Get product ID from the URL
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Unauthorized! Please log in.");
      navigate("/login");
      return;
    }

    // Fetch product details
    axios
      .get(`http://localhost:8080/product-service/api/products/getProducts`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const product = response.data.find((prod) => prod._id === id);
        if (!product) {
          setError("Product not found.");
          return;
        }
        setProduct(product);
        setName(product.name);
        setDescription(product.description);
        setPrice(product.price);
        setCategory(product.category);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
        setError("Failed to fetch product.");
      });
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await axios.put(
        `http://localhost:8080/product-service/api/products/updateProduct/${id}`,
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
      setMessage("Product updated successfully!");
      setError("");
      // Redirect or give feedback
      setTimeout(() => navigate("/admin/view-products"), 2000);
    } catch (err) {
      console.error("Error updating product:", err);
      setError(err.response?.data?.message || "Failed to update product.");
      setMessage("");
    }
  };

  if (error) {
    return <div className="alert alert-danger text-center">{error}</div>;
  }

  if (!product) {
    return <div className="text-center mt-5">Loading product...</div>;
  }

  return (
    <div className="container mt-5">
      <MenuOverlay role="admin" /> {/* Include the MenuOverlay for admin */}
      <h1 className="text-center text-primary mb-4">Modify Product</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-light p-4 rounded shadow-sm mx-auto"
        style={{ maxWidth: "600px" }}
      >
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
          Update Product
        </button>
      </form>
      {message && <div className="alert alert-success mt-3">{message}</div>}
    </div>
  );
};

export default AdminModifyProduct;
