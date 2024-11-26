// ProductFilterSort.js
import React from "react";
import "./ProductFilterSort.css";

const ProductFilterSort = ({ filters, onFilterChange, onClearFilter }) => {
  return (
    <div className="filters-container">
      <div className="filter-item">
        <select
          value={filters.category}
          onChange={(e) => onFilterChange("category", e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="fashion">Fashion</option>
          <option value="home">Home</option>
        </select>
      </div>

      <div className="filter-item">
        <input
          type="number"
          placeholder="Min Price"
          onChange={(e) =>
            onFilterChange("priceRange", [
              parseFloat(e.target.value) || 0,
              filters.priceRange[1],
            ])
          }
        />
      </div>
      <div className="filter-item">
        <input
          type="number"
          placeholder="Max Price"
          onChange={(e) =>
            onFilterChange("priceRange", [
              filters.priceRange[0],
              parseFloat(e.target.value) || Infinity,
            ])
          }
        />
      </div>

      <div className="filter-item">
        <select
          value={filters.rating}
          onChange={(e) => onFilterChange("rating", parseInt(e.target.value))}
        >
          <option value={0}>All Ratings</option>
          <option value={1}>1 Star & up</option>
          <option value={2}>2 Stars & up</option>
          <option value={3}>3 Stars & up</option>
          <option value={4}>4 Stars & up</option>
          <option value={5}>5 Stars</option>
        </select>
      </div>

      <div className="filter-item">
        <select
          value={filters.sortBy}
          onChange={(e) => onFilterChange("sortBy", e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="priceLowToHigh">Price: Low to High</option>
          <option value="priceHighToLow">Price: High to Low</option>
        </select>
      </div>
      <div className="filter-item">
        {/* Clear Filters Button */}
        <button className="clear-filters-btn" onClick={() => onClearFilter()}>
          Clear All Filters
        </button>
      </div>
    </div>
  );
};

export default ProductFilterSort;
