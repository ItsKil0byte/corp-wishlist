import { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import FallingGifts from './components/FallingGifts';
import Shell from './Shell';
import Groups from './pages/groups/Groups.jsx';
import Profile from './pages/profile/Profile.jsx';
import Wishlists from './pages/wishlists/Wishlists';
import CreateWishlist from './pages/wishlists/wishlist/CreateWishlist.jsx';
import CreateWish from './pages/wishlists/wish/CreateWish.jsx';
import ViewWish from './pages/wishlists/wish/ViewWish.jsx';
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
import Auth from "./pages/Auth.jsx";
import AuthService from "./services/AuthService.js";
import Loading from "./pages/Loading.jsx";
import Landing from './pages/Landing.jsx';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    const location = useLocation();
    const isTelegram = AuthService.isTelegramMiniApp();

    if (!token && !isTelegram) {
        return <Navigate to="/web/auth" state={{ from: location }} replace />;
    }

    return children;
};

function App() {
    const [authInitialized, setAuthInitialized] = useState(false)
    const location = useLocation();
    const isTelegram = AuthService.isTelegramMiniApp();
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    useEffect(() => {
        const initAuth = async () => {
            if (!isTelegram) {
                setAuthInitialized(true);
                return;
            }

            const storedToken = localStorage.getItem('token');

            if (!storedToken) {
                try {
                    await AuthService.telegramAuth();
                } catch (e) {
                    console.error('Ошибка авторизации через Telegram', e);
                } finally {
                    setAuthInitialized(true);
                }
            } else {
                setAuthInitialized(true);
            }
        }

        initAuth()
    }, [])

    if (isTelegram && !authInitialized) {
        return <Loading message={"Авторизация Telegram..."}/>;
    }

    return (
        <div className="relative w-full flex-1 flex flex-col h-full overflow-hidden">
            {/* Падающие подарки будут отображаться только для следующих путей */}
            {!location.pathname.startsWith('/web/auth') && 
            !location.pathname.startsWith('/link') && 
            !location.pathname.startsWith('/shared-wishlist') && 
            location.pathname !== '/' && (
                <div className="absolute inset-0 overflow-hidden">
                    <FallingGifts count={25}/>
                </div>
            )}

            <div className="relative z-10 flex-1 flex flex-col h-full overflow-hidden">
                <Routes>
                    <Route path="/web/auth" element={<Auth/>}/>
                    <Route path="/link" element={<Shell/>}/>
                    <Route path="/shared-wishlist" element={<ViewSharedWishlist/>}/>
                    <Route path="/shared-wishlist-wish" element={<ViewSharedWish/>}/>

                    {/* Корень */}
                    <Route path="/" element={
                        (isTelegram || token) ? <Navigate to="/wishlists" replace /> : <Landing />
                    } />

                    <Route element={
                        <ProtectedRoute>
                            <Shell/>
                        </ProtectedRoute>
                    }>
                        <Route path="wishlists" element={<Wishlists/>}/>
                        <Route path="wishlists/wishlist/create" element={<CreateWishlist/>}/>
                        <Route path="wishlists/wishlist/view" element={<ViewWishlist/>}/>
                        <Route path="wishlists/wishlist/view/others" element={<ViewOthersWishlist/>}/>
                        <Route path="wishlists/wishlist/edit" element={<EditWishlist/>}/>
                        <Route path="wishlists/wish/create" element={<CreateWish/>}/>
                        <Route path="wishlists/wish/view" element={<ViewWish/>}/>
                        <Route path="wishlists/wish/view/others" element={<ViewOthersWish/>}/>
                        <Route path="wishlists/wish/edit" element={<EditWish/>}/>
                        <Route path="groups" element={<Groups/>}/>
                        <Route path="groups/create" element={<CreateGroup/>}/>
                        <Route path="groups/group/view" element={<ViewGroup/>}/>
                        <Route path="groups/group/edit" element={<EditGroup/>}/>
                        <Route path="profile" element={<Profile/>}/>
                        <Route path="profile/others" element={<OthersProfile/>}/>
                    </Route>

                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </div>
        </div>
    )
}

export default App