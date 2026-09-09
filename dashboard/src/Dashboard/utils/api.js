
import axios from "axios";
 
const api = axios.create({
    // baseURL: "http://localhost:4000/api",
    baseURL: "https://bynexx.com/api",
});

export default api;