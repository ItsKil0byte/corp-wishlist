import WishCard from "../../components/WishCard";

function WishlistsNotEmpty({ wishlist }) {
	if (!wishlist) {
		return (
			<h2 className="block text-center mt-8 text-lg text-main-theme-primary font-bold">Выберите один из доступных вишлистов или создайте новый</h2>
		)
	}

	return (
		<div className="grid grid-cols-1 min-[360px]:grid-cols-2 min-[700px]:grid-cols-3 gap-2 place-items-center">
			{
				Object.keys(wishlist).map((name, index) => {
					return (
						<WishCard key={index} name={name} description={wishlist[name]} />
					)
				})
			}
		</div>
	);
}

export default WishlistsNotEmpty;