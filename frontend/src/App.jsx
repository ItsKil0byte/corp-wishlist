import { Routes, Route, Navigate } from 'react-router-dom'
import Shell from './Shell'
import Groups from './pages/Groups'
import Profile from './pages/Profile'
import Wishlists from './pages/wishlists/Wishlists'
import Test from './components/Test'
import CreateWishlist from './pages/wishlists/CreateWishlist'
import WishlistsEmpty from './pages/wishlists/WishlistsEmpty'

function App() {
	return (
		<Routes>
			<Route path="/" element={<Shell />}>
				<Route index element={<Navigate to="/wishlists" replace />} />
				<Route path="wishlists" element={<Wishlists />} />
				<Route path="wishlists/empty" element={<WishlistsEmpty />} />
				<Route path='wishlists/create' element={<CreateWishlist/>}/>
				<Route path="groups" element={<Groups />} />
				<Route path="profile" element={<Profile />} />
			</Route>
			<Route path='/test' element={<Test />} />
		</Routes>
	)
}

export default App
