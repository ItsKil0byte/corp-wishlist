function WishlistsNotEmpty({ names }) {
	return (
		<div>
			{Object.keys(names).map((name) => {
				return <h2>{name}</h2>
			})}
		</div>
	);
}

export default WishlistsNotEmpty;