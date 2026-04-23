import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import UserInfoService from "./services/UserInfoService";
import WishlistService from "./services/WishlistService";
import AppSidebar from "./components/navigation/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import GroupService from "./services/GroupService";
import { TooltipProvider } from "./components/ui/tooltip";

export default function Shell() {
  const [user, setUser] = useState(null);
  const [wishlists, setWishlists] = useState([]);
  const [groups, setGroups] = useState([]);

  // TODO: Динамически обновлять sidebar.
  // TODO: Header с кнопкой.
  // TODO: Протестировать на мобилке.

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Получаем информацию о пользователе
        const user = await UserInfoService.getCurrentUserInfo();
        setUser(user);

        if (user) {
          // Получаем вишлисты и группы пользователя
          const [wishlists, groups] = await Promise.all([
            WishlistService.getWishlists(),
            GroupService.getGroups(),
          ]);

          setWishlists(wishlists || []);
          setGroups(groups || []);
        }
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <TooltipProvider>
      <SidebarProvider>
        <div className="flex h-screen w-full bg-gray-50 font-sans overflow-hidden">
          <AppSidebar user={user} wishlists={wishlists} groups={groups} />

          <main className="relative flex-1 flex flex-col min-w-0 overflow-hidden p-2">
            <div className="flex-1 overflow-y-auto no-scrollbar bg-white rounded-lg shadow">
              <header className="flex h-12 shrink-0 items-center p-4 gap-2">
                <SidebarTrigger className="text-gray-900 hover:text-main-theme transition-colors" />
              </header>
              <Outlet />
            </div>
          </main>
        </div>
      </SidebarProvider>
    </TooltipProvider>
  );
}
