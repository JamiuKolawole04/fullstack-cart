import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8082/api", // THE API (backend) URL
});

export default instance;
