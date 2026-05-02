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
              className="hover:bg-main-theme/10 data-[active=true]:bg-main-theme/10 active:bg-main-theme/10 h-16 w-full text-gray-900 transition-all duration-300 group-data-[collapsible=icon]:h-10 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0"
            >
              <Link to="/profile">
                <Avatar className="bg-main-theme h-12 w-12 shrink-0 transition-all duration-300 group-data-[collapsible=icon]:h-6 group-data-[collapsible=icon]:w-6 after:border-2">
                  <AvatarImage src={user?.photo_url} />
                  <AvatarFallback className="bg-main-theme text-gray-900">
                    <User className="size-8! transition-all duration-300 group-data-[collapsible=icon]:size-4!" />
                  </AvatarFallback>
                </Avatar>

                {state === "expanded" && (
                  <div className="animate-in fade-in flex flex-col duration-300">
                    <span className="truncate leading-tight font-bold text-gray-900">
                      {user
                        ? `${(user.firstName && user.lastName) || "Пользователь"} ${user.lastName || ""}`
                        : "Пользоаватель"}
                    </span>
                    <span className="truncate text-sm leading-tight text-gray-500">
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
          <SidebarGroupLabel className="text-base font-bold text-gray-900">
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
                  className="hover:bg-main-theme/10 data-[active=true]:bg-main-theme/10 active:bg-main-theme/10 h-11 px-3 text-gray-900"
                >
                  <Link to="/wishlists">
                    <Gift className="h-6 w-6 shrink-0" />
                    <span className="text-sm font-semibold">Мои вишлисты</span>
                  </Link>
                </SidebarMenuButton>

                {state === "expanded" && (
                  <CollapsibleTrigger asChild>
                    <SidebarMenuAction className="right-2 h-8 w-8 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 hover:bg-transparent">
                      <ChevronRight className="h-5 w-5 text-gray-900" />
                    </SidebarMenuAction>
                  </CollapsibleTrigger>
                )}

                <CollapsibleContent>
                  <SidebarMenuSub className="border-main-theme/20 mr-0 ml-6 border-l-2 pr-0">
                    {wishlists.map((wishlist) => (
                      <SidebarMenuSubItem key={wishlist.id}>
                        <SidebarMenuSubButton
                          asChild
                          isActive={
                            location.pathname.includes("/wishlists") &&
                            location.search.includes(`id=${wishlist.id}`)
                          }
                          className="hover:bg-main-theme/10 data-[active=true]:bg-main-theme/10 active:bg-main-theme/10 h-8"
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
                  className="hover:bg-main-theme/10 data-[active=true]:bg-main-theme/10 active:bg-main-theme/10 h-11 px-3 text-gray-900"
                >
                  <Link to="/groups">
                    <Users className="h-6 w-6 shrink-0" />
                    <span className="text-sm font-semibold">Мои группы</span>
                  </Link>
                </SidebarMenuButton>

                {state === "expanded" && (
                  <CollapsibleTrigger asChild>
                    <SidebarMenuAction className="right-2 h-8 w-8 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 hover:bg-transparent">
                      <ChevronRight className="h-5 w-5 text-gray-900" />
                    </SidebarMenuAction>
                  </CollapsibleTrigger>
                )}

                <CollapsibleContent>
                  <SidebarMenuSub className="border-main-theme/20 mr-0 ml-6 border-l-2 pr-0">
                    {groups.map((group) => (
                      <SidebarMenuSubItem key={group.id}>
                        <SidebarMenuSubButton
                          asChild
                          isActive={
                            location.pathname.includes("/groups") &&
                            location.search.includes(`id=${group.id}`)
                          }
                          className="hover:bg-main-theme/10 data-[active=true]:bg-main-theme/10 active:bg-main-theme/10 h-8"
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

      <SidebarFooter className="mt-auto group-data-[collapsible=icon]:px-0">
        <SidebarMenu className="p-2 pt-0 transition-all duration-300 group-data-[collapsible=icon]:justify-center">
          <SidebarTrigger className="hover:bg-main-theme/10 size-12 text-gray-900 transition-colors group-data-[collapsible=icon]:size-8" />
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
