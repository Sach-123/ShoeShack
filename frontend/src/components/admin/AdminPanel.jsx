import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ProductList from "./ProductList";

const AdminPanel = () => {
  const [toggleBtn, setToggleBtn] = useState("View");
  const [message, setMessage] = useState();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const [file, setFile] = useState(null);

  useEffect(() => {
    axios
      .post(
        "https://shoe-shack-backend.vercel.app/api/v1/admin/verify-token",
        {},
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("unauthorized");
        }
      })
      .catch((error) => {
        navigate("/admin/login");
      });
  }, []);

  const handleBtn = (val) => {
    setToggleBtn(val);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onSubmit = (data) => {
    setMessage("Loading...");
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("category", data.category);
    formData.append("price", data.price);
    formData.append("description", data.description);

    if (file) {
      formData.append("image", file);
    }

    axios
      .post(
        "https://shoe-shack-backend.vercel.app/api/v1/admin/add-product",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        console.log(response);
        setMessage(response.data.message);
      })
      .catch((error) => {
        setMessage(error.response.data);
      });
    reset();
  };

  return (
    <div>
      <div className="flex px-24 mt-4 ">
        <div className="mr-2">
          <button
            onClick={() => handleBtn("Add")}
            className="bg-green-500 p-2 rounded hover:drop-shadow-md"
          >
            Add Product
          </button>
        </div>
        <div className="ml-2">
          <button
            onClick={() => handleBtn("View")}
            className="bg-yellow-400 p-2 rounded hover:drop-shadow-md"
          >
            View Products
          </button>
        </div>
      </div>

      <div className="form px-24 my-5 flex justify-center">
        {toggleBtn === "Add" && (
          <div className="add-form text-center">
            <h1 className="my-2">Add Form</h1>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col justify-center w-[300px] bg-gray-400 p-4 "
            >
              <input
                {...register("name", { required: true })}
                className="p-2 m-1"
                placeholder="brand name"
              />

              <input
                {...register("category", { required: true })}
                className="p-2 m-1 hover:"
                placeholder="category"
              />

              <input
                {...register("price", { required: true })}
                className="p-2 m-1 hover:"
                placeholder="price"
                type="number"
              />

              <input
                {...register("description", { required: true })}
                className="p-2 m-1 hover:"
                placeholder="description"
              />
              <h1>Choose product image</h1>

              <input
                {...register("image", { required: true })}
                className="p-2 m-1 hover:"
                placeholder="image"
                type="file"
                onChange={handleFileChange}
              />

              <input
                type="submit"
                className="bg-green-500 p-2 m-1 hover:cursor-pointer hover:drop-shadow-xl font-bold"
              />
            </form>
            <h1>{message}</h1>
          </div>
        )}

        {toggleBtn === "View" && (
          <div className="view-form text-center w-full ">
            <h1 className="my-2">Products</h1>
            <ProductList />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
