import axios from "axios";
import ApiAuthGuard from "../guards/api-auth.guard.ts";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default  ApiAuthGuard(api);
