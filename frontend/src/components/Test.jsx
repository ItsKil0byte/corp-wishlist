import WebApp from "@twa-dev/sdk";
import {useEffect, useState} from "react";
import { NavLink } from "react-router-dom";
import WishlistService from "../services/WishlistService.js";
import Storage from "../store/Storage.js";

function Test() {
	const [response, setResponse] = useState('Нажми кнопку "Проверить логин"')
	const [token, setToken] = useState("");
	const initData = WebApp?.initData

	useEffect(() => {
		const getToken = async () => {
			const tkn = await Storage.getItem('token')
			setToken(tkn)
		}

		getToken()
	}, []);

	if(!initData){
		return (
			<>
				<h1>Перейдите в телеграмм для продожения работы.</h1>
				<pre>{initData}</pre>
			</>
		)
	}

	const fetchAuthLogin = async () => {
		setResponse('Обработка...')
		let url = ''
		try {
			const res = await WishlistService.getWishlists()

			setResponse(res)
		} catch (e) {
			setResponse(`Ошибка: ${e.message} ${url}`)
		}
	}

	return (
		<div className="flex flex-col gap-y-16">
			<pre className="grow">{response}</pre>
			<pre className="grow">{`Token: ${token}`}</pre>
			<pre className="grow">{JSON.stringify(WebApp.initData, null, 2)}</pre>
			<div className="flex justify-around">
				<NavLink
					to="/"
					className="bg-main-theme-lite h-16 px-8 rounded-4xl flex items-center">
					Назад
				</NavLink>
				<button
					className="bg-main-theme-lite h-16 px-8 rounded-4xl"
					onClick={() => fetchAuthLogin()}>
					Получить вишлисты
				</button>
				<button
					className="bg-main-theme-lite h-16 px-8 rounded-4xl"
					onClick={() => fetchAuthLogin()}>
					Добавить вишлист
				</button>
			</div>
		</div>
	);
}

export default Test;
