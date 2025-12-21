import { useNavigate } from "react-router-dom";

// eslint-disable-next-line no-unused-vars
function WishCard({id, wishlistName, name, description, color, clickable = true }) {
	const navigate = useNavigate()

    const colors = {
        "gift-one-lite": "bg-gift-one-lite",
        "gift-two-lite": "bg-gift-two-lite",
        "gift-profile-lite": "bg-gift-profile-lite",
    }

	return (
		<div className={`${colors[color]} w-full h-40 flex flex-col px-4 rounded-lg`} onClick={() =>{
            if(!clickable){
                return;
            }
            navigate(`/wishlists/wish/view?wishlistName=${wishlistName}&wishName=${name}&wishDescription=${description}&color=${color}`)
        }}>
			<span className="text-center text-[20px] font-semibold my-2 line-clamp-1 wrap-break-word">{name}</span>
			<span className="text-center text-[15px] font-semibold text-main-theme-primary line-clamp-4 mb-3 text-pretty wrap-anywhere">{description}</span>
		</div>
	);
}

export default WishCard;