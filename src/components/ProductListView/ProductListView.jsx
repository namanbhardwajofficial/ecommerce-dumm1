// ProductListView.js
import { useState, useEffect, useMemo } from "react";
import useProductAPICall from "../../hooks/useProductAPICall";
import { PRODUCT_API_ENDPOINT } from "../../constants/constants";
import ProductCard from "../ProductCard/ProductCard";
import ProductFilterSort from "../ProductFilterSort/ProductFilterSort";
import "./ProductListView.css";
import ProductModal from "../ProductModal/ProductModal";

const ProductListView = () => {
  const initialCardData = useProductAPICall(PRODUCT_API_ENDPOINT);
  const [cardData, setCardData] = useState(initialCardData || []);
  const [categories, setCategories] = useState([]); // State to store unique categories

  const [filters, setFilters] = useState({
    category: "",
    priceRange: [0, 5000],
    rating: 0,
    sortBy: "",
  });
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    if (initialCardData) {
      const newCategories = initialCardData.map((product) => product.category);
      // @ts-ignore
      const uniqueCategories = [...new Set(newCategories)];
      setCategories(uniqueCategories);
    }
  }, [initialCardData]);

  const filteredProducts = useMemo(() => {
    if (cardData) {
      let filtered = [...cardData];

      // Filter by category
      if (filters.category) {
        filtered = filtered.filter(
          (product) => product.category === filters.category
        );
      }

      // Filter by price range
      filtered = filtered.filter(
        (product) =>
          product.price >= filters.priceRange[0] &&
          product.price <= filters.priceRange[1]
      );

      // Filter by rating
      if (filters.rating > 0) {
        filtered = filtered.filter(
          (product) => product.rating >= filters.rating
        );
      }

      // Sort the filtered data
      if (filters.sortBy === "priceLowToHigh") {
        filtered.sort((a, b) => a.price - b.price);
      } else if (filters.sortBy === "priceHighToLow") {
        filtered.sort((a, b) => b.price - a.price);
      }

      return filtered;
    }
  }, [cardData, filters]);

  // Fetch initial data on mount
  useEffect(() => {
    if (initialCardData) {
      setCardData(initialCardData);
    }
  }, [initialCardData]);

  // Handle filter changes
  const handleFilterChange = (filterType, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [filterType]: value }));
  };

  // Clear all filters
  const handleClearFilters = () => {
    setFilters({
      category: "",
      priceRange: [0, 5000],
      rating: 0,
      sortBy: "",
    });
  };

  async function getproductDetails(productId) {
    const productURLToCall = PRODUCT_API_ENDPOINT + "/" + productId;
    const response = await fetch(productURLToCall);
    const result = await response.json();
    return result;
  }

  const openModal = async (productId) => {
    const result = await getproductDetails(productId);
    setSelectedProduct(result);
  };

  // Close modal
  const closeModal = () => {
    console.log("product");
    setSelectedProduct(null);
  };

  return (
    <div className="product-list-container">
      {/* Filters and Sort Options */}
      <ProductFilterSort
        filters={filters}
        categories={categories}
        onFilterChange={handleFilterChange}
        onClearFilter={handleClearFilters}
      />

      {/* Display Products */}
      <div className="product-list">
        {filteredProducts.length > 0 &&
          filteredProducts.map((product) => (
            <ProductCard
              key={product?.id}
              title={product?.title}
              description={product?.description}
              imageAddress={product?.images?.[0]}
              category={product?.category}
              price={product?.price}
              rating={product?.rating}
              onClick={() => openModal(product?.id)}
            />
          ))}
      </div>

      {/* Modal to display selected product details */}
      {selectedProduct != null && (
        <ProductModal product={selectedProduct} onClose={closeModal} />
      )}
    </div>
  );
};

export default ProductListView;
