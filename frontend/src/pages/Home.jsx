import React from 'react'
import { useEffect, useState } from "react";
import Hero from '../components/hero/Hero'
import UpcomingEvents from './events/UpcomingEvents'
import axios from 'axios';
import ProductCard from './products/ProductCard.jsx';

const Home = () => {
   const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/products").then((res) => {
      setProducts(res.data);
    });
  }, []);
  return (
    <div>
      <Hero/>
      <UpcomingEvents/>
      <div className="grid grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
    </div>
  )
}

export default Home