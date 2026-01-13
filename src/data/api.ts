import axios from "axios";

const Api = axios.create({
  baseURL: "http://192.168.1.7:8080/v1",
  timeout: 60000,
});

export default Api;
