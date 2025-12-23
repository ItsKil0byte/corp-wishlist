import { Routes, Route, Navigate } from 'react-router-dom'
import Shell from './Shell'
import Groups from './pages/groups/Groups.jsx'
import Profile from './pages/profile/Profile.jsx'
import Wishlists from './pages/wishlists/Wishlists'
import CreateWishlist from './pages/wishlists/wishlist/CreateWishlist.jsx'
import CreateWish from './pages/wishlists/wish/CreateWish.jsx'
import ViewWish from './pages/wishlists/wish/ViewWish.jsx'
import CreateGroup from "./pages/groups/CreateGroup.jsx";
import ViewGroup from "./pages/groups/ViewGroup.jsx";
import EditGroup from "./pages/groups/EditGroup.jsx";
import OthersProfile from "./pages/profile/OthersProfile.jsx";
import ViewWishlist from "./pages/wishlists/wishlist/ViewWishlist.jsx";
import EditWishlist from "./pages/wishlists/wishlist/EditWishlist.jsx";
import EditWish from "./pages/wishlists/wish/EditWish.jsx";
import ViewOthersWishlist from "./pages/wishlists/wishlist/ViewOthersWishlist.jsx";
import ViewOthersWish from "./pages/wishlists/wish/ViewOthersWish.jsx";
import ViewSharedWishlist from "./pages/wishlists/wishlist/ViewSharedWishlist.jsx";
import ViewSharedWish from "./pages/wishlists/wish/ViewSharedWish.jsx";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Shell />}>
                <Route index element={<Navigate to="/wishlists" />} />
				<Route path="wishlists" element={<Wishlists />} />

				<Route path='wishlists/wishlist/create' element={<CreateWishlist/>} />
                <Route path="wishlists/wishlist/view" element={<ViewWishlist />} />
                <Route path="wishlists/wishlist/view/others" element={<ViewOthersWishlist />} />
                <Route path="wishlists/wishlist/view/shared" element={<ViewSharedWishlist />} />
                <Route path="wishlists/wishlist/edit" element={<EditWishlist />} />

				<Route path='wishlists/wish/create' element={<CreateWish/>} />
                <Route path='wishlists/wish/view' element={<ViewWish/>} />
                <Route path='wishlists/wish/view/others' element={<ViewOthersWish/>} />
                <Route path='wishlists/wish/view/shared' element={<ViewSharedWish/>} />
                <Route path='wishlists/wish/edit' element={<EditWish/>} />

				<Route path="groups" element={<Groups />} />
                <Route path="groups/create" element={<CreateGroup/>} />
                <Route path="groups/group/view" element={<ViewGroup/>} />
                <Route path="groups/group/edit" element={<EditGroup/>} />

                <Route path="profile" element={<Profile />} />
                <Route path="profile/others" element={<OthersProfile />} />
			</Route>
		</Routes>
	)
}

export default App
