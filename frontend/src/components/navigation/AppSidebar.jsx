import { Link, useLocation } from "react-router-dom";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
  SidebarMenuAction,
  SidebarTrigger,
} from "../ui/sidebar";
import { Sidebar } from "../ui/sidebar";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { ChevronRight, User, Users, Gift } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";

export default function AppSidebar({ user, wishlists, groups }) {
  const location = useLocation();
  const { state } = useSidebar();

  // TODO: Поправить цвета.
  // TODO: Разобраться с размерами иконок.
  // TODO: Центровка.

  return (
    <Sidebar variant="floating" collapsible="icon" className={"p-4 pr-0"}>
      <SidebarHeader className="transition-all duration-300">
        <SidebarMenu className="p-2 pb-0 group-data-[collapsible=icon]:px-0">
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              tooltip="Профиль"
              isActive={location.pathname.startsWith("/profile")}
              className="hover:bg-main-theme/10 data-[active=true]:bg-main-theme/10 active:bg-main-theme/10 text-gray-900 transition-all duration-300 h-16 w-full group-data-[collapsible=icon]:h-10 group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:justify-center"
            >
              <Link to="/profile">
                <Avatar className="bg-main-theme after:border-2 transition-all duration-300 group-data-[collapsible=icon]:h-6 group-data-[collapsible=icon]:w-6 h-12 w-12 shrink-0">
                  <AvatarImage src={user?.photo_url} />
                  <AvatarFallback className="bg-main-theme text-gray-900">
                    <User className="size-8! transition-all duration-300 group-data-[collapsible=icon]:size-4!" />
                  </AvatarFallback>
                </Avatar>

                {state === "expanded" && (
                  <div className="flex flex-col animate-in fade-in duration-300">
                    <span className="font-bold text-gray-900 leading-tight truncate">
                      {user
                        ? `${(user.firstName && user.lastName) || "Пользователь"} ${user.lastName || ""}`
                        : "Пользоаватель"}
                    </span>
                    <span className="text-sm text-gray-500 leading-tight truncate">
                      @{user?.username || "..."}
                    </span>
                  </div>
                )}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup className="pt-0">
          <SidebarGroupLabel className="text-gray-900 font-bold text-base">
            Навигация
          </SidebarGroupLabel>

          <SidebarMenu className="p-2 group-data-[collapsible=icon]:px-0">
            {/* ВИШЛИСТЫ */}
            <Collapsible asChild defaultOpen className="group/collapsible">
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  tooltip="Мои вишлисты"
                  isActive={location.pathname.startsWith("/wishlists")}
                  className="hover:bg-main-theme/10 data-[active=true]:bg-main-theme/10 active:bg-main-theme/10 text-gray-900 h-11 px-3"
                >
                  <Link to="/wishlists">
                    <Gift className="w-6 h-6 shrink-0" />
                    <span className="font-semibold text-sm">Мои вишлисты</span>
                  </Link>
                </SidebarMenuButton>

                {state === "expanded" && (
                  <CollapsibleTrigger asChild>
                    <SidebarMenuAction className="right-2 hover:bg-transparent h-8 w-8 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90">
                      <ChevronRight className="w-5 h-5 text-gray-900" />
                    </SidebarMenuAction>
                  </CollapsibleTrigger>
                )}

                <CollapsibleContent>
                  <SidebarMenuSub className="ml-6 border-l-2 border-main-theme/20 mr-0 pr-0">
                    {wishlists.map((wishlist) => (
                      <SidebarMenuSubItem key={wishlist.id}>
                        <SidebarMenuSubButton
                          asChild
                          isActive={
                            location.pathname.includes("/wishlists") &&
                            location.search.includes(`id=${wishlist.id}`)
                          }
                          className="h-8 hover:bg-main-theme/10 data-[active=true]:bg-main-theme/10 active:bg-main-theme/10"
                        >
                          <Link
                            to={`/wishlists/wishlist/view?id=${wishlist.id}`}
                            className="truncate"
                          >
                            {wishlist.name}
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>

            {/* ГРУППЫ */}
            <Collapsible asChild defaultOpen className="group/collapsible mt-1">
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  tooltip="Мои группы"
                  isActive={location.pathname.startsWith("/groups")}
                  className="hover:bg-main-theme/10 data-[active=true]:bg-main-theme/10 active:bg-main-theme/10 text-gray-900 h-11 px-3"
                >
                  <Link to="/groups">
                    <Users className="w-6 h-6 shrink-0" />
                    <span className="font-semibold text-sm">Мои группы</span>
                  </Link>
                </SidebarMenuButton>

                {state === "expanded" && (
                  <CollapsibleTrigger asChild>
                    <SidebarMenuAction className="right-2 hover:bg-transparent h-8 w-8 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90">
                      <ChevronRight className="w-5 h-5 text-gray-900" />
                    </SidebarMenuAction>
                  </CollapsibleTrigger>
                )}

                <CollapsibleContent>
                  <SidebarMenuSub className="ml-6 border-l-2 border-main-theme/20 mr-0 pr-0">
                    {groups.map((group) => (
                      <SidebarMenuSubItem key={group.id}>
                        <SidebarMenuSubButton
                          asChild
                          isActive={
                            location.pathname.includes("/groups") &&
                            location.search.includes(`id=${group.id}`)
                          }
                          className="h-8 hover:bg-main-theme/10 data-[active=true]:bg-main-theme/10 active:bg-main-theme/10"
                        >
                          <Link
                            to={`/groups/group/view?id=${group.id}`}
                            className="truncate"
                          >
                            {group.name}
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="mt-auto group-data-[collapsible=icon]:px-0 ">
        <SidebarMenu className="p-2 pt-0 transition-all duration-300 group-data-[collapsible=icon]:justify-center">
          <SidebarTrigger className="size-12 group-data-[collapsible=icon]:size-8 text-gray-900 transition-colors hover:bg-main-theme/10" />
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
