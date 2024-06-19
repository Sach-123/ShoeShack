import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/user/UserLayout.jsx";
import Products from "./components/products/Products.jsx";
import AdminLayout from "./components/admin/AdminLayout.jsx";
import AdminLogin from "./components/admin/AdminLogin.jsx";
import About from "./components/user/About.jsx";
import UserLogin from "./components/user/UserLogin.jsx";
import UserRegister from "./components/user/UserRegister.jsx";
import AdminPanel from "./components/admin/AdminPanel.jsx";
import ProductDetail from "./components/products/ProductDetail.jsx";
import { AuthProvider } from "./components/user/AuthContext.jsx";
import Cart from './components/user/Cart.jsx'
import AllOrder from "./components/user/AllOrder.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Products />,
      },
      {
        path: "/product/:_id",
        element: <ProductDetail />,
      },
      {
        path: "/about-us",
        element: <About />
      },
      {
        path: "/users/register",
        element: <UserRegister />
      },
      {
        path: "/users/login",
        element: <UserLogin />
      },
      {
        path: "/users/cart",
        element: <Cart />
      },
      {
        path: "/users/orders",
        element: <AllOrder />
      }
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />, // Use the AdminLayout for admin routes
    children: [
      {
        path: "panel",
        element: <AdminPanel />,
      },
      {
        path: "login",
        element: <AdminLogin />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
    <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
