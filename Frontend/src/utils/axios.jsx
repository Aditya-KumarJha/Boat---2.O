import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5050", 
  credentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
