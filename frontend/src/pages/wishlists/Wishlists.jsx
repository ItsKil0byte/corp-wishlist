import WishlistsEmpty from "./WishlistsEmpty";
import WishlistsNotEmpty from "./WishlistsNotEmpty";
import wishlists from "../../mocks/wishlists.json"

function Wishlists() {
	const render = () => {
		if(wishlists && Object.keys(wishlists).length > 0) {
			return (
				<WishlistsNotEmpty names={wishlists}/>
			)
		} else {
			return (<WishlistsEmpty />)
		}
	}

	return (
		<div className="min-h-full flex flex-col items-center">
			{render()}
		</div>
	);
}

export default Wishlists;
