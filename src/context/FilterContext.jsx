import { createContext, useState, useContext } from "react";

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    category: "",
    priceRange: [0, 1000],
    rating: 0,
  });
  const [sortOption, setSortOption] = useState("priceLowToHigh");

  return (
    <FilterContext.Provider
      value={{ filters, setFilters, sortOption, setSortOption }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilters = () => useContext(FilterContext);
