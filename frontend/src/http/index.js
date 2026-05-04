import axios from "axios";

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
    window.location.href = "/auth";
  }

  return config;
});

$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    if (error.response?.status === 401) {
      console.warn("Сессия истекла. Выполняем выход...");

      usedStorage.removeItem("token");

      window.location.href = "/auth";
    }

    return Promise.reject(error);
  },
);

export default $api;
