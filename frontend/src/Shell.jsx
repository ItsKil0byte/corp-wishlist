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
        <div className="flex h-screen w-full bg-gray-50 font-sans overflow-hidden">
          <AppSidebar user={user} wishlists={wishlists} groups={groups} />

          <main className="relative flex-1 flex flex-col min-w-0 overflow-hidden p-2">
            <div className="flex-1 overflow-y-auto no-scrollbar bg-white rounded-lg shadow-sm">
              <Outlet context={contextValue} />
            </div>
          </main>
        </div>
      </SidebarProvider>
    </TooltipProvider>
  );
}
