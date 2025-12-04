function Header({ children }) {
	return (
		<div className="w-full min-h-12 px-4 my-2 gap-x-4 flex items-center">
			{children}
		</div>
	);
}

export default Header;