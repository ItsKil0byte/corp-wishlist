import { NavLink, Outlet } from "react-router-dom";
import FooterNav from "./components/FooterNav";
import WebApp from "@twa-dev/sdk";

function Shell() {
	return (
		<div className="container min-w-screen min-h-screen flex flex-col bg-white">
			<div className="flex gap-3.5">
				<h2>{WebApp?.initDataUnsafe?.user?.first_name}</h2>
				<NavLink className="bg-main-theme-lite px-8 rounded-4xl" to="/test">Тестить</NavLink>
			</div>
			<main className="grow">
				<Outlet />
			</main>
			<FooterNav />
		</div>
	);
}

export default Shell;
