import axios from 'axios'
import WebApp from "@twa-dev/sdk";
import Storage from "../store/Storage.js";

export const API_URL = import.meta.env.VITE_API_URL || 'https://squarely-compatible-lungfish.cloudpub.ru/api'

const $api = axios.create({
	withCredentials: true,
	baseURL: API_URL,
})

const auth = async () => {
	console.log("Начинается авторизация")
	const initData = await WebApp.initData
	console.log(initData)

	const { data } = await axios.post(
		`${API_URL}/auth`,
		{ initData: initData }
	)

	console.log(data)
	await Storage.setItem('token', data.token)
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
			await auth()
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

$api.interceptors.response.use(
	(config) => {
		return config;
	}, async (error) => {
		const originReq = error.config;

		if (error.response && error.response.status === 401 && originReq && !originReq._isRetry) {
			originReq._isRetry = true;

			try {
				await auth();
				const token = await Storage.getItem("token")
				
				originReq.headers['Authorization'] = `Bearer ${token}`
				return $api.request(originReq);
			} catch (e) {
				console.log("Попытка обновить токен не удалась: ", e)
			}
		}
	}
)

export default $api