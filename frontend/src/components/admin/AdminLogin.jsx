import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    axios
      .post("https://shoe-shack-backend.vercel.app/api/v1/admin/verify-token", {}, {
        withCredentials: true, 
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        if (response.status === 200) {
          setMessage("...Restoring admin session")
          setTimeout(() => {
             navigate("/admin/panel");
          }, 1000);
        }
      })
      .catch((error) => console.log("Admin login status: Not logged in"));
  }, []);

  const onSubmit = (data) => {
    axios
      .post("https://shoe-shack-backend.vercel.app/api/v1/admin/login", data, {
        withCredentials: true, 
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        setMessage(response.data.message);
        setTimeout(() => navigate("/admin/panel"), 1000);
      })
      .catch((error) => {
        setMessage(error.response.data);
      });
      reset();
  };

  return (
    <div className=" w-full flex flex-col items-center">
      <h1 className="my-2">Admin Login</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center w-[300px] bg-gray-400 p-4"
      >
        <input
          {...register("username", { required: true })}
          className="p-2 m-1"
          placeholder="username"
        />

        <input
          {...register("password", { required: true })}
          className="p-2 m-1 hover:"
          placeholder="password"
          type="password"
        />

        <input
          type="submit"
          className="bg-green-500 p-2 m-1 hover:cursor-pointer hover:drop-shadow-xl font-bold"
        />
      </form>
      <h1 className="text-2xl">{message}</h1>
    </div>
  );
};

export default Login;
