import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import HeaderButton from "../../components/Header/HeaderButton";
import { useState } from "react";
import WishService from "../../services/WishService";

function CreateWish() {
	const [searchParams, _] = useSearchParams()
	const wishlistName = searchParams.get("wishlistName")
	const wishlistId = searchParams.get("wishlistId")

	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [alreadyClicked, setAlreadyClicked] = useState(false)

	const navigate = useNavigate()

	const handleCreate = async () => {
		setAlreadyClicked(true)
		try {
			const res = await WishService.addWish(title, description, wishlistId)

			console.log(res.status)

			if(res.status === 201 || res.status === 200) {
				alert(`Желание "${title}" было успешно добавлено`)
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
		<div className="min-h-full w-full flex flex-col">
			<Header>
				<div className="w-full h-full flex-col items-start">
					<NavLink
						className="flex items-center justify-center text-lg font-semibold w-25 h-10 px-4 whitespace-nowrap rounded-4xl bg-main-theme-lite text-main-theme-primary"
						to="/">отмена</NavLink>
				</div>
			</Header>
			<main className="flex flex-col grow gap-8">
				<input
					placeholder="Введите заголовок пожелания"
					className="h-12 mx-3 px-2 mt-8 border-solid border-2 rounded-[14px] border-main-theme focus:outline-none"
					value={title}
					onChange={(e) => setTitle(e.target.value)} />

				<textarea
					placeholder="Введите описание пожелания"
					className="h-36 mx-3 px-2 pt-2 border-solid border-2 rounded-[14px] border-main-theme focus:outline-none"
					value={description}
					onChange={(e) => setDescription(e.target.value)} />

				<button className={`h-13 w-33 bg-main-theme ${(alreadyClicked || title.length < 1 || description < 1) && "opacity-35"} rounded-3xl text-white font-bold text-2xl self-center`}
					disabled={alreadyClicked || title.length < 1 || description < 1}
					onClick={handleCreate}>
					создать
				</button>
			</main>
		</div>
	);
}

export default CreateWish;