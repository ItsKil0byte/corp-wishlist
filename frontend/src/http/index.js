import axios from "axios";
import AuthService from "../services/AuthService.js";

export const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8080/api";

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

const usedStorage = localStorage;

$api.interceptors.request.use(async (config) => {
  console.log("Запрос попал в interceptor");
  console.log(`Запрос на url:${config.method} ${config.url}`);

  if (config.url.includes("/auth")) {
    return config;
  }

  const token = usedStorage.getItem("token");
  console.log(
    token ? `Токен не пуст: ${token}` : "Токена не оказалось в хранилище",
  );

  if (token) {
    console.log("Помещаю токен в заголовок авторизации");
    config.headers["Authorization"] = `Bearer ${token}`;
  } else {
    // TODO: Перенаправить на страницу авторизации
  }

  return config;
});

$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originReq = error.config;

    if (error.response?.status === 401 && !originReq?._isRetry) {
      originReq._isRetry = true;

      try {
        if (AuthService.isTelegramMiniApp()) {
          console.log(AuthService.isTelegramMiniApp());
          await AuthService.telegramAuth();
          const token = usedStorage.getItem("token");

          if (token) {
            originReq.headers["Authorization"] = `Bearer ${token}`;
            return $api.request(originReq);
          }
        }
      } catch (e) {
        console.log("Попытка обновить токен не удалась: ", e);
        usedStorage.removeItem("token");
        window.location.href = "/web/auth";
      }
    }

    return Promise.reject(error);
  },
);

export default $api;
