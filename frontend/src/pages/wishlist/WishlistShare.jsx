import { NavLink, useSearchParams } from "react-router-dom";
import Header from "../../components/Header/Header";

function WishlistShare() {
	const [searchParams, _] = useSearchParams();

	const wishlistName = searchParams.get('wishlistName')

	// Дальше понадобится для создания ссылки
	//const wishlistId = searchParams.get('wishlistId')

	return (
		<div className="h-full flex flex-col items-center">
			<Header>
				<div className="h-12 w-full flex justify">
					<NavLink
						className="h-full px-4 rounded-3xl bg-main-theme-lite text-main-theme-primary font-semibold flex justify-center items-center"
						to={`/wishlists?name=${wishlistName}`}>
						назад
					</NavLink>
				</div>
			</Header>
			<span className="text-main-theme-primary text-">Этот функционал в разработке</span>
		</div>
	);
}

export default WishlistShare;