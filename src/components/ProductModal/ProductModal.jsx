import { useEffect, useState } from "react";
import {
  AVAILABILITY,
  BRAND,
  CATEGORY,
  DESCRIPTION,
  PRICE,
  PRODUCT_API_ENDPOINT,
  RATING,
  RUPEES_SYMBOL,
} from "../../constants/constants";
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
        {product != null ? (
          <div className="modal-container">
            <button className="close-btn" onClick={() => onClose(productId)}>
              ×
            </button>
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
                <strong>{DESCRIPTION}:</strong> {product?.description}
              </p>
              <p>
                <strong>{CATEGORY}:</strong> {product?.category}
              </p>
              <p>
                <strong>{BRAND}:</strong> {product?.brand}
              </p>
              <p>
                <strong>{PRICE}:</strong> {RUPEES_SYMBOL}
                {product?.price}
              </p>
              <p>
                <strong>{RATING}:</strong> {product?.rating}
              </p>
              <p>
                <strong>{AVAILABILITY}:</strong>{" "}
                {product?.stock ? "In Stock" : "Out of Stock"}
              </p>
              <p>
                <strong>Current Stock Remaining:</strong> {product?.stock}
              </p>
            </div>
          </div>
        ) : (
          <div className="loading-icon">
            <span className="loader"></span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductModal;
