import {NavLink, Outlet, useLocation, useNavigate} from "react-router-dom";
import FooterNav from "./components/FooterNav";
import WebApp from "@twa-dev/sdk";
import toast, {Toaster} from "react-hot-toast";
import {useEffect} from "react";
import GroupService from "./services/GroupService.js";

function Shell() {
    const location = useLocation();
    const navigate = useNavigate();
    const pathsWithFooter = ["/wishlists", "/groups", "/profile"];

    useEffect(() => {
        const effect = async () => {
            const startParam = WebApp.initDataUnsafe.start_param
            const userId = WebApp.initDataUnsafe.user.id

            if(startParam) {
                const [paramName, paramValue] = startParam.split("_")

                if (paramName === "joingroup") {
                    await GroupService.putMember(paramValue, userId)
                    WebApp.initDataUnsafe.start_param = ""
                    toast.success("Вы были добавлены в группу!")
                    navigate('/groups')
                }
            }
        }

        effect();
    }, []);

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
