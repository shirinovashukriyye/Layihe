import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Basket-Wishlist.css";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    const data = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(data);
  }, []);

  const removeFromWishlist = (id) => {
    const updated = wishlist.filter((item) => item._id !== id);
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  return (
    <div className="wishlist-container">
      <h1 data-aos="fade-up">Your favorites ❤️</h1>
      {wishlist.length === 0 ? (
        <p className="empty" data-aos="fade-in">there is empty</p>
      ) : (
        <div className="wishlist-list">
          {wishlist.map((item, i) => (
            <div className="wishlist-item" key={item._id} data-aos="fade-up" data-aos-delay={i * 100}>
              <img src={`http://localhost:5000/uploads/${item.image}`} alt={item.title} />
              <div>
                <h3>{item.title}</h3>
                <p>{item.price} AZN</p>
                <button onClick={() => removeFromWishlist(item._id)}>Sil</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
