import axios from 'axios'
import AuthService from "../services/AuthService.js";

export const API_URL = import.meta.env.VITE_API_URL || 'https://squarely-compatible-lungfish.cloudpub.ru/api'

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL,
})

$api.interceptors.request.use(async config => {
    console.log("Запрос попал в interceptor")
    console.log(`Запрос на url:${config.method} ${config.url}`)

    if (config.url.includes('/auth')) {
        return config
    }

    const token = localStorage.getItem('token')
    console.log(token ? `Токен не пуст: ${token}` : "Токена не оказалось в хранилище")

    if (token) {
        console.log("Помещаю токен в заголовок авторизации")
        config.headers['Authorization'] = `Bearer ${token}`
    }

    return config
})

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
                    await AuthService.telegramAuth();
                    const token = localStorage.getItem("token")

                    if (token) {
                        originReq.headers['Authorization'] = `Bearer ${token}`
                        return $api.request(originReq);
                    }
                }
            } catch (e) {
                console.log("Попытка обновить токен не удалась: ", e)
            }
        }

        return Promise.reject(error);
    }
)

export default $api
