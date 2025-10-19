import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
// import { addToWishlist, addToCart, removeFromWishlist, removeFromCart } from "../../api/user.js";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [wishlisted, setWishlisted] = useState(false);
  const [inCart, setInCart] = useState(false);
  const [showTooltip, setShowTooltip] = useState("");

  const handleWishlist = async () => {
    if (!user) {
      setShowTooltip("wishlist");
      return;
    }

    try {
      if (wishlisted) {
        await removeFromWishlist(product._id);
        toast.info("WishList-dən silindi");
      } else {
        await addToWishlist(product._id);
        toast.success("WishList-ə əlavə olundu");
      }
      setWishlisted(!wishlisted);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCart = async () => {
    if (!user) {
      setShowTooltip("cart");
      return;
    }

    try {
      if (inCart) {
        await removeFromCart(product._id);
        toast.info("Səbətdən silindi");
      } else {
        await addToCart(product._id);
        toast.success("Səbətə əlavə olundu");
      }
      setInCart(!inCart);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="product-card">
      <div className="wishlist-icon" onClick={handleWishlist}>
        {wishlisted ? <FaHeart color="red" /> : <FaRegHeart />}
      </div>

      <img
        src={`http://localhost:5000/uploads/${product.image}`}
        alt={product.title}
        className="product-image"
      />
      <h3 className="product-title">{product.title}</h3>
      <p className="product-price">{product.price} AZN</p>

      <div className="product-buttons">
        <div className="button-wrapper">
          <button onClick={handleCart} className="cart-button">
            {inCart ? "Səbətdən sil 🎟" : "Bileti əldə et 🎫"}
          </button>
          {showTooltip === "cart" && !user && (
            <div className="tooltip">
              <p>Bileti almaq üçün giriş et!</p>
              <button onClick={() => navigate("/login")} className="login-link">
                Giriş et
              </button>
            </div>
          )}
        </div>
      </div>

      {showTooltip === "wishlist" && !user && (
        <div className="tooltip">
          <p>Wishlist üçün giriş et!</p>
          <button onClick={() => navigate("/login")} className="login-link">
            Giriş et
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
