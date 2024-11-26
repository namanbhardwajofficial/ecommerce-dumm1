// ProductListView.js
import { useState, useEffect, useMemo, useRef } from "react";
import { PRODUCT_API_ENDPOINT } from "../../constants/constants";
import ProductCard from "../ProductCard/ProductCard";
import ProductFilterSort from "../ProductFilterSort/ProductFilterSort";
import "./ProductListView.css";
import ProductModal from "../ProductModal/ProductModal";

const ProductListView = () => {
  const [cardData, setCardData] = useState([]);
  const [categories, setCategories] = useState([]); // State to store unique categories
  const [page, setPage] = useState(1);
  const [lastElement, setLastElement] = useState(null);

  const [filters, setFilters] = useState({
    category: "",
    priceRange: [0, 5000],
    rating: 0,
    sortBy: "",
  });

  const [selectedProduct, setSelectedProduct] = useState(null);
  const observer = useRef(
    new IntersectionObserver((entries) => {
      const first = entries[0];
      if (first.isIntersecting) {
        setPage((no) => no + 1);
      }
    })
  );

  const fetchCardData = async () => {
    try {
      const response = await fetch(
        `${PRODUCT_API_ENDPOINT}?limit=10&skip=${10 * page}`
      );
      const result = await response.json();
      if (result?.products) {
        setCardData((prev) => [...prev, ...result?.products]);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchCardData();
  }, [page]);

  useEffect(() => {
    const currentElement = lastElement;
    const currentObserver = observer.current;

    if (currentElement) {
      currentObserver.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [lastElement]);

  useEffect(() => {
    if (cardData) {
      const newCategories = cardData.map((product) => product.category);
      // @ts-ignore
      const uniqueCategories = [...new Set(newCategories)];
      setCategories(uniqueCategories);
    }
  }, [page]);

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
    if (cardData) {
      setCardData(cardData);
    }
  }, [cardData]);

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

  const openModal = (productId) => {
    setSelectedProduct(productId);
  };

  // Close modal
  const closeModal = () => {
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
            <div key={product?.id} ref={setLastElement}>
              <ProductCard
                title={product?.title}
                description={product?.description}
                imageAddress={product?.images?.[0]}
                category={product?.category}
                price={product?.price}
                rating={product?.rating}
                onClick={() => openModal(product?.id)}
              />
            </div>
          ))}
      </div>

      {/* Modal to display selected product details */}
      {selectedProduct != null && (
        <ProductModal productId={selectedProduct} onClose={closeModal} />
      )}
    </div>
  );
};

export default ProductListView;
