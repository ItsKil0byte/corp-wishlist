import { NavLink, Outlet } from "react-router-dom";
import FooterNav from "./components/FooterNav";
import WebApp from "@twa-dev/sdk";

function Shell() {
	return (
		<div className="w-screen h-screen flex flex-col bg-white">
			{/*<div className="flex gap-3.5">*/}
			{/*	<h2>{WebApp?.initDataUnsafe?.user?.first_name}</h2>*/}
			{/*	<NavLink className="bg-main-theme-lite px-8 rounded-4xl" to="/test">Тестить</NavLink>*/}
			{/*</div>*/}
			<main className="flex-1 overflow-hidden relative">
				<Outlet />
			</main>
			<FooterNav />
		</div>
	);
}

export default Shell;
