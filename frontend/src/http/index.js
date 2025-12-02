import axios from 'axios'
import WebApp from "@twa-dev/sdk";
import Storage from "../store/Storage.js";

export const API_URL = 'https://squarely-compatible-lungfish.cloudpub.ru/api'

const $api = axios.create({
	withCredentials: true,
	baseURL: API_URL,
})

const auth = async () => {
	console.log("Начинается авторизация")
	const initData = await WebApp.initData
	console.log(initData)

	const { data } = await axios.post(
		'/auth',
		{ initData: initData },
		{
			headers: { 'Content-Type': 'application/json' },
			withCredentials: true
		}
	)

	console.log(data)

	return data.token
}

$api.interceptors.request.use(async config => {
	console.log("Запрос попал в interceptor")
	console.log(`Запрос на url:${config.method} ${config.url}`)
	if (config.url.includes('/auth')) {
		return config
	}

	let token = await Storage.getItem('token')
	console.log(token ? `Токен не пуст: ${token}` : "Токена не оказалось в хранилище...Начинаю авторизацию")


	if (!token) {
		try {
			token = await auth()
			await Storage.setItem('token', token)
		} catch (e) {
			return Promise.reject(e)
		}
	}

	if (token) {
		console.log("Помещаю токен в заголовок авторизации")
		config.headers['Authorization'] = `Bearer ${token}`
	}

	return config
})

export default $api