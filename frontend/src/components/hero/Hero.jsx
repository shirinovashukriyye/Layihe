import React from "react";
import mahmutorhan from "../../assets/image/Mahmut Orhan.jpg";
import formula1 from "../../assets/image/formula1.jpg";
import justintimberlake from "../../assets/image/Justin Timberlake.jpg";
import orchestra from "../../assets/image/orchestra.jpg";
import clon from "../../assets/image/clon.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCube, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cube";
import "./Hero.css";
import { FaTicket } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";
import { FaHeadphones } from "react-icons/fa";
import { Link } from "react-router-dom";





const Hero = () => {
  return (
    <div>
      <Swiper
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
      
      <div className="item">
        <Link className="items">
          <FaCheckCircle className="ticket" />
          <h4>CHOOSE EVENTS AND TICKETS</h4>
        </Link>
        <Link to="preview" className="items">
          <FaHeadphones className="ticket" />
          <h4>PREVIEW</h4>
        </Link>
        <Link className="items">
          <FaTicket className="ticket" />
          <h4>SEE YOUR TİCKETS</h4>
        </Link>
      </div>
    </div>
  );
};

const slideStyle = {
  background: "#1E88E5",
  color: "#fff",
  fontSize: "40px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  userSelect: "none",
};

export default Hero;
