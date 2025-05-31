 import { Book, Home,Calendar, Search, Settings, User } from "lucide-react"
//  import { useEffect, useState } from "react";
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
    url: "/home",
    icon: Home,
  },
  {
    title: "Courses",
    url: "/showCourses",
    icon: Book,
  },
  {
    title: "Event",
    url: "/showEvent",
    icon: Calendar,
  },
  
  {
    title: "Users",
    url: "showUsers",
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
  // const role = localStorage.getItem("userRole");

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>JADARA
              {/* Welcome {role === "admin" ? "Admin" : "User"} */}
          </SidebarGroupLabel>
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