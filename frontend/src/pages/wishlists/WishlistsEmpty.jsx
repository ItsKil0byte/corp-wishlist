function WishlistEmpty() {
	return (
		<div className="min-h-full flex flex-col items-center">
			<div className="mx-auto mt-25 max-w-66">
				<h1 className="font-bold text-2xl text-center">{"Здесь пока ничего нет"}</h1>
				<h1 className="font-bold text-2xl text-center">{"Давайте создадим новый вишлист:)"}</h1>
			</div>
			<input id="" className="min-w-60 h-12 my-9 text-xs border-2 border-main-theme rounded-2xl pl-4 focus:outline-none" placeholder="Введите название вишлиста"/>
			<button className="h-13 w-33 bg-main-theme rounded-3xl text-white font-bold text-2xl">создать</button>
		</div>
	);
}

export default WishlistEmpty;
