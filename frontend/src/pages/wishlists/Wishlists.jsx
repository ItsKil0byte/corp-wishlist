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
import XScrollable from "../../components/XScrollable.jsx";

function Wishlists() {
	const [searchParams, _] = useSearchParams()
	const nameFromUrl = searchParams.get("name")

	const [wishlists, setWishlists] = useState(null)
	const [currentWishlistName, setCurrentWishlistName] = useState(nameFromUrl || null)

	const [isLoading, setIsLoading] = useState(true)

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

	if (isLoading) {
		return (
			<Loading message={"Подготавливаю ваши вишлисты"} />
		)
	}

	if (!wishlists || wishlists.length === 0) {
		return <WishlistsEmpty />
	}

	const activeWishlist = wishlists.find(wishlist => wishlist.name === currentWishlistName);

	return (
		<div className="h-full flex flex-col">
			<Header>
				<XScrollable>
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
				</XScrollable>
				<NavLink
					className="flex justify-center items-center text-lg font-semibold h-10 px-2 whitespace-nowrap rounded-4xl bg-main-theme-lite text-main-theme-primary"
					to="/wishlists/create">
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 12 12">
						<path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M6 2v8m4-4H2" />
					</svg>

				</NavLink>
				<NavLink
					className="flex justify-center items-center text-lg font-semibold h-10 px-2 whitespace-nowrap rounded-4xl bg-main-theme-lite text-main-theme-primary"
					to="/wishlists/send">
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" /></svg>
				</NavLink>
			</Header>
			{
				isLoading
					? <Loading message={"Подготавливаю ваши вишлисты"} />
					: <Wishlist wishlist={activeWishlist} />
			}
		</div>
	);
}

export default Wishlists;
