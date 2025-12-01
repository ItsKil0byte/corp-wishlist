import WebApp from "@twa-dev/sdk";
import mockInitData from '../mocks/initData.json'
import { useState } from "react";
import { NavLink } from "react-router-dom";

function Test() {
	const [response, setResponse] = useState('Нажми кнопку "Проверить логин"')
	const isTelegramApiAvailable = WebApp?.initDataUnsafe && Object.keys(WebApp.initDataUnsafe).length > 0

	const fetchAuthLogin = async () => {
		setResponse('Обработка...')
		try {
			const res = await fetch('http://localhost:8080/api/auth', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(isTelegramApiAvailable ? WebApp.initData: mockInitData)
			})
	
			setResponse(JSON.stringify({
				status: res.status,
				statusText: res.statusText,
				response: res.body,
				url: res.url
			}, null, 4))
		} catch (e) {
			setResponse(`Ошибка: ${e.message}`)
		}
	}

	return (
		<div className="flex flex-col gap-y-16">
			<pre className="grow">{response}</pre>
			<pre className="grow">{JSON.stringify(isTelegramApiAvailable ? WebApp.initData : mockInitData, null, 2)}</pre>
			<div className="flex justify-around">
				<NavLink
					to="/"
					className="bg-main-theme-lite h-16 px-8 rounded-4xl flex items-center">
					Назад
				</NavLink>
				<button
					className="bg-main-theme-lite h-16 px-8 rounded-4xl"
					onClick={() => fetchAuthLogin()}>
					Проверить логин
				</button>
			</div>
		</div>
	);
}

export default Test;
