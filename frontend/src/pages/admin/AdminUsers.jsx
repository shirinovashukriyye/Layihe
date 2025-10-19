import { useEffect, useState } from "react";
import axios from "axios";
import "./admin-users.css";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userLists, setUserLists] = useState(null);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users", {
        withCredentials: true,
      });
      setUsers(res.data);
    } catch (err) {
      console.error("İstifadəçiləri gətirərkən xəta:", err);
    }
  };

  const handleToggleBlock = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/users/${id}/block`, null, {
        withCredentials: true,
      });
      fetchUsers();
    } catch (err) {
      console.error("İstifadəçini blok edərkən xəta:", err);
    }
  };

  const handleViewLists = async (id) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/users/${id}/lists`, {
        withCredentials: true,
      });
      setSelectedUser(id);
      setUserLists(res.data);
    } catch (err) {
      console.error("Wishlist və basket gətirilə bilmədi:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="admin-users">
      <h2>👥 İstifadəçi Siyahısı</h2>
      <table>
        <thead>
          <tr>
            <th>Ad</th>
            <th>Email</th>
            <th>Status</th>
            <th>Əməliyyatlar</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>{u.username}</td>
              <td>{u.email}</td>
              <td>{u.isBlocked ? "🔒 Bloklu" : "✅ Aktiv"}</td>
              <td>
                <button onClick={() => handleToggleBlock(u._id)}>
                  {u.isBlocked ? "Blokdan çıxar" : "Blokla"}
                </button>
                <button onClick={() => handleViewLists(u._id)}>📝 Siyahıları</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedUser && userLists && (
        <div className="user-lists">
          <h3>🛍️ {selectedUser} üçün Siyahılar</h3>

          <div className="lists">
            <div>
              <h4>❤️ Wishlist</h4>
              <ul>
                {userLists.wishlist.map((item) => (
                  <li key={item._id}>
                    {item.title} — {item.price} AZN
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4>🛒 Basket</h4>
              <ul>
                {userLists.cart.map((item) => (
                  <li key={item._id}>
                    {item.title} — {item.price} AZN
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
