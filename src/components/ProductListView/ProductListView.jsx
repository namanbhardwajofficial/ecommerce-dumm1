import React, { useEffect, useState, useCallback } from "react";
import useProductAPICall from "../../hooks/useProductAPICall";
import { PRODUCT_API_ENDPOINT } from "../../constants/constants";
import ProductCard from "../ProductCard/ProductCard";
import "./ProductListView.css";

const ProductListView = () => {
  const initialCardData = useProductAPICall(PRODUCT_API_ENDPOINT); // Fetch initial data
  const [cardData, setCardData] = useState([]);

  // Fetch additional data manually
  const fetchMoreCardData = useCallback(async () => {
    try {
      const url = PRODUCT_API_ENDPOINT + `?limit=15`;
      console.log(url);
      const response = await fetch(url);
      const result = await response.json();
      if (result?.products) {
        setCardData((prev) => [...prev, ...result.products]);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }, []);

  useEffect(() => {
    if (initialCardData) {
      setCardData(initialCardData);
    }
  }, [initialCardData]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
        fetchMoreCardData();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fetchMoreCardData]);

  return (
    <div className="product-list">
      {cardData.length > 0 &&
        cardData.map((product) => (
          <ProductCard
            key={product?.id * Math.random() * 10} //since in infinte scroll I am calling same api again and again I am adding a random key so that it does not gives warning
            title={product?.title}
            description={product?.description}
            imageAddress={product?.images?.[0]}
            category={product?.category}
            price={product?.price}
            rating={product?.rating}
          />
        ))}
    </div>
  );
};

export default ProductListView;
