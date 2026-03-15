import WebApp from "@twa-dev/sdk";
import axios from "axios";
// import Storage from "../store/Storage.js";
import {API_URL} from "../http/index.js";

export default class AuthService {

    static isTelegramMiniApp() {
        if (typeof window === 'undefined') {
            return false;
        }

        try {
            return !!(window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.initData);
        } catch (e) {
            console.error(e.toString());
            return false;
        }
    }

    static async telegramAuth() {
        console.log("Начинается авторизация через Telegram")
        const initData = await WebApp.initData
        console.log(initData)

        const { data } = await axios.post(
            `${API_URL}/auth/telegram`,
            { initData: initData }
        )

        console.log(data)
        localStorage.setItem('token', data.token)
        return data
    }

    static async loginViaJWT(login, password) {
        const { data } = await axios.post(
            `${API_URL}/auth/login`,
            { login, password }
        )

        localStorage.setItem('token', data.token)
        return data
    }

    static async registerViaJWT(login, password) {
        const { data } = await axios.post(
            `${API_URL}/auth/register`,
            { login, password }
        )

        localStorage.setItem('token', data.token)
        return data
    }
}