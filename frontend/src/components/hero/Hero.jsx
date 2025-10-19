// import React from "react";
import formula1 from "../../assets/image/formula1.jpg";
import clon from "../../assets/image/clon.jpg";
import orchestra from "../../assets/image/orchestra.jpg";
import karting from "../../assets/image/karting.jpg";
 import { Swiper, SwiperSlide } from "swiper/react";
 import "swiper/css";
import "swiper/css/autoplay";
import { Navigation, Pagination, Autoplay } from "swiper/modules"

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Hero.css";
import { FaTicket } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";
import { FaHeadphones } from "react-icons/fa";
import { Link } from "react-router-dom";
// import "../../pages/swiper/Swiper.jsx"
import React, { useEffect, useState } from "react";




const Hero = () => {
  const images = [
  clon,
  formula1,
  orchestra,
  karting,
];


  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    const nextIndex = (activeIndex + 1) % slides.length;
    setActiveIndex(nextIndex);
  };

  useEffect(() => {
    let ticking = false;
    const onScroll = (e) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("wheel", onScroll);
    return () => window.removeEventListener("wheel", onScroll);
  }, [activeIndex]);
  return (
    <div>
      {/* <Swiper
  direction="vertical"
  effect="cube"
  loop={true}
  grabCursor={false}
  allowTouchMove={false}
  autoplay={{
    delay: 3000,
    disableOnInteraction: false,
  }}
  speed={1500}
  cubeEffect={{
    shadow: true,
    slideShadows: true,
    shadowOffset: 20,
    shadowScale: 0.94,
  }}
  modules={[EffectCube, Autoplay]}
  style={{
    width: "100%",
    height: "610px",
    cursor: "default",
  }}
  onSlideChange={() => {
    // Scroll-un dəyişməsinin qarşısını alır
    window.scrollTo({
      top: window.scrollY,
      // behavior: "auto",
    });
  }}
      >
        <SwiperSlide>
          <img
            src={mahmutorhan}
            alt=""
            style={slideStyle}
            className="concertimage"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={formula1}
            alt=""
            style={slideStyle}
            className="concertimage"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={orchestra}
            alt=""
            style={slideStyle}
            className="concertimage"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={justintimberlake}
            alt=""
            style={slideStyle}
            className="concertimage"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img src={clon} alt="" style={slideStyle} className="concertimage" />
        </SwiperSlide>
      </Swiper>
   */}
       {/* <div className="slider-container">
      {slides.map((slide, index) => (
        <div
          className={`slide ${index === activeIndex ? "active" : ""}`}
          key={index}
          style={{ backgroundImage: `url(${slide})` }}
        ></div>
      ))}

      <div className="dots">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === activeIndex ? "active" : ""}`}
            onClick={() => setActiveIndex(index)}
          ></span>
        ))}
      </div>
    </div> */}
      <div className="swiper-container">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        navigation={true}
        pagination={{ clickable: true }}
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <img src={img} alt={`slide-${index}`} className="slide-image" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
      <div className="item">
        <Link to={"basket"} className="items">
          <FaCheckCircle className="ticket" />
          <h4>CHOOSE EVENTS AND TICKETS</h4>
        </Link>
        <Link to="preview" className="items">
          <FaHeadphones className="ticket" />
          <h4>PREVIEW</h4>
        </Link>
        <Link to={"basket"} className="items">
          <FaTicket className="ticket" />
          <h4>SEE YOUR TİCKETS</h4>
        </Link>
      </div>
    </div>
  );
};

// const slideStyle = {
//   background: "#1E88E5",
//   color: "#fff",
//   fontSize: "40px",
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
//   height: "100%",
//   userSelect: "none",
// };

export default Hero;
