import {Routes, Route, Navigate} from "react-router-dom";
import {Toaster} from "react-hot-toast";
import Shell from "./Shell";
import Groups from "./pages/groups/Groups.jsx";
import Profile from "./pages/profile/Profile.jsx";
import Wishlists from "./pages/wishlists/Wishlists";
import ViewWishlist from "./pages/wishlists/wishlist/ViewWishlist.jsx";
import ViewSharedWishlist from "./pages/wishlists/wishlist/ViewSharedWishlist.jsx";
import Auth from "./pages/Auth.jsx";
import LinkDispatcher from "./components/navigation/LinkDispatcher";
import ViewGroup from "@/pages/groups/ViewGroup.jsx";
import OthersProfile from "@/pages/profile/OthersProfile.jsx";
import ViewOthersWishlist from "@/pages/wishlists/wishlist/ViewOthersWishlist.jsx";

const ProtectedRoute = ({children}) => {
    const isAuth = !!localStorage.getItem("token");

    if (!isAuth) {
        return <Navigate to="/auth" replace/>;
    }

    return children;
};

export default function App() {
    return (
        <>
            <Toaster position="top-right" reverseOrder={false}/>

            <Routes>
                {/* Диспетчер ссылок */}
                <Route path="/" element={<LinkDispatcher/>}/>
                {/* На всякий случай */}
                <Route path="/link" element={<LinkDispatcher/>}/>
                {/* Публичные страницы */}
                <Route path="/auth" element={<Auth/>}/>
                <Route path="/shared/:token" element={<ViewSharedWishlist/>}/>
                {/* Защищенные страницы */}
                <Route
                    element={
                        <ProtectedRoute>
                            <Shell/>
                        </ProtectedRoute>
                    }
                >
                    <Route path="/wishlists" element={<Wishlists/>}/>
                    <Route path="/wishlists/wishlist/view" element={<ViewWishlist/>}/>
                    <Route path="/wishlists/wishlist/view/others" element={<ViewOthersWishlist/>}/>

                    <Route path="/groups" element={<Groups/>}/>
                    <Route path="/groups/group/view" element={<ViewGroup/>}/>

                    <Route path="/profile" element={<Profile/>}/>
                    <Route path="/profile/others" element={<OthersProfile/>}/>
                </Route>
                {/* Роут для несуществующих страниц */}
                <Route path="*" element={<Navigate to="/" replace/>}/>
            </Routes>
        </>
    );
}
