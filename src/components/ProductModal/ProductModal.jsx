// ProductModal.js
import React from "react";
import "./ProductModal.css";

const ProductModal = ({ product, onClose }) => {
  if (!product) return null; // If there's no product, return null

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
        <div className="modal-details">
          <h2>{product.title}</h2>
          <img src={product.images?.[0]} alt={product.title} />
          <p>
            <strong>Description:</strong> {product.description}
          </p>
          <p>
            <strong>Category:</strong> {product.category}
          </p>
          <p>
            <strong>Price:</strong> {product.price}
          </p>
          <p>
            <strong>Rating:</strong> {product.rating}
          </p>
          <p>
            <strong>Availability:</strong>{" "}
            {product.availability ? "In Stock" : "Out of Stock"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
