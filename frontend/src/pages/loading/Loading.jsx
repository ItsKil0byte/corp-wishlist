export default function Loading({ message }) {
	return (
		<div>
			<h1 className="text-center text-2xl">Загрузка...</h1>
			<h3 className="text-center text-2xl font-semibold mt-6">{message}</h3>
		</div>
	)
}