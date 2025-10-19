import { useState } from "react";
import { registerUser } from "../../api/auth.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.username || !formData.email) {
      toast.error("Bütün sahələri doldurun!", { theme: "colored" });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Şifrələr eyni deyil!", { theme: "colored" });
      return;
    }

    if (!validatePassword(formData.password)) {
      toast.error("Şifrə minimum 8 simvol, böyük hərf, kiçik hərf, rəqəm və simvol daxil etməlidir!", {
        position: "top-center",
        theme: "colored"
      });
      return;
    }

    try {
      await registerUser(formData);
      toast.success("Qeydiyyat uğurla tamamlandı", { theme: "colored" });
      navigate("/login", { state: { registered: true } });
    } catch (err) {
      toast.error(err.response?.data?.message || "Xəta baş verdi", { theme: "colored" });
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form">
        <h2>Qeydiyyat</h2>

        <input
          type="text"
          name="name"
          placeholder="Ad"
          value={formData.name}
          onChange={handleChange}
          required
          className={error && !formData.name ? "error-input" : ""}
        />

        <input
          type="text"
          name="username"
          placeholder="İstifadəçi adı"
          value={formData.username}
          onChange={handleChange}
          required
          className={error && !formData.username ? "error-input" : ""}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className={error && !formData.email ? "error-input" : ""}
        />

        <input
          type="password"
          name="password"
          placeholder="Şifrə"
          value={formData.password}
          onChange={handleChange}
          required
          className={!validatePassword(formData.password) ? "error-input" : ""}
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Şifrəni təkrar et"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          className={formData.password !== formData.confirmPassword ? "error-input" : ""}
        />

        <button type="submit">Qeydiyyatdan keç</button>
      </form>
    </div>
  );
};

export default Register;
