import React from "react";
import useProductAPICall from "../hooks/useProductAPICall";
import { PRODUCT_API_ENDPOINT } from "../constants/constants";
import ProductCard from "./ProductCard";
import "./css/ProductListView.css";

const ProductListView = () => {
  const productAPIResponse = useProductAPICall(PRODUCT_API_ENDPOINT);

  return (
    <div className="product-list">
      {productAPIResponse?.map((product) => (
        <ProductCard
          key={product.id}
          title={product.title}
          description={product.description}
          imageAddress={product.images[0]}
          category={product.category}
          price={product.price}
          rating={product.rating}
        />
      ))}
    </div>
  );
};

export default ProductListView;
