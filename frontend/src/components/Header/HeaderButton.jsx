import { NavLink } from "react-router-dom";

function HeaderButton({ children, isDark}) {
	return (
		<NavLink
			className={`flex items-center text-lg font-semibold h-10 px-4 whitespace-nowrap rounded-4xl ${isDark ? "bg-main-theme text-main-theme-lite" : "bg-main-theme-lite text-main-theme-primary"}`}
			to={`/wishlists?name=${children}`}>
			{children}
		</NavLink>
	);
}

export default HeaderButton;