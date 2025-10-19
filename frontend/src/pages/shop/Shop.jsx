import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Shop.css";

const Shop = () => {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  const filtered = events.filter((e) =>
    e.title.toLowerCase().includes(search.toLowerCase()) &&
    (category === "" || e.category === category)
  );

  return (
    <div className="shop-container">
      <div className="shop-sidebar">
        <input
          type="text"
          placeholder="Axtarış..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select onChange={(e) => setCategory(e.target.value)}>
          <option value="">Bütün Kateqoriyalar</option>
          <option value="concert">Konsert</option>
          <option value="theatre">Teatr</option>
          <option value="movie">Kino</option>
        </select>
      </div>

      <div className="shop-grid">
        {filtered.length === 0 ? (
          <p className="no-events">Heç bir tədbir tapılmadı.</p>
        ) : (
          filtered.map((event) => (
            <div className="event-card" key={event._id}>
              <img
                src={`http://localhost:5000/uploads/${event.image}`}
                alt={event.title}
              />
              <div className="event-info">
                <h3>{event.title}</h3>
                <p className="event-date">🗓 {event.date}</p>
                <p className="event-location">📍 {event.location}</p>
                <p className="event-price">💸 {event.price} ₼</p>
                <button
                  className="buy-btn"
                  onClick={() => navigate(`/event/${event._id}`)}
                >
                  Bileti al
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Shop;
