import React, { useContext, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import cart from "../../assets/cart.png";
import profileIcon from "../../assets/profile.png";
import menu from "../../assets/menu.png";
import close from "../../assets/close.png";

const Header = () => {
  const { isLoggedIn, setIsLoggedIn, username } = useContext(AuthContext);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    axios
      .post(
        "https://shoe-shack-backend.vercel.app/api/v1/users/logout",
        {},
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => {
        setIsLoggedIn(false);
      })
      .catch((error) => {
        console.log("Error while logging out: ", error);
      });
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !event.target.closest(".profile-icon") &&
        !event.target.closest(".dropdown-menu")
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex justify-between items-center w-full px-24 h-16 sticky top-0  z-10 bg-white border-b">
      <NavLink to="/">
        <div className="logo text-2xl font-bold">
          Shoe<span className="">Shack.</span>
        </div>
      </NavLink>

      <div className="nav-container flex items-center">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `mx-5 ${isActive ? "text-red-500 font-semibold" : ""}`
          }
        >
          Products
        </NavLink>
        {isLoggedIn ? (
          <>
            <NavLink
              to="/users/cart"
              className={({ isActive }) =>
                `mx-5 flex items-center ${
                  isActive ? "text-red-500 font-semibold" : ""
                }`
              }
            >
              <img className="w-4 h-4 mr-1" src={cart} alt="Cart" />
              <span>Cart</span>
            </NavLink>
            <div className="relative mx-5">
              <div
                className="profile-icon hover:scale-105 duration-150"
                onClick={toggleDropdown}
              >
                <img
                  className="w-6 h-6 inline"
                  src={profileIcon}
                  alt="Profile"
                />
                <img
                  className="w-6 h-6 inline ml-1"
                  src={`${showDropdown ? close : menu}`}
                  alt="Toggle"
                />
              </div>
              {showDropdown && (
                <div className="flex flex-col dropdown-menu absolute w-[100px] top-4 bg-white border border-gray-300 rounded shadow-md mt-4 py-2 text-center">
                  <p className="text-center px-2 pb-2">
                    User: <strong>{username}</strong>
                  </p>
                  <NavLink
                    to="/users/orders"
                    className="block px-2 py-2 text-gray-800 hover:bg-gray-200"
                  >
                    All Orders
                  </NavLink>
                  <button
                    onClick={handleLogout}
                    className="block px-2 py-2 text-red-500 hover:bg-red-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <NavLink to="/users/login" className="mx-5">
              Login
            </NavLink>
            <NavLink to="/users/register" className="mx-5">
              Sign up
            </NavLink>
            <NavLink
              to="/admin/login"
              className="ml-5 bg-green-500 p-2 rounded"
            >
              Admin
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
