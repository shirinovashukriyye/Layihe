import React from "react";
import "./Footer.css";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container fade-in">
        <div className="footer-section about">
          <h2>Ticketforyou</h2>
          <p>
            Tədbirlərinizi planlayın, bilet satın və auditoriyanızla bağ qurun. Eventify ilə tədbir idarəçiliyi sadə və peşəkar olur.
          </p>
          <div className="contact-info">
            <p><FaMapMarkerAlt /> Baku, Azerbaijan</p>
            <p><FaPhoneAlt /> +994 55 123 45 67</p>
            <p><FaEnvelope /> info@ticketforyou.az</p>
          </div>
          <div className="social-icons">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaInstagram /></a>
          </div>
        </div>

        <div className="footer-section posts">
          <h2>Blog</h2>
          <ul>
            <li>
              <a href="#">2025 Summer Fest üçün erkən qeydiyyat başladı</a>
              <span>İyul 10, 2025</span>
            </li>
            <li>
              <a href="#">Tədbirlərdə uğur üçün 5 əsas amil</a>
              <span>İyun 25, 2025</span>
            </li>
            <li>
              <a href="#">Spiker siyahımıza yeni adlar əlavə olundu</a>
              <span>İyun 15, 2025</span>
            </li>
          </ul>
        </div>

        <div className="footer-section newsletter">
          <h2>Abunə ol</h2>
          <p>Yeniliklər üçün email ünvanınızı daxil edin.</p>
          <form>
            <input type="email" placeholder="Email adresiniz" />
            <button type="submit">Göndər</button>
          </form>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2025 Ticketforyou ❤️</p>
      </div>
    </footer>
  );
};

export default Footer;
