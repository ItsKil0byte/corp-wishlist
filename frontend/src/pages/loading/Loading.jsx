export default function Loading({ message }) {
	return (
		<div className="fixed top-0 left-0 w-full h-full z-50 flex flex-col justify-center items-center">
			<h1 className="text-center text-2xl">Загрузка...</h1>
			<h3 className="text-center text-2xl font-semibold mt-6">{message}</h3>
		</div>
	)
}