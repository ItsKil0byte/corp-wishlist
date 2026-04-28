import axios from "axios";
import $api from "../http/index.js";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";
const URL = API_URL.endsWith("/api") ? API_URL.slice(0, -4) : API_URL;

export default class LinkService {
  static async getLinkInfo(type, entityId, expiresAt = null) {
    const { data } = await $api.post("/links", {
      type: type,
      entityId: entityId,
      expiresAt: expiresAt,
    });

    return data;
  }

  static async getEntity(token) {
    const { data } = await axios.get(`${URL}/public/link/${token}`);
    return data;
  }

  static async joinToGroup(token) {
      const jwtToken = localStorage.getItem("token");

      const { data } = await axios.post(
          `${URL}/public/link/${token}/join`,
          {},
          {
              headers: {
                  Authorization: `Bearer ${jwtToken}`
              }
          }
      );    return data;
  }
}
