import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});



export const registerUser = async (userData) => {
  const res = await axios.post("http://localhost:5000/auth/register", userData);
  return res.data;
};


export const loginUser = async (userData) => {
  const res = await axios.post("http://localhost:5000/auth/login", userData, {
    withCredentials: true, 
  });
  return res.data;
};


export const getUserInfo = async (token) => {
  const res = await API.get("/users/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
