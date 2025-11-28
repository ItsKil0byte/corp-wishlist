import { useEffect, useState } from "react";

function WishCard({name, description}) {
	const [color, setColor] = useState()
	const colors = ["bg-gift-one-lite", "bg-gift-two-lite", "bg-gift-profile-lite"]

	useEffect(() => {
		const selectRandomColor = () => {
			const indexOfColor = Math.floor(Math.random() * (colors.length))
			setColor(colors[indexOfColor])
		}

		selectRandomColor()
	}, [])

	return (
		<div className={`${color} w-full h-40 flex flex-col px-4 rounded-lg`}>
			<span className="text-center text-[20px] font-semibold my-2 line-clamp-1">{name}</span>
			<span className="text-start text-[15px] font-semibold text-main-theme-primary line-clamp-4 mb-3">{description}</span>
		</div>
	);
}

export default WishCard;