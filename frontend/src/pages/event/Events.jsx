import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Events.css";
import "../../assets/image/musician.mp4"
import imagine from "../../assets/image/download imagine pictures.jpg"
import orchastra from "../../assets/image/download orchastra.jpg"
import formula from "../../assets/image/formula1.jpg"
import orchestra from "../../assets/image/orchestra.jpg"
import guitarboy from "../../assets/image/guitarboy.avif"

const eventsData = [
  {
    id: 1,
    title: "Imagine Dragons Live Concert",
    date: "2025-09-10T20:00:00",
    location: "Bakı Konsert Zalı",
    description:
      "Əfsanəvi Imagine Dragons qrupunun canlı konserti. Sürpriz qonaqlar və xüsusi vizual effektlərlə!",
    image: imagine,
    video: "https://www.youtube.com/embed/ktvTqknDobU",
    buyLink: "https://tickets.example.com/imagine-dragons",
  },
  {
    id: 2,
    title: "Jazz Night with Norah Jones",
    date: "2025-10-05T19:30:00",
    location: "Caz Klubu",
    description:
      "Norah Jones ilə romantik və sakit caz gecəsi. Sənətçi ilə görüş fürsəti.",
    image: orchastra,
    video: "https://www.youtube.com/watch?v=M8VB5Ye3XLM&list=RDM8VB5Ye3XLM&start_radio=1",
    buyLink: "https://tickets.example.com/jazz-night",
  },
  {
    id: 3,
    title: "Formula 1 Baku Grand Prix",
    date: "2025-06-18T15:00:00",
    location: "Bakı Şəhər Halqası",
    description:
      "Sürətin və həyəcanın zirvəsi, ən sürətli yarışçıları izləyin!",
    image: formula,
    video: "https://www.formula1.com/en/video/dhl-fastest-lap-award-2024-azerbaijan-grand-prix.1810278011085228115",
    buyLink: "https://tickets.example.com/f1-baku",
  },
    {
    id: 4,
    title: "Imagine Dragons Live Concert",
    date: "2025-09-10T20:00:00",
    location: "Bakı Konsert Zalı",
    description:
      "Əfsanəvi Imagine Dragons qrupunun canlı konserti. Sürpriz qonaqlar və xüsusi vizual effektlərlə!",
    image: orchestra,
    video: "https://www.youtube.com/embed/ktvTqknDobU",
    buyLink: "https://tickets.example.com/imagine-dragons",
  },
    {
    id: 5,
    title: "Imagine Dragons Live Concert",
    date: "2025-09-10T20:00:00",
    location: "Bakı Konsert Zalı",
    description:
      "Əfsanəvi Imagine Dragons qrupunun canlı konserti. Sürpriz qonaqlar və xüsusi vizual effektlərlə!",
    image: guitarboy,
    video: "https://www.youtube.com/embed/ktvTqknDobU",
    buyLink: "https://tickets.example.com/imagine-dragons",
  },
    {
    id: 6,
    title: "Imagine Dragons Live Concert",
    date: "2025-09-10T20:00:00",
    location: "Bakı Konsert Zalı",
    description:
      "Əfsanəvi Imagine Dragons qrupunun canlı konserti. Sürpriz qonaqlar və xüsusi vizual effektlərlə!",
    image: imagine,
    video: "https://www.youtube.com/embed/ktvTqknDobU",
    buyLink: "https://tickets.example.com/imagine-dragons",
  },
];

const Events = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEvents, setFilteredEvents] = useState(eventsData);

  useEffect(() => {
    AOS.init({ duration: 1000, easing: "ease-in-out" });
  }, []);

  useEffect(() => {
    const filtered = eventsData.filter((event) =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEvents(filtered);
  }, [searchTerm]);

  const [countdown, setCountdown] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  useEffect(() => {
    const nextEvent = filteredEvents[0];
    if (!nextEvent) return;

    const interval = setInterval(() => {
      const eventDate = new Date(nextEvent.date).getTime();
      const now = new Date().getTime();
      const distance = eventDate - now;

      if (distance < 0) {
        clearInterval(interval);
        setCountdown({ days: 0, hours: 0, mins: 0, secs: 0 });
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((distance % (1000 * 60)) / 1000);

      setCountdown({ days, hours, mins, secs });
    }, 1000);

    return () => clearInterval(interval);
  }, [filteredEvents]);

  return (
    <div className="events-container">
      <div className="events-hero" data-aos="fade-down">
        <h1>Ən Yaxşı Tədbirlər və Konsertlər</h1>
        <p>Canlı musiqi və unudulmaz anlar üçün bura baxın!</p>
        <input
          className="event-search"
          type="text"
          placeholder="Tədbir axtarın..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="events-list">
        {filteredEvents.map((event) => (
          <div className="event-card" key={event.id} data-aos="fade-up">
            <div className="card-front">
              <img src={event.image} alt={event.title} className="event-img" />
              <h2>{event.title}</h2>
              <p>
                <strong>Tarix:</strong> {new Date(event.date).toLocaleString()}
              </p>
              <p>
                <strong>Yer:</strong> {event.location}
              </p>
              <p>{event.description.substring(0, 100)}...</p>
            </div>
            <div className="card-back">
              <iframe
                src={event.video}
                title={event.title}
                allowFullScreen
                loading="lazy"
              ></iframe>
              <a href={event.buyLink} target="_blank" rel="noreferrer">
                <button className="buy-btn">Bilet Al</button>
              </a>
            </div>
          </div>
        ))}
      </div>

      {filteredEvents.length > 0 && (
        <div className="event-countdown" data-aos="fade-up">
          <h2>Növbəti Tədbirə Qalır</h2>
          <div className="countdown">
            <div>
              <span>{countdown.days}</span> Gün
            </div>
            <div>
              <span>{countdown.hours}</span> Saat
            </div>
            <div>
              <span>{countdown.mins}</span> Dəqiqə
            </div>
            <div>
              <span>{countdown.secs}</span> Saniyə
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;
