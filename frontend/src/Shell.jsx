import { NavLink, Outlet } from "react-router-dom";
import FooterNav from "./components/FooterNav";
import WebApp from "@twa-dev/sdk";

function Shell() {
	return (
		<div className="w-screen h-screen flex flex-col bg-white">
			<main className="flex-1 overflow-hidden relative">
				<Outlet />
			</main>
			<FooterNav />
		</div>
	);
}

export default Shell;
