import "./Contact.css";
import mailIcon from "../../assets/mail.svg";
import phoneIcon from "../../assets/phone.svg";
import locationIcon from "../../assets/location.svg";
import { useState } from "react";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Mesaj:", form);
    alert("🎉 Mesajınız göndərildi! Təşəkkür edirik.");
  };

  return (
    <div className="contact-wrapper">
      <div className="contact-hero">
        <h1>📬 Bizimlə Əlaqə Saxla</h1>
        <p>İstənilən sual, təklif və əməkdaşlıq üçün bizimlə əlaqə saxlayın.</p>
      </div>

      <div className="contact-main">
        <div className="contact-form-card">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Ad Soyad"
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email Ünvanı"
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder="Mesajınız..."
              rows="6"
              onChange={handleChange}
              required
            ></textarea>
            <button type="submit">Göndər ➤</button>
          </form>
        </div>

        <div className="contact-info-card">
          <div className="info-block">
            <img src={mailIcon} alt="email" />
            <div>
              <h4>Email</h4>
              <p>info@layihe.az</p>
            </div>
          </div>

          <div className="info-block">
            <img src={phoneIcon} alt="phone" />
            <div>
              <h4>Telefon</h4>
              <p>+994 50 123 45 67</p>
            </div>
          </div>

          <div className="info-block">
            <img src={locationIcon} alt="location" />
            <div>
              <h4>Ünvan</h4>
              <p>Bakı, Azərbaycan</p>
            </div>
          </div>
        </div>
      </div>

      <div className="map-section">
     <iframe
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d194472.76852968143!2d49.69014817778231!3d40.394737008113935!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307d6bd6211cf9%3A0x343f6b5e7ae56c6b!2zQmFrxLE!5e0!3m2!1saz!2saz!4v1752403858954!5m2!1saz!2saz"
  width="600"
  height="450"
  style={{ border: 0 }}
  allowFullScreen
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
/>

      </div>
    </div>
  );
};

export default Contact;
