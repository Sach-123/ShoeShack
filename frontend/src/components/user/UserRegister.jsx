import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    axios
      .post("/api/v1/users/register", data)
      .then((response) => {
        console.log(response);
        setMessage(response.data.message);
        setTimeout(() => navigate("/users/login"), 1000); 
      })
      .catch((error) => {
        console.log(error)
        setMessage(error.response.data);
      });
    reset();
  };

  return (
    <div className=" w-full flex flex-col items-center ">
      
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center w-[300px] border-2 p-4 rounded-lg"
      >
        <h1 className="my-2 pl-1 text-2xl font-bold">Register</h1>
        <input
          {...register("email", { required: true })}
          className="p-2 m-1 border"
          placeholder="Email"
        />
        <input
          {...register("username", { required: true })}
          className="p-2 m-1 border"
          placeholder="Username"
        />
        <input
          {...register("password", { required: true })}
          className="p-2 m-1 border"
          placeholder="Password"
          type="password"
        />
        <input
          type="submit"
          className="text-white bg-pink-700 p-2 m-1 hover:cursor-pointer hover:drop-shadow-xl "
        />
      </form>
      <h1>{message}</h1>
    </div>
  );
};

export default Register;
