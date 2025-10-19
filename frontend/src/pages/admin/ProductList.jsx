import { useEffect, useState } from "react";
import axios from "axios";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const res = await axios.get("http://localhost:5000/api/products");
    setProducts(res.data);
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Silmək istədiyinizə əminsiniz?")) return;
    await axios.delete(`http://localhost:5000/api/products/${id}`, {
      withCredentials: true,
    });
    fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h2>Məhsullar</h2>
      <ul>
        {products.map((p) => (
          <li key={p._id}>
            <img src={`http://localhost:5000/uploads/${p.image}`} width="50" />
            <strong>{p.title}</strong> - {p.price} AZN
            <button onClick={() => deleteProduct(p._id)}>Sil</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
