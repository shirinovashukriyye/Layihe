import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "./News.css";
import musician from"../../assets/image/musician.mp4"

const News = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

const videos = [
  {
    id: 1,
    title: "Formula 1 Baku Highlights",
    desc: "Bakıda sürətin və həyəcanın zirvəsi!",
    src: musician, 
    type: "local", 
  },
  {
    id: 2,
    title: "Justin Timberlake Live",
    desc: "Canlı səhnədə Justin Timberlake şousu!",
    src: "https://www.youtube.com/embed/SeG6mrmcCfI",
    type: "youtube",
  },

];


  const images = [
    { src: "/images/concert1.jpg", caption: "Əfsanəvi gecə 🔥" },
    { src: "/images/theatre.jpg", caption: "Dərin səhnə oyunu 🎭" },
    { src: "/images/fans.jpg", caption: "Coşqu dolu anlar ❤️" },
    { src: "/images/music.jpg", caption: "Ruhun musiqisi 🎶" },
    { src: "/images/lights.jpg", caption: "İşıqlar və səslər 🌟" },
  ];

  return (
    <div className="news-wrapper">
      <h1 className="news-header" data-aos="fade-up">
        🎬 Tədbir Xəbərləri və Yeniliklər
      </h1>

      <div className="swiper-section" data-aos="zoom-in">
        <Swiper spaceBetween={30} slidesPerView={1} loop>
          {videos.map((v) => (
            <SwiperSlide key={v.id}>
              <div className="video-slide">
                <div className="video-wrapper">
                  <iframe
                    src={v.src}
                    title={v.title}
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="video-caption">
                  <h2>{v.title}</h2>
                  <p>{v.desc}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <h2 className="gallery-header" data-aos="fade-up">
        🖼️ Konsert və Tədbir Anları
      </h2>
      <div className="news-gallery">
        {images.map((img, i) => (
          <div
            className="gallery-item"
            key={i}
            data-aos="fade-up"
            data-aos-delay={i * 100}
          >
            <img src={img.src} alt={img.caption} />
            <div className="caption">{img.caption}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
