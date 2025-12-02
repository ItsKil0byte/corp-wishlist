import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function WishCard({id, wishlistName, name, description }) {
	const [color, setColor] = useState()
	const navigate = useNavigate()
	const colors = ["bg-gift-one-lite", "bg-gift-two-lite", "bg-gift-profile-lite"]

	useEffect(() => {
		const selectRandomColor = () => {
			const indexOfColor = Math.floor(Math.random() * (colors.length))
			setColor(colors[indexOfColor])
		}

		selectRandomColor()
	}, [])

	return (
		<div className={`${color} w-full h-40 flex flex-col px-4 rounded-lg`} onClick={() => navigate(`/wishlists/wish/view?wishlistName=${wishlistName}&wishName=${name}&wishDescription=${description}&color=${color}`)}>
			<span className="text-center text-[20px] font-semibold my-2 line-clamp-1 wrap-break-word">{name}</span>
			<span className="text-center text-[15px] font-semibold text-main-theme-primary line-clamp-4 mb-3 text-pretty wrap-anywhere">{description}</span>
		</div>
	);
}

export default WishCard;