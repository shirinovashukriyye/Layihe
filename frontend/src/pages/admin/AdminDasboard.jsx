import { Link } from "react-router-dom";
import "./AdminDasboard.css"

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <h1>🛠️ Admin Panel</h1>
      <ul>
        <li>
          <Link to="/admin/users">👥 İstifadəçilər</Link>
        </li>
        <li>
          <Link to="/admin/products">📦 Bütün Məhsullar</Link>
        </li>
        <li>
          <Link to="/admin/add-product">➕ Yeni Məhsul Əlavə Et</Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminDashboard;
