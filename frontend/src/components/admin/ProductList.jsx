import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductList = () => {
  const [products, setProducts] = useState({
    docs: [],
    hasPrevPage: false,
    hasNextPage: false,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState({});
  const limit = 10;

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage, filter]);

  const fetchProducts = (page) => {
    axios
      .post(
        `https://shoe-shack-backend.vercel.app/api/v1/products/allProducts?page=${page}&limit=${limit}`,
        filter,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setProducts(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  };

  const deleteProduct = (id) => {
    const a = confirm("Are you sure ?");
    if (a) {
      axios
        .post(
          "https://shoe-shack-backend.vercel.app/api/v1/admin/delete-product",
          { _id: id },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then(() => {
          setProducts((prevProducts) => ({
            ...prevProducts,
            docs: prevProducts.docs.filter((product) => product._id !== id),
          }));
        })
        .catch((error) => {
          console.error("Error deleting product:", error);
        });
    }
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const toggleCategory = (category) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      category: prevFilter.category === category ? "" : category,
    }));
    setCurrentPage(1);
  };

  const toggleName = (name) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      name: prevFilter.name === name ? "" : name,
    }));
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
    setCurrentPage(1);
  };

  const clearFilter = () => {
    setFilter({});
  };

  return (
    <div className="flex min-h-screen px-24">
      <div className="sidebar w-[250px] min-w-[250px] bg-[#F0EEED] text-center px-4 my-4 rounded-xl">
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
        <div className="pagination flex justify-center mt-4 mb-4">
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
        <div className="product-list flex flex-col justify-around bg-[#F0EEED] rounded-lg shadow-md">
          {products.docs.map((product) => (
            <div
              key={product._id}
              className="flex justify-between m-3 bg-white items-center "
            >
              <div className="product-image">
                <img
                  src={product.image}
                  alt=""
                  className="min-w-[200px] max-w-[200px] h-[175px] bg-black"
                />
              </div>
              <div className="product-name">
                <h1 className="font-bold">Brand </h1>
                <h1>{product.name}</h1>
              </div>
              <div className="product-category">
                <h1 className="font-bold">Category</h1>
                <h1>{product.category}</h1>
              </div>
              <div className="product-description max-w-[150px] max-h-[100px] overflow-hidden">
                <h1 className="font-bold">Description</h1>
                <div className="max-h-[100px] overflow-y-auto">
                  {product.description}
                </div>
              </div>

              <div className="product-price">
                <h1 className="font-bold">Price</h1>
                <h1>₹{product.price}</h1>
              </div>

              <div className="remove-product">
                <button
                  onClick={() => deleteProduct(product._id)}
                  className="mr-5 bg-red-500 p-2 rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
