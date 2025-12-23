import { NavLink } from "react-router-dom";

function FooterNav() {
	const footerBtnStyle = "flex flex-col justify-center items-center bg-transparent grow rounded-4xl"

	return (
		<nav className="h-11 flex flex-row justify-around bg-main-theme-lite rounded-4xl mx-5 my-2 p-0.5">
			<NavLink
				to="/wishlists"
				className={({ isActive }) => footerBtnStyle + (isActive && " bg-white font-bold")}
			>Вишлисты</NavLink>

			<NavLink
				to="/groups"
				className={({ isActive }) => footerBtnStyle + (isActive && " bg-white font-bold")}
			>Группы</NavLink>

			<NavLink
				to="/profile"
				className={({ isActive }) => footerBtnStyle + (isActive && " bg-white font-bold")}
			>Профиль</NavLink>
		</nav>
	);
}

export default FooterNav;
