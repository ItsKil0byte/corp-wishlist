import {Outlet, useLocation, useNavigate} from "react-router-dom";
import FooterNav from "./components/navigation/FooterNav.jsx";
import WebApp from "@twa-dev/sdk";
import toast, {Toaster} from "react-hot-toast";
import {useEffect, useState} from "react";
import GroupService from "./services/GroupService.js";
import Loading from "./pages/Loading.jsx";
import LinkService from "./services/LinkService.js";
import UserInfoService from "./services/UserInfoService.js";

function Shell() {
    const location = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const pathsWithFooter = ["/wishlists", "/groups", "/profile"];

    useEffect(() => {
        const effect = async () => {
            try {
                const initData = WebApp?.initDataUnsafe;
                //const userId = initData?.user?.id;

                const startParamFromWebApp = initData?.start_param;
                const startParamFromQuery = new URLSearchParams(location.search).get('start_param');
                const startParam = startParamFromWebApp || startParamFromQuery;

                if (!startParam) {
                    return;
                }

                const tId = toast.loading("Запрос выполняется...")
                setLoading(true);
                const entity = await LinkService.getEntity(startParam);
                console.dir(entity);

                switch (entity.type) {
                    case 'GROUP_INVITE':
                        try {
                            setMessage('Присоединение к группе...');
                            const user = await UserInfoService.getCurrentUserInfo();
                            await GroupService.addMember(entity.entityId, user.userId);
                            sessionStorage.removeItem("groups");
                            toast.success('Вы были добавлены в группу!', { id: tId });
                            navigate('/groups');
                        } catch (e) {
                            toast.error('Не удалось присоединиться', { id: tId });
                            console.error(e);
                            navigate('/');
                        }
                        break;
                    case 'WISHLIST_SHARE':
                        try {
                            setMessage('Загружаю вишлист...');
                            sessionStorage.setItem('shared_wishlist', JSON.stringify(entity));
                            toast.success('Вишлист загружен!', { id: tId });
                            navigate(`/shared-wishlist`);
                        } catch (e) {
                            toast.error('Не удалось загрузить вишлист', { id: tId });
                            console.error(e);
                            navigate('/');
                        }
                        break;
                }

            } catch (e) {
                console.log(e);
                toast.error('Ошибка');
                setLoading(false);
            } finally {
                setLoading(false);
            }
        };

        effect();
    }, []);

	if (loading) {
        return <Loading message={message} />;
    }

    return (
        <div className="w-full h-full flex justify-center bg-transparent">
            <div className="w-full max-w-[800px] h-full flex flex-col bg-white shadow-md">
                <Toaster position={"top-center"} reverseOrder={false} />
                <main className="flex-1 overflow-y-auto relative flex flex-col">
                    <Outlet />
                </main>
                {
                    pathsWithFooter.includes(location.pathname) && <FooterNav />
                }
            </div>
        </div>
    );
}

export default Shell;