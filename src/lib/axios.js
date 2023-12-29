import axios from "axios";

const fetcher = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "ngrok-skip-browser-warning": "69420",
  },
});

export default fetcher;
