import WishlistsEmpty from "./WishlistsEmpty";
import WishlistsNotEmpty from "./WishlistsNotEmpty";
import wishlists from "../../mocks/wishlists.json"
import Header from "../../components/Header/Header";
import HeaderButton from "../../components/Header/HeaderButton";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function Wishlists() {
	const [searchParams, _] = useSearchParams()
	const nameFromUrl = searchParams.get("name")
	const [currentWishlist, setCurrentWishlist] = useState(nameFromUrl || null)
	
	
	useEffect(() => {
		const handleWishlistChange = (name) => {
			setCurrentWishlist(name)
		}

		if(nameFromUrl) {
			handleWishlistChange(nameFromUrl)
		}
	}, [nameFromUrl])

	const render = () => {
		if (wishlists && Object.keys(wishlists).length > 0) {
			return (
				<WishlistsNotEmpty wishlist={currentWishlist && wishlists[currentWishlist]} />
			)
		} else {
			return (<WishlistsEmpty />)
		}
	}

	return (
		<div className="h-full flex flex-col">
			<Header>
				<button className="text-lg font-semibold h-10 px-4 whitespace-nowrap rounded-4xl bg-main-theme-lite text-main-theme-primary">создать вишлист</button>
				{Object.keys(wishlists).map((el) => {
					return (
						<HeaderButton isDark={el === currentWishlist}>
							{el}
						</HeaderButton>
					)
				})}
			</Header>
			<div className="flex-1 overflow-y-scroll mx-4">
				{render()}
			</div>
		</div>
	);
}

export default Wishlists;
