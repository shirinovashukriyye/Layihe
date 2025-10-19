import { useEffect, useState } from "react";
import { getProducts } from "../../api/products.js"; 
import ProductCard from "./ProductCard";
import axios from "../api/axios";


const Products = () => {
  
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts()
      .then((data) => setProducts(data))
      .catch((err) =>
        console.error("Məhsullar alınarkən xəta baş verdi:", err)
      );
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default Products;
