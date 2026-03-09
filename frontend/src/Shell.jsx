import {Outlet, useLocation, useNavigate} from "react-router-dom";
import FooterNav from "./components/navigation/FooterNav.jsx";
import WebApp from "@twa-dev/sdk";
import toast, {Toaster} from "react-hot-toast";
import {useEffect, useState} from "react";
import GroupService from "./services/GroupService.js";
import Loading from "./pages/Loading.jsx";
import LinkService from "./services/LinkService.js";

function Shell() {
    const location = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const pathsWithFooter = ["/wishlists", "/groups", "/profile"];

    useEffect(() => {
        const effect = async () => {
            try {

                const startParam = WebApp.initDataUnsafe.start_param
                const userId = WebApp.initDataUnsafe.user.id

                if(startParam && !loading && !sessionStorage.getItem("paramIsUsed")) {
                    setLoading(true);

                    const entity = await LinkService.getEntity(startParam);

                    switch(entity.type) {
                        case 'GROUP_INVITE':
                            try {
                                setMessage("Присоединение к группе...")
                                await GroupService.addMember(entity.entityId, userId);
                                toast.success("Вы были добавлены в группу!")
                                setLoading(false);
                                navigate('/groups')
                            } catch (e) {
                                toast.error("Не удалось присоединиться")
                                console.error(e)
                                setLoading(false);
                                navigate('/')
                            } finally {
                                sessionStorage.setItem("paramIsUsed", startParam);
                            }
                            break;
                        case 'WISHLIST_SHARE':
                            try {
                                setMessage("Загружаю вишлист...")
                                sessionStorage.setItem("shared_wishlist", JSON.stringify(entity));
                                setLoading(false);
                                navigate(`/wishlists/wishlist/view/shared`)
                            } catch (e) {
                                toast.error("Не удалось загрузить вишлист")
                                console.error(e)
                                setLoading(false);
                                navigate('/')
                            } finally {
                                sessionStorage.setItem("paramIsUsed", startParam);
                            }
                            break;

                    }
                }
            } catch (e) {
                console.log(e)
                toast.error("Ошибка")
                setLoading(false);
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
