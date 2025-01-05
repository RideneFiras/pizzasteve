import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MenuOverlay from "../../components/MenuOverlay";
import "bootstrap/dist/css/bootstrap.min.css";

const AdminViewProducts = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Unauthorized! Please log in.");
      navigate("/login");
      return;
    }

    axios
      .get("http://localhost:8080/product-service/api/products/getProducts", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setError("Failed to fetch products.");
      });
  }, [navigate]);

  const handleDelete = (productId) => {
    const token = localStorage.getItem("token");
    axios
      .delete(
        `http://localhost:8080/product-service/api/products/deleteProduct/${productId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => {
        alert("Product deleted successfully!");
        setProducts(products.filter((product) => product._id !== productId));
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
        alert("Failed to delete product.");
      });
  };

  return (
    <div className="d-flex">
      <MenuOverlay role="admin" /> {/* Include the MenuOverlay for admin */}
      <div className="container mt-5">
        <div className="bg-light p-4 rounded mb-4">
          <h1 className="text-primary text-center mb-3">Manage Products</h1>
          {error && <p className="text-danger text-center">{error}</p>}
        </div>

        {products.length > 0 ? (
          <div className="row">
            {products.map((product) => (
              <div className="col-md-4 mb-4" key={product._id}>
                <div className="card bg-secondary text-white">
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">
                      {product.description || "No description available."}
                    </p>
                    <p className="card-text">Price: ${product.price}</p>
                    <p className="card-text">Category: {product.category}</p>
                   
                    <div className="d-flex justify-content-between">
                      <button
                        className="btn btn-warning"
                        onClick={() =>
                          navigate(`/admin/modify-product/${product._id}`)
                        }
                      >
                        Modify
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(product._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-muted mt-4">No products available.</div>
        )}
      </div>
    </div>
  );
};

export default AdminViewProducts;
