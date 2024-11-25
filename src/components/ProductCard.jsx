import React, { useState } from "react";
import { RUPEES_SYMBOL, TOTAL_RATING } from "../constants/constants";
import { capitaliseString } from "../utils/utils";
import "./css/ProductCard.css";

const ProductCard = ({
  title,
  description,
  imageAddress,
  category,
  price,
  rating,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="product-card">
      <div className="image-container">
        {/* Shimmer effect displayed until the image is loaded */}
        {!imageLoaded && <div className="shimmer-effect"></div>}
        <img
          className={`product-image ${imageLoaded ? "visible" : "hidden"}`}
          src={imageAddress}
          alt={title}
          onLoad={() => setImageLoaded(true)}
        />
      </div>
      <h3>{title}</h3>
      <p className="product-description">{description}</p>
      <p className="product-category">{capitaliseString(category)}</p>
      <p className="product-price">
        {RUPEES_SYMBOL}
        {price}
      </p>
      <p className="product-rating">
        {rating}
        {TOTAL_RATING}
      </p>
    </div>
  );
};

export default ProductCard;
