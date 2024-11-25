import { useState, useEffect } from "react";

const useProductAPICall = (endpoint) => {
  const [productAPIResponse, setproductAPIResponse] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(endpoint);
      const result = await response.json();
      setproductAPIResponse(result?.products);
    };

    fetchData();
  }, [endpoint]);

  return productAPIResponse;
};

export default useProductAPICall;
