import "./ProductFilterSort.css";
import {
  ALL_CATEGORIES,
  ALL_RATINGS,
  CLEAR_ALL_FILTERS,
  HIGH_TO_LOW,
  LOW_TO_HIGH,
  PRICE,
  STAR_AND_UP,
  STARS,
  VALIDATION_MAX,
  VALIDATION_MIN,
} from "../../constants/constants";

const ProductFilterSort = ({
  filters,
  onFilterChange,
  onClearFilter,
  categories,
}) => {
  return (
    <div className="filters-container">
      <div className="filter-item">
        <select
          value={filters.category}
          onChange={(e) => onFilterChange("category", e.target.value)}
        >
          <option value="">{ALL_CATEGORIES}</option>
          {categories.map((category, index) => {
            return (
              <option key={index} value={category}>
                {category}
              </option>
            );
          })}
        </select>
      </div>

      <div className="filter-item">
        <input
          type="number"
          placeholder="Min Price"
          value={filters.priceRange[0] || ""}
          onChange={(e) => {
            const minPrice = parseFloat(e.target.value);
            if (isNaN(minPrice) || minPrice <= filters.priceRange[1]) {
              onFilterChange("priceRange", [
                minPrice || null,
                filters.priceRange[1],
              ]);
            } else {
              alert(VALIDATION_MIN);
            }
          }}
        />
      </div>
      <div className="filter-item">
        <input
          type="number"
          placeholder="Max Price"
          value={filters.priceRange[1] || ""}
          onChange={(e) => {
            const maxPrice = parseFloat(e.target.value);
            if (isNaN(maxPrice) || maxPrice >= filters.priceRange[0]) {
              onFilterChange("priceRange", [
                filters.priceRange[0],
                maxPrice || null,
              ]);
            } else {
              alert(VALIDATION_MAX);
            }
          }}
        />
      </div>

      <div className="filter-item">
        <select
          value={filters.rating}
          onChange={(e) => onFilterChange("rating", parseInt(e.target.value))}
        >
          <option value={0}>{ALL_RATINGS}</option>
          <option value={1}>1{STAR_AND_UP}</option>
          <option value={2}>2{STAR_AND_UP}</option>
          <option value={3}>3{STAR_AND_UP}</option>
          <option value={4}>4{STAR_AND_UP}</option>
          <option value={5}>5{STARS}</option>
        </select>
      </div>

      <div className="filter-item">
        <select
          value={filters.sortBy}
          onChange={(e) => onFilterChange("sortBy", e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="priceLowToHigh">
            {PRICE}: {LOW_TO_HIGH}
          </option>
          <option value="priceHighToLow">
            {PRICE}: {HIGH_TO_LOW}
          </option>
        </select>
      </div>
      <div className="filter-item">
        {/* Clear Filters Button */}
        <button className="clear-filters-btn" onClick={() => onClearFilter()}>
          {CLEAR_ALL_FILTERS}
        </button>
      </div>
    </div>
  );
};

export default ProductFilterSort;
