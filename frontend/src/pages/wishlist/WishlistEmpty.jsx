import { useNavigate } from "react-router-dom";

const WishlistEmpty = () => {
	const navigate = useNavigate()

	return (
		<div className="w-full h-full relative flex-col justify-center items-center overflow-y-hidden">
			<h2 className="text-2xl font-semibold text-center mt-20">
				Этот вишлист пуст :(
				<br />
				Самое время наполнить
				<br />
				его желаниями
			</h2>
			<button
				onClick={() => navigate("wish/create")}
				className="bg-main-theme size-20 rounded-[50%] flex justify-center items-center absolute bottom-4 right-0 animate-bounce">
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
	);
};

export default WishlistEmpty;