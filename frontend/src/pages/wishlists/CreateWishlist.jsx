import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateWishlist({ children }) {
	const [wishlistName, setWishlistName] = useState('')
	const navigate = useNavigate();

	const handleCreate = () => {
		alert(`Вишлист "${wishlistName}" успешно создан`)
		navigate(`/wishlists?name=${wishlistName}`)
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

			<button className="h-13 w-33 bg-main-theme rounded-3xl text-white font-bold text-2xl"
					onClick={handleCreate}>
				создать
			</button>
		</div>
	);
}

export default CreateWishlist;