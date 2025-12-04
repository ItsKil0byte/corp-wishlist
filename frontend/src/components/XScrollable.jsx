function XScrollable({ children }) {
	return (
		<div className="h-full w-full my-2 px-4 gap-x-4 flex items-center overflow-x-scroll no-scrollbar
		  				[mask-image:linear-gradient(to_right, transparent, black_10%, transparent)]
						[-webkit-mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
			{children}
		</div>
	);
}

export default XScrollable;