import { useQuery } from "@tanstack/react-query";
import { Bot, BotMessageSquare, ChevronUp, User2 } from "lucide-react";
import toast from "react-hot-toast";
import { Link, useLocation } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { USER } from "@/constants/storage";
import { AuthApis } from "@/features/auth/auth.apis";
import { ConversationApis } from "@/features/conversations/conversations.apis";
import { conversationsQueryKeys, useConversations } from "@/features/conversations/conversations.hooks";
import { useUser } from "@/hooks/use-user";
import { cn } from "@/lib/utils";
import { dataUtils } from "@/utils/data";
import { clearAllCookies, clearAllLocalStorage, getLocalStorage } from "@/utils/storage";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Item, ItemActions, ItemContent, ItemDescription, ItemFooter, ItemHeader, ItemMedia, ItemTitle } from "../ui/item";
import { Label } from "../ui/label";
import { Skeleton } from "../ui/skeleton";

function AppSidebar() {
  const location = useLocation();

  const isCover = location?.pathname.includes("cover");

  const handleLogout = async () => {
    await AuthApis.actions.logout().then(() => {
      clearAllCookies();
      clearAllLocalStorage();
      window.location.reload();
    }).catch((error) => {
      console.error("Logout failed:", error);
      toast.error("Logout failed");
    });
  };

  const { state } = useSidebar();
  const { isAdmin } = useUser();

  const user = getLocalStorage(USER);

  const adminConversationQuery = useQuery({
    queryKey: [conversationsQueryKeys.adminConversations],
    queryFn: () => ConversationApis.getAdminConversations(),
    select: apiResponse => apiResponse?.data?.details,
    enabled: isAdmin,
  });

  const userConversationQuery = useQuery({
    queryKey: [useConversations.queryKeys.userConversations],
    queryFn: () => ConversationApis.getUserConversations(),
    select: apiResponse => apiResponse?.data?.details,
    enabled: !isAdmin,
  });

  const query = isAdmin ? adminConversationQuery : userConversationQuery;

  return (
    <Sidebar className="scrollbar-hide" variant="sidebar" side="left" collapsible="icon">

      <Item className="flex gap-x-5 items-center rounded-none">
        <DropdownMenu>
          <DropdownMenuTrigger asChild className=" w-full border shadow-sm cursor-pointer">
            <button className="flex items-center gap-x-5 hover:bg-accent rounded-md p-2 transition-colors">
              <Bot />
              <Label className={cn("duration-200", state === "collapsed" && "scale-0")}>Bleep Chat</Label>
            </button>
          </DropdownMenuTrigger>
        </DropdownMenu>
      </Item>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Conversations</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">

              {
                query.isLoading
                  ? Array.from({ length: 5 }).map((_, index) => (
                      <SidebarMenuItem key={`skeleton-${index}`}>
                        <SidebarMenuButton>
                          <div className="flex items-center space-x-3 w-full">
                            <Skeleton className="w-4 h-4" />
                            <div className="flex-1 min-w-0 space-y-2">
                              <div className="flex items-center space-x-2">
                                <Skeleton className="h-3.5 w-4/5" />
                                <Skeleton className="h-2.5 w-12" />
                              </div>
                              <div className="flex items-center space-x-2">
                                <Skeleton className="h-2.5 w-3/5" />
                                <Skeleton className="h-2 w-8" />
                              </div>
                            </div>
                          </div>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))
                  : query?.data?.map((conversation: any) => (
                      <SidebarMenuItem key={conversation._id}>
                        <div>
                          <Link to={`/conversations/details/${conversation._id}`}>
                            <Item size="sm" variant="outline" className="group">
                              {isCover
                                ? (
                                    <div className="flex items-center space-x-3 p-2">
                                      <BotMessageSquare className="w-4" />
                                      <span className="text-sm font-medium">
                                        {isAdmin ? conversation.userId?.displayName || conversation.userId?.name || "Unknown User" : "Admin"}
                                      </span>
                                    </div>
                                  )
                                : (
                                    <>
                                      <ItemMedia variant="icon" className={cn(location.pathname.includes(conversation._id) && "bg-primary text-white rounded-md shadow-[0_0_0_1px_hsl(var(--sidebar-accent))] ")}>
                                        <div className="relative shrink-0">
                                          <BotMessageSquare className=" w-4" />
                                          {conversation.unreadCount > 0 && (
                                            <span className="absolute -top-1 -right-1 w-2 bg-red-500 rounded-full"></span>
                                          )}
                                        </div>
                                      </ItemMedia>
                                      <ItemContent>
                                        <ItemHeader>
                                          <ItemTitle>
                                            {isAdmin ? conversation.userId?.displayName || conversation.userId?.name || "Unknown User" : "Admin"}
                                          </ItemTitle>
                                          <ItemActions>
                                            <span className=" whitespace-nowrap">
                                              {new Date(conversation.updatedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                            </span>
                                          </ItemActions>
                                        </ItemHeader>
                                        <ItemFooter>
                                          <ItemDescription>
                                            {dataUtils.getPreviewText(conversation.lastMessage, 20)}
                                          </ItemDescription>
                                          {conversation.totalMessages > 0 && (
                                            <ItemActions>
                                              <span className="text-xs bg-red-500 text-white rounded-full px-1.5 py-0.5 min-w-4 text-center">
                                                {conversation.totalMessages > 99 ? "99+" : conversation.unreadCount}
                                              </span>
                                            </ItemActions>
                                          )}
                                        </ItemFooter>
                                      </ItemContent>
                                    </>
                                  )}
                            </Item>
                          </Link>
                        </div>
                      </SidebarMenuItem>
                    ))
              }
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 />
                  {state === "expanded" && (user?.name || "User")}
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="right"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem disabled>
                  <span>Account</span>
                </DropdownMenuItem>

                <DropdownMenuItem className="cursor-pointer" onClick={() => handleLogout()}>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

    </Sidebar>
  );
}

export default AppSidebar;
