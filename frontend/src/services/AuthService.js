import axios from "axios";
// import Storage from "../store/Storage.js";
import { API_URL } from "../http/index.js";

export default class AuthService {
  static async loginViaJWT(login, password) {
    const { data } = await axios.post(`${API_URL}/auth/login`, {
      login,
      password,
    });

    localStorage.setItem("token", data.token);
    return data;
  }

  static async registerViaJWT(login, password) {
    const { data } = await axios.post(`${API_URL}/auth/register`, {
      login,
      password,
    });

    localStorage.setItem("token", data.token);
    return data;
  }
}
