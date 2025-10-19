import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Basket-Wishlist.css";

const Basket = () => {
  const [basketItems, setBasketItems] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    const data = JSON.parse(localStorage.getItem("basket")) || [];
    setBasketItems(data);
  }, []);

  const removeFromBasket = (id) => {
    const updated = basketItems.filter((item) => item._id !== id);
    setBasketItems(updated);
    localStorage.setItem("basket", JSON.stringify(updated));
  };

  const total = basketItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="basket-container">
      <h1 data-aos="fade-up">Səbətim 🛍️</h1>
      {basketItems.length === 0 ? (
        <p className="empty" data-aos="fade-in">Your tickets</p>
      ) : (
        <div className="basket-list">
          {basketItems.map((item, i) => (
            <div className="basket-item" key={item._id} data-aos="fade-up" data-aos-delay={i * 100}>
              <img src={`http://localhost:5000/uploads/${item.image}`} alt={item.title} />
              <div>
                <h3>{item.title}</h3>
                <p>{item.price} AZN</p>
                <button onClick={() => removeFromBasket(item._id)}>Sil</button>
              </div>
            </div>
          ))}
          <div className="basket-total" data-aos="fade-up">Toplam: {total} AZN</div>
        </div>
      )}
    </div>
  );
};

export default Basket;
