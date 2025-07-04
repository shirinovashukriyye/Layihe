import React, { useState } from 'react'
import './Login.css'
import { Link } from 'react-router-dom';

const Login = () => {
 const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
  };
  return (
     <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Giriş</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Şifrə"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Daxil ol</button>

        {/* 👇 Alt hissə əlavə olunur */}
        <p className="register-link">
          Don’t have an account yet?{' '}
          <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  )
}

export default Login