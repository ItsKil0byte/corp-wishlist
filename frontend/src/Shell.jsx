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

  const fetchWishlists = async () => {
    try {
      const data = await WishlistService.getWishlists();
      setWishlists(data);
    } catch (error) {
      console.error("Ошибка при загрузке вишлистов:", error);
    }
  };

  const fetchGroups = async () => {
    try {
      const data = await GroupService.getGroups();
      setGroups(data);
    } catch (error) {
      console.error("Ошибка при загрузке групп:", error);
    }
  };

  const fetchUser = async () => {
    try {
      const user = await UserInfoService.getCurrentUserInfo();
      setUser(user);
    } catch (error) {
      console.error("Ошибка при загрузке информации о пользователе:", error);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchWishlists();
    fetchGroups();
  }, []);

  const contextValue = {
    user,
    wishlists,
    groups,
    fetchWishlists,
    fetchGroups,
    fetchUser,
  };

  return (
    <TooltipProvider>
      <SidebarProvider>
        <div className="flex h-screen w-full overflow-hidden bg-gray-50 p-4 font-sans">
          <AppSidebar user={user} wishlists={wishlists} groups={groups} />

          <main className="relative flex flex-1 flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto rounded-lg border-2 border-gray-200 bg-white p-2">
              <Outlet context={contextValue} />

              <SidebarTrigger className="bg-main-theme border-main-theme-border hover:bg-main-theme fixed bottom-8 left-8 size-16 rounded-lg border-2 hover:brightness-95 md:hidden" />
            </div>
          </main>
        </div>
      </SidebarProvider>
    </TooltipProvider>
  );
}
