import React from 'react'
import Home from './pages/Home'
import Events from './pages/event/Events'
import Shop from './pages/shop/Shop'
import News from './pages/news/News'
import CreatAEvent from './pages/CreatAEvent'
import Contact from './pages/contact/Contact'
import Layout from './components/layout/Layout'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Preview from './pages/preview/Preview'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import UpcomingEvents from './pages/events/UpcomingEvents'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminDashboard from './pages/admin/AdminDasboard'
import ProductForm from './pages/admin/ProductForm'
import ProductList from './pages/admin/ProductList'
import AdminUsers from './pages/admin/AdminUsers'
import Basket from './pages/wishlist-basket/Basket'
import Wishlist from './pages/wishlist-basket/Wishlist'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/events",
        element: <Events />
      },
      {
        path: "/shop",
        element: <Shop />
      },
      {
        path: "/news",
        element: <News />
      },
      // {
      //   path: "/createaevent",
      //   element: <CreatAEvent />
      // },
      {
        path: "/contact",
        element: <Contact />
      },
      {
        path: "/preview",
        element: <Preview />
      },
  
           {
        path: "/upcomingevents",
        element: <UpcomingEvents />
      },
            {
        path: "/admin",
        element: <AdminDashboard />
      },
            {
        path: "/admin/add-product",
        element: <ProductForm />
      },
      {
        path: "/admin/products",
        element: <ProductList />
      },
          {
        path: "/admin/users",
        element: <AdminUsers />
      },
            {
        path: "/basket",
        element: <Basket />
      },
             {
        path: "/wishlist",
        element: <Wishlist />
      },
    ]
  },
        {
        path: "/login",
        element: <Login />
      },
          {
        path: "/register",
        element: <Register />
      },
])
const App = () => {
  return (
    <>
    <RouterProvider router={router} />
     <ToastContainer position="top-right" autoClose={3000} /></>
  )
}

export default App