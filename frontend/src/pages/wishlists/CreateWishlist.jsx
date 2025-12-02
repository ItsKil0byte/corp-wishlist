import { useState } from "react";
import { useNavigate } from "react-router-dom";
import WishlistService from "../../services/WishlistService.js";

function CreateWishlist({ children }) {
	const [wishlistName, setWishlistName] = useState('')
	const [alreadyClicked, setAlreadyClicked] = useState(false)
	const navigate = useNavigate();

	const handleCreate = async () => {
		setAlreadyClicked(true)

		try {
			const res = await WishlistService.addWishlist(wishlistName)
			console.log(res.status)

			if (res.status === 201) {
				alert(`Вишлист "${wishlistName}" успешно создан`)
				navigate(`/wishlists?name=${wishlistName}`)
			} else {
				alert(`Вишлист "${wishlistName}" не был создан. Попробуйте снова.\nОшибка: ${res.statusText}`)
				setAlreadyClicked(false)
			}
		} catch (e) {
			alert(`Произошла ошибка ${e.message}`)
			setAlreadyClicked(false)
		}
	}

	return (
		<div className="min-h-full flex flex-col items-center">
			<div className="mx-auto mt-25 max-w-66">
				{children}
			</div>

			<input className="min-w-60 h-12 my-9 text-xs border-2 border-main-theme rounded-2xl pl-4 focus:outline-none"
				placeholder="Введите название вишлиста"
				value={wishlistName}
				onChange={e => setWishlistName(e.target.value)} />

			<button className={`h-13 w-33 bg-main-theme ${(alreadyClicked || wishlistName.length < 1) && "opacity-35"} rounded-3xl text-white font-bold text-2xl`}
				disabled={alreadyClicked || wishlistName.length < 1}
				onClick={handleCreate}>
				создать
			</button>
		</div>
	);
}

export default CreateWishlist;