 import { Book, Home,Calendar, Search, Settings, User } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Courses",
    url: "#",
    icon: Book,
  },
  {
    title: "Event",
    url: "/events",
    icon: Calendar,
  },
  
  {
    title: "Users",
    url: "#",
    icon: User,
  },
  {
    title: "Search",
    url: "#",
    icon:Search ,
  }, {
    title: " Settings",
    url: "#",
    icon: Settings,
  },
]
 
export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>JADARA</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}