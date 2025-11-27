import { Routes, Route, Navigate } from 'react-router-dom'
import Shell from './Shell'
import Groups from './pages/Groups'
import Profile from './pages/Profile'
import Wishlists from './pages/wishlists/Wishlists'
import Test from './components/Test'

function App() {
	return (
		<Routes>
			<Route path="/" element={<Shell />}>
				<Route index element={<Navigate to="/wishlists" replace />} />
				<Route path="wishlists" element={<Wishlists />} />
				<Route path="groups" element={<Groups />} />
				<Route path="profile" element={<Profile />} />
			</Route>
			<Route path='/test' element={<Test />} />
		</Routes>
	)
}

export default App
