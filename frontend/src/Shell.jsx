import {Outlet, useLocation, useNavigate} from "react-router-dom";
import FooterNav from "./components/FooterNav";
import WebApp from "@twa-dev/sdk";
import toast, {Toaster} from "react-hot-toast";
import {useEffect, useState} from "react";
import GroupService from "./services/GroupService.js";
import Loading from "./pages/loading/Loading.jsx";
import LinkService from "./services/LinkService.js";

function Shell() {
    const location = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const pathsWithFooter = ["/wishlists", "/groups", "/profile"];

    useEffect(() => {
        const effect = async () => {
            const startParam = WebApp.initDataUnsafe.start_param
            const userId = WebApp.initDataUnsafe.user.id

            if(startParam && !loading && startParam !== sessionStorage.getItem("prev_start_param")) {
                setLoading(true);

                const [paramName, paramValue] = startParam.split("_")

                if (paramName === "joingroup") {
                    try {
                        setMessage("Присоединение к группе...")
                        await GroupService.addMember(paramValue, userId)
                        toast.success("Вы были добавлены в группу!")
                        setLoading(false);
                        sessionStorage.setItem("prev_start_param", startParam);
                        navigate('/groups')
                    } catch {
                        toast.error("Не удалось присоединиться")
                        setLoading(false);
                        sessionStorage.setItem("prev_start_param", startParam);
                        navigate('/')
                    }
                } else if (paramName === "wishlist") {
                    const wishlist = await LinkService.getEntity(paramValue)
                    localStorage.setItem("others_wishlist", JSON.stringify(wishlist));
                    setLoading(false);
                    navigate(`/wishlists/wish/view/others`)
                }
            }
        }

        effect();
    }, []);

    if (loading) {
        return <Loading message={message} />;
    }

	return (
		<div className="w-screen h-screen flex flex-col bg-white">
            <Toaster position={"top-center"} reverseOrder={false} />
			<main className="w-full h-full flex flex-col overflow-hidden relative">
				<Outlet />
			</main>
            {
                pathsWithFooter.includes(location.pathname) && <FooterNav />
            }
		</div>
	);
}

export default Shell;
