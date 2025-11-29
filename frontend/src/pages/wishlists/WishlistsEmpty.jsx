import CreateWishlist from "./CreateWishlist";

function WishlistsEmpty() {
	return (
		<CreateWishlist>
			<h1 className="font-bold text-2xl text-center">{"Здесь пока ничего нет"}</h1>
			<h1 className="font-bold text-2xl text-center">{"Давайте создадим новый вишлист:)"}</h1>
		</CreateWishlist>
	);
}

export default WishlistsEmpty;
