import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

import { AuthContext } from "./AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const { register, handleSubmit, reset } = useForm();

  const { setIsLoggedIn, setUsername } = useContext(AuthContext);

  const onSubmit = (data) => {
    axios
      .post("https://shoe-shack-backend.vercel.app/api/v1/users/login", data)
      .then((response) => {
        setUsername(response.data.data.username)
        setMessage(response.data.message);
        setIsLoggedIn(true);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      })
      .catch((error) => {
        setMessage(error.response.data);
      });
    reset();
  };

  return (
      <div className="w-full flex flex-col items-center p-4 ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col justify-center w-[300px] p-4 border-2 rounded-lg"
        ><h1 className="my-2 text-2xl ml-1 font-bold">Login</h1>
          <input
            {...register("email", { required: true })}
            className="p-2 m-1 border"
            placeholder="Email"
          />
          <input
            {...register("password", { required: true })}
            className="p-2 m-1 border"
            placeholder="Password"
            type="password"
          />
          <input
            type="submit"
            className="bg-pink-700 p-2 m-1 cursor-pointer hover:drop-shadow-xl text-white"
          />
        </form>
        {message === "User is not registered" ? (
          <h1>
            {message}.{" "}
            <NavLink
              to="/users/register"
              className="underline text-red-500 hover:text-red-700"
            >
              Register here
            </NavLink>
          </h1>
        ) : (
          <h1>{message}</h1>
        )}
      </div>
  );
};

export default Login;
