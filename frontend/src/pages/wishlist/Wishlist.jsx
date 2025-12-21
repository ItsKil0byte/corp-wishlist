import { useEffect, useState } from "react";
import WishCard from "../../components/WishCard.jsx";
import WishlistEmpty from "./WishlistEmpty.jsx";
import WishService from "../../services/WishService.js";
import { useNavigate } from "react-router-dom";
import Loading from "../loading/Loading.jsx";

export default function Wishlist({ wishlist }) {
	const [wishes, setWishes] = useState(null)
	const [isLoading, setIsLoading] = useState(false)
	const navigate = useNavigate()

	useEffect(() => {
		const fetch = async () => {
			setIsLoading(true)

			const { data } = await WishService.getWishes(wishlist.id)
			console.log(data)
			setWishes(data)

			setIsLoading(false)
		}

		fetch()
	}, [wishlist])

	useEffect(() => {

	}, [isLoading])

	if(isLoading) {
		return <Loading message={"Получаю ваши желания"}/>
	}

	if (!wishes || wishes.length === 0) {
		console.dir(wishlist)
		console.log(`АЙДИ ВИШЛИСТА: ${wishlist.id}`)
		return <WishlistEmpty wishlistName={wishlist.name} wishlistId={wishlist.id} />
	}

	return (
		<div className="w-full h-full flex overflow-hidden relative">
			<div className="flex-1 overflow-y-scroll mx-4 no-scrollbar">
				<div className="grid grid-cols-1 min-[360px]:grid-cols-2 min-[700px]:grid-cols-3 gap-2 place-items-center">
					{
						wishes.map(wish => {
							return (
								<WishCard key={wish.id} id={wish.id} wishlistName={wishlist.name} name={wish.title} description={wish.description} color={wish.color}/>
							)
						})
					}
				</div>
			</div>
			<button
				onClick={() => navigate(`wish/create?wishlistName=${wishlist.name}&wishlistId=${wishlist.id}`)}
				className="bg-main-theme size-20 rounded-[50%] flex justify-center items-center absolute bottom-4 right-4">
				<svg
					version="1.1"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 533.333 533.333"
					className="h-14 w-14 fill-main-theme-lite"
				>
					<path d="M516.667,200H333.333V16.667C333.333,7.462,325.871,0,316.667,0h-100C207.462,0,200,7.462,200,16.667V200H16.667
        C7.462,200,0,207.462,0,216.667v100c0,9.204,7.462,16.666,16.667,16.666H200v183.334c0,9.204,7.462,16.666,16.667,16.666h100
        c9.204,0,16.667-7.462,16.667-16.666V333.333h183.333c9.204,0,16.667-7.462,16.667-16.666v-100
        C533.333,207.462,525.871,200,516.667,200z"/>
				</svg>
			</button>
		</div>
	)
}