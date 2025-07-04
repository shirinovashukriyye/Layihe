import React, { useState } from 'react'
import './Register.css'

const Register = () => {
      const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError('Şifrələr eyni deyil!');
      return;
    }

    console.log('Qeydiyyat məlumatları:', formData);
    setError('');
  };
  return (
    <div>
        <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form">
        <h2>Qeydiyyat</h2>

        {error && <div className="error">{error}</div>}

        <input
          type="text"
          name="name"
          placeholder="Ad"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="username"
          placeholder="İstifadəçi adı"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Şifrə"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Şifrəni təkrar et"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />

        <button type="submit">Qeydiyyatdan keç</button>
      </form>
    </div>
    </div>
  )
}

export default Register