import React from "react";
import "../css/ProductFilter.css"; // Assuming this is where your styles are defined

const ProductFilter = ({ onFilter, onSort }) => {
  return (
    <div className="filter-container">
      {/* Filter Section */}
      <div className="filter-section">
        <select onChange={(e) => onFilter(e.target.value)}>
          <option value="">Filter by Category</option>
          {/* Add your filter options here */}
        </select>
        <input
          type="number"
          placeholder="Min Price"
          onChange={(e) => onFilter(e.target.value)}
        />
        <input
          type="number"
          placeholder="Max Price"
          onChange={(e) => onFilter(e.target.value)}
        />
      </div>

      {/* Sorting Section */}
      <div className="sorting-container">
        <select onChange={(e) => onSort(e.target.value)}>
          <option value="">Sort by</option>
          <option value="price-low-to-high">Price: Low to High</option>
          <option value="price-high-to-low">Price: High to Low</option>
        </select>
      </div>

      {/* Clear Filters Button */}
      <button className="clear-filters-btn">Clear Filters</button>
    </div>
  );
};

export default ProductFilter;
