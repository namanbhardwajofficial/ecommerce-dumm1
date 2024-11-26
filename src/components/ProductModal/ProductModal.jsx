import { useEffect, useState } from "react";
import { PRODUCT_API_ENDPOINT, RUPEES_SYMBOL } from "../../constants/constants";
import "./ProductModal.css";

const ProductModal = ({ productId, onClose }) => {
  const [product, setProduct] = useState(null);

  // Fetch product details asynchronously
  async function getProductDetails(productId) {
    const productURLToCall = PRODUCT_API_ENDPOINT + "/" + productId;
    const response = await fetch(productURLToCall);
    const result = await response.json();
    return result;
  }

  // Fetch product data when component mounts or productId changes
  useEffect(() => {
    const fetchProductData = async () => {
      const result = await getProductDetails(productId);
      setProduct(result);
    };

    if (productId) {
      fetchProductData();
    }
  }, [productId]); // Dependency array includes productId to refetch when it changes

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={() => onClose(productId)}>
          ×
        </button>
        <div className="modal-container">
          {/* Left section for Image */}
          {product && (
            <div className="modal-image">
              <img
                className="product-image"
                src={product?.images?.[0]}
                alt={product?.title}
              />
            </div>
          )}

          {/* Right section for Product Data */}
          <div className="modal-details">
            <h2 className="modal-title">{product?.title}</h2>
            <p>
              <strong>Description:</strong> {product?.description}
            </p>
            <p>
              <strong>Category:</strong> {product?.category}
            </p>
            <p>
              <strong>Brand:</strong> {product?.brand}
            </p>
            <p>
              <strong>Price:</strong> {RUPEES_SYMBOL}
              {product?.price}
            </p>
            <p>
              <strong>Rating:</strong> {product?.rating}
            </p>
            <p>
              <strong>Availability:</strong>{" "}
              {product?.stock ? "In Stock" : "Out of Stock"}
            </p>
            <p>
              <strong>Current Stock Remaining:</strong> {product?.stock}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
