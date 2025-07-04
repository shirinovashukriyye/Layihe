import { FaBuilding } from "react-icons/fa";
import "./UpcomingEvents.css";
import React, { useRef, useEffect, useState } from "react";

const items = [
  { id: 1, title: "Card 1", color: "#fde68a" },
  { id: 2, title: "Card 2", color: "#fca5a5" },
  { id: 3, title: "Card 3", color: "#a5f3fc" },
  { id: 4, title: "Card 4", color: "#c4b5fd" },
  { id: 4, title: "Card 4", color: "#c4b5fd" },
  { id: 4, title: "Card 4", color: "#c4b5fd" },
  { id: 4, title: "Card 4", color: "#c4b5fd" },
  { id: 4, title: "Card 4", color: "#c4b5fd" },
];

const UpcomingEvents = () => {
  const sliderRef = useRef(null);
  const [scrolling, setScrolling] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      if (sliderRef.current && scrolling) {
        sliderRef.current.scrollLeft += 200; // Sağdan sola
        if (
          sliderRef.current.scrollLeft + sliderRef.current.offsetWidth >=
          sliderRef.current.scrollWidth
        ) {
          sliderRef.current.scrollLeft = 0;
        }
      }
    }, 2500); // Hər 2.5 saniyəyə bir sürüşür

    return () => clearInterval(interval);
  }, [scrolling]);
  return (
    <div>
      <div className="upcoming">
        <FaBuilding />
        <h6>Upcoming Events</h6>
      </div>
      <div className="slider-wrapper">
        <div
          className="slider-container"
          ref={sliderRef}
          onMouseEnter={() => setScrolling(false)}
          onMouseLeave={() => setScrolling(true)}
        >
          {items.map((item) => (
            <div
              className="slider-item"
              key={item.id}
              style={{ backgroundColor: item.color }}
            >
              {item.title}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UpcomingEvents;
