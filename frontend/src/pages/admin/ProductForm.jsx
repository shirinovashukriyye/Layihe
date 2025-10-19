import { useState } from "react";
import axios from "axios";
import "./ProductForm.css"

const ProductForm = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    image: null,
  });

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setForm({ ...form, image: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", form.title);
    data.append("description", form.description);
    data.append("price", form.price);
    data.append("image", form.image);

    try {
      await axios.post("http://localhost:5000/api/products", data, {
        withCredentials: true,
      });
      alert("Məhsul əlavə olundu!");
    } catch (err) {
      console.error(err);
      alert("Xəta baş verdi!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <input name="title" placeholder="Başlıq" onChange={handleChange} />
      <input name="description" placeholder="Açıqlama" onChange={handleChange} />
      <input name="price" placeholder="Qiymət" type="number" onChange={handleChange} />
      <input name="image" type="file" accept="image/*" onChange={handleChange} />
      <button type="submit">Əlavə et</button>
    </form>
  );
};

export default ProductForm;
