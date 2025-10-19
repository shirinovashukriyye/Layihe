import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true, 
});

export const addToWishlist = (productId) =>
  API.post(`/wishlist/${productId}`);

export const addToCart = (productId) =>
  API.post(`/basket/${productId}`);
