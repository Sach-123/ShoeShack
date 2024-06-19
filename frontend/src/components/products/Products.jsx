import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState({
    docs: [],
    hasPrevPage: false,
    hasNextPage: false,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState({});

  const limit = 9;

  useEffect(() => {
    fetchProducts(currentPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage, filter]);

  const fetchProducts = (page) => {
    axios
      .post(`/api/v1/products/allProducts?page=${page}&limit=${limit}`, filter)
      .then((response) => {
        setProducts(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const toggleCategory = (category) => {
    setFilter((prevFilter) => {
      const isCategoryUnselected = prevFilter.category === category;
      if (isCategoryUnselected) {
        const { category, ...rest } = prevFilter; 
        return rest;
      } else {
        return {
          ...prevFilter,
          category: category,
        };
      }
    });
    setCurrentPage(1);
  
  };

  const toggleName = (name) => {
    setFilter((prevFilter) => {
      const isNameUnselected = prevFilter.name === name;
      if (isNameUnselected) {
        const { name, ...rest } = prevFilter; 
        return rest;
      } else {
        return {
          ...prevFilter,
          name: name,
        };
      }
    });
    setCurrentPage(1);

  };

  const handlePriceChange = (event) => {
    const value = event.target.value;
    if (value === "") {
      setFilter((prevFilter) => {
        const newFilter = { ...prevFilter };
        delete newFilter.price;
        return newFilter;
      });
    } else {
      const [low, high] = value.split("-").map(Number);
      setFilter((prevFilter) => ({
        ...prevFilter,
        price: { $gte: low, $lte: high },
      }));
    }
    setCurrentPage(1)

  };

  const clearFilter = () => {
    setFilter({});
  };

  return (
    <div className="flex min-h-screen px-24">
      <div className="sidebar w-[300px] min-w-[300px] bg-[#F0EEED] text-center px-4 my-4 rounded-xl">
        <p className="font-bold text-lg text-black">Filters</p>
        <div className="mt-4">
          <p className="font-semibold">Category:</p>
          <div className="flex flex-wrap justify-center">
            {["Training", "Running", "Sports", "Casual"].map((category) => (
              <button
                key={category}
                onClick={() => toggleCategory(category)}
                className={`m-1 p-2 rounded ${
                  filter.category === category
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-4">
          <p className="font-semibold">Brand:</p>
          <div className="flex flex-wrap justify-center">
            {["Nike", "Puma", "Adidas", "Campus", "Asian"].map((name) => (
              <button
                key={name}
                onClick={() => toggleName(name)}
                className={`m-1 p-2 rounded ${
                  filter.name === name
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300"
                }`}
              >
                {name}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-4">
          <p className="font-semibold">Price:</p>
          <select
            className="m-1 p-2 rounded bg-gray-300"
            onChange={handlePriceChange}
          >
            <option value="">All</option>
            <option value="500-2500">500-2500</option>
            <option value="2500-5000">2500-5000</option>
            <option value="5000-7500">5000-7500</option>
            <option value="7500-10000">7500-10000</option>
          </select>
        </div>
        <button
          onClick={clearFilter}
          className="mt-2 mb-4 p-2 rounded text-red-500 underline"
        >
          Clear All Filter
        </button>
      </div>
      <div className="product-section flex flex-col flex-grow p-4">
        <div className="product-list flex flex-wrap justify-center bg-[#F0EEED] p-4 rounded-lg shadow-md">
          {products.docs.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
        <div className="pagination flex justify-center mt-4">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1 || !products.hasPrevPage}
            className="bg-gray-400 p-2 rounded-l-lg disabled:opacity-50"
          >
            Previous
          </button>
          <span className="p-2 bg-white border-t border-b border-gray-400">
            Page {currentPage}
          </span>
          <button
            onClick={handleNextPage}
            disabled={!products.hasNextPage}
            className="bg-gray-400 p-2 rounded-r-lg disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Products;
