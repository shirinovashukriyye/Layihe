import React from 'react'
import Home from './pages/Home'
import Events from './pages/Events'
import Shop from './pages/Shop'
import News from './pages/News'
import CreatAEvent from './pages/CreatAEvent'
import Contact from './pages/Contact'
import Layout from './components/layout/Layout'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Preview from './pages/preview/Preview'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import UpcomingEvents from './pages/events/UpcomingEvents'

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
      {
        path: "/createaevent",
        element: <CreatAEvent />
      },
      {
        path: "/contact",
        element: <Contact />
      },
      {
        path: "/preview",
        element: <Preview />
      },
        {
        path: "/login",
        element: <Login />
      },
          {
        path: "/register",
        element: <Register />
      },
           {
        path: "/upcomingevents",
        element: <UpcomingEvents />
      },

    ]
  }
])
const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App