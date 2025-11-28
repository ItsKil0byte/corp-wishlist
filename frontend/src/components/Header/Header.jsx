function Header({ children }) {
	return (
		<div className="min-h-12 px-4 my-2 gap-x-4 flex items-center overflow-x-scroll no-scrollbar">
			{children}
		</div>
	);
}

export default Header;