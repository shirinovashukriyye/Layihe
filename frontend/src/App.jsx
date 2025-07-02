import React from 'react'
import Home from './pages/Home'
import Events from './pages/Events'
import Shop from './pages/Shop'
import News from './pages/News'
import CreatAEvent from './pages/CreatAEvent'
import Contact from './pages/Contact'
import Layout from './components/layout/Layout'
import { createBrowserRouter, RouterProvider } from "react-router-dom"

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

    ]
  }
])
const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App