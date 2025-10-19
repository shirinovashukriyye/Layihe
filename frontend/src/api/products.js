import axios from "./axios";

export const getProducts = async () => {
  const res = await axios.get("/products");
  return res.data;
};

export const addToWishlist = async (productId) => {
  const res = await axios.post(`/users/wishlist/${productId}`);
  return res.data;
};

export const addToCart = async (productId) => {
  const res = await axios.post(`/users/basket/${productId}`);
  return res.data;
};
