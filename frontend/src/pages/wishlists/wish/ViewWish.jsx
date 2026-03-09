import {useNavigate, useSearchParams} from "react-router-dom";
import Header from "../../../components/navigation/Header.jsx";

function ViewWish() {
	const [searchParams, _] = useSearchParams()
    const navigate = useNavigate();
	const wishlist = JSON.parse(sessionStorage.getItem("wishlists")).find(wishlist => wishlist.id === Number(searchParams.get("from")))
    const wish = wishlist.wishes.find(wish => wish.id === Number(searchParams.get("id")))
	const color = `bg-${wish.color}`

    console.log(wish);

	return (
		<div className="h-full w-full flex flex-col">
			<Header hasBackButton={true}
                    hasEditButton={true}
                    onBack={() => {navigate(`/wishlists/wishlist/view?id=${Number(searchParams.get("from"))}`)}}
                    onEdit={() => {navigate(`/wishlists/wish/edit?id=${Number(searchParams.get("id"))}&from=${Number(searchParams.get("from"))}`)}}/>
			<div className={`p-4 mx-4 ${color} rounded-2xl flex flex-col justify-center`}>
				<span className="w-full text-center wrap-break-word font-semibold text-2xl">{wish.title}</span>
				<div className="p-4 w-full wrap-break-word font-semibold text-main-theme-primary text-center">
					{wish.description}
				</div>
			</div>
		</div>
	);
}

export default ViewWish;