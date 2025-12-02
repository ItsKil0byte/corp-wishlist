import WishlistsEmpty from "./WishlistsEmpty";
import Header from "../../components/Header/Header";
import HeaderButton from "../../components/Header/HeaderButton";
import { useEffect, useState } from "react";
import { Navigate, NavLink, useSearchParams } from "react-router-dom";
import WishlistService from "../../services/WishlistService.js";
import Wishlist from "../wishlist/Wishlist.jsx";
import WebApp from "@twa-dev/sdk";
import Storage from "../../store/Storage.js";
import Loading from "../loading/Loading.jsx";

function Wishlists() {
	const [searchParams, _] = useSearchParams()
	const nameFromUrl = searchParams.get("name")

	const [wishlists, setWishlists] = useState(null)
	const [currentWishlistName, setCurrentWishlistName] = useState(nameFromUrl || null)

	const [isLoadind, setIsLoading] = useState(true)

	useEffect(() => {
		const fetch = async () => {
			try {
				const list = await WishlistService.getWishlists()
				setWishlists(list)

				if (list && list.length > 0 && !currentWishlistName) {
					setCurrentWishlistName(list[0].name)
				}
			} catch (e) {
				console.error(e)
			} finally {
				setIsLoading(false)
			}

		}

		fetch()
	}, [])

	useEffect(() => {
		if (nameFromUrl) {
			setCurrentWishlistName(nameFromUrl)
		}
	}, [nameFromUrl])

	if (isLoadind) {
		return (
			<div className="h-full flex justify-center items-center">
				<Loading message={"Подготавливаю ваши вишлисты"}/>
			</div>
		)
	}

	if (!wishlists || wishlists.length === 0) {
		return <WishlistsEmpty />
	}

	const activeWishlist = wishlists.find(wishlist => wishlist.name === currentWishlistName);

	return (
		<div className="h-full flex flex-col">
			<Header>
				<NavLink
					className="flex items-center text-lg font-semibold h-10 px-4 whitespace-nowrap rounded-4xl bg-main-theme-lite text-main-theme-primary"
					to="/wishlists/create">
					создать вишлист
				</NavLink>
				{
					wishlists.map((el) => {
						const name = el.name
						return (
							<HeaderButton isDark={name === currentWishlistName}>
								{name}
							</HeaderButton>
						)
					})
				}
			</Header>
			<div className="flex-1 overflow-y-scroll mx-4 no-scrollbar">
				<Wishlist wishlist={activeWishlist} />
			</div>
		</div>
	);
}

export default Wishlists;
