import { Routes, Route, Navigate } from 'react-router-dom'
import WishlistEmpty from './pages/wishlist/WishlistEmpty'
import Groups from './pages/Groups'
import Profile from './pages/Profile'
import Shell from './Shell'
import Test from './components/Test'

function App() {
	return (
		<Routes>
			<Route path="/" element={<Shell />}>
				<Route index element={<Navigate to="/wishlist" replace />} />
				<Route path="wishlist" element={<WishlistEmpty />} />
				<Route path="groups" element={<Groups />} />
				<Route path="profile" element={<Profile />} />
			</Route>
			<Route path='/test' element={<Test />} />
		</Routes>
	)
}

export default App
