import WebApp from "@twa-dev/sdk";
import mockInitData from '../mocks/initData.json'
import { useState } from "react";

function Test() {
	const [response, setResponse] = useState('')
	console.log(WebApp?.initDataUnsafe)
	const isTelegramApiAvailable = WebApp?.initDataUnsafe && Object.keys(WebApp.initDataUnsafe).length > 0
	console.log(isTelegramApiAvailable)
	const fetchAuthLogin = async () => {
		const res = await fetch('http://localhost:8080/api/auth', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: isTelegramApiAvailable ? WebApp.initDataUnsafe : mockInitData
		})

		setResponse(JSON.stringify({
			status: res.status,
			statusText: res.statusText,
			url: res.url
		}, null, 4))
	}

	return (
		<div className="flex flex-col">
			<pre className="grow">{response}</pre>
			<pre className="grow">{JSON.stringify(isTelegramApiAvailable ? WebApp.initDataUnsafe : mockInitData, null, 4)}</pre>
			<button
				className="bg-main-theme-lite h-16 px-8 rounded-4xl block mx-auto"
				onClick={() => fetchAuthLogin()}>
				Проверить логин
			</button>
		</div>
	);
}

export default Test;
