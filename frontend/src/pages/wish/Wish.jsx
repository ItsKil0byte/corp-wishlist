import { NavLink, useSearchParams } from "react-router-dom";
import Header from "../../components/Header/Header";

function Wish() {
	const [searchParams, _] = useSearchParams()
	const wishlistName = searchParams.get("wishlistName")
	const wishName = searchParams.get("wishName")
	const wishDescription = searchParams.get("wishDescription")
	const color = searchParams.get("color")

	console.log(wishlistName)


	return (
		<div className="h-full w-full flex flex-col">
			<Header>
				<div className="h-full w-full flex justify-center relative">
					<NavLink className="h-full rounded-3xl px-4 bg-main-theme-lite text-main-theme-primary flex justify-center items-center font-semibold absolute left-0 top-0" to={`/wishlists?name=${wishlistName}`}>назад</NavLink>
					<span className="self-center flex font-semibold text-main-theme-primary items-center">{wishlistName}</span>
				</div>
			</Header>
			<div className={`p-4 mx-4 ${color} rounded-2xl flex flex-col justify-center`}>
				<span className="w-full text-center wrap-break-word font-semibold text-2xl">{wishName}</span>
				<div className="p-4 w-full wrap-break-word font-semibold text-main-theme-primary text-center">
					{wishDescription}
				</div>
			</div>
			
		</div>
	);
}

export default Wish;