import axios from "axios";
const instance = axios.create({
  baseURL: "https://amazon-clone-21km.onrender.com/",
});
export default instance;
