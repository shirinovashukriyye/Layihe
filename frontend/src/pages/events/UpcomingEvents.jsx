import { FaBuilding } from "react-icons/fa";
import "./UpcomingEvents.css";
import ticketboxunlike from "../../assets/image/ticketboxunlike.jpg";
import linkinpark from "../../assets/image/linkin-Park.jpg";
import coldplay from "../../assets/image/Coldplay.jpg";
import videogameslive from "../../assets/image/videogameslive.jpg";
import imaginedragons from "../../assets/image/ImagineDragons.jpg";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const UpcomingEvents = () => {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  const images = [
    { src: imaginedragons, slug: "imaginedragons", title: "Imagine Dragons" },
    { src: linkinpark, slug: "linkinpark", title: "Linkin Park" },
    { src: videogameslive, slug: "videogameslive", title: "Video Games Live" },
    { src: coldplay, slug: "coldplay", title: "Coldplay" },
    { src: ticketboxunlike, slug: "ticketbox", title: "Ticketbox Events" },
  ];

  const visibleCount = 3;
  const totalSlides = images.length;
  const maxIndex = totalSlides - visibleCount;

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1 > maxIndex ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, [maxIndex]);

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + (maxIndex + 1)) % (maxIndex + 1));
  };

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % (maxIndex + 1));
  };

  const handleClick = (slug) => {
    navigate(`/concerts/${slug}`);
  };

  return (
    <div className="groups">
      <div className="upcoming">
        <FaBuilding />
        <h6>Upcoming Events</h6>
      </div>
      <div className="slider-wrapper">
        <div className="slider-header">
          <button className="slider-btn" onClick={prevSlide}>◀</button>
          <button className="slider-btn" onClick={nextSlide}>▶</button>
        </div>

        <div className="slider-container">
          <div
            className="boxes"
            style={{
              transform: `translateX(-${index * (500 + 20)}px)`,
            }}
          >
            {images.map((img, i) => (
              <div
                key={i}
                onClick={() => handleClick(img.slug)}
                className="clickable-image"
              >
                <img src={img.src} alt={img.slug} className="box-coming" />
                <div className="image-title">{img.title}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingEvents;
