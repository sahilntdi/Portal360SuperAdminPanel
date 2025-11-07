import { LayoutDashboard, Building2, Users, CreditCard, DollarSign, Puzzle, HelpCircle, BarChart3, Shield, Mail, Bot, FileCheck } from "lucide-react";
import { NavLink } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard, end: true },
  { title: "Organizations", url: "/organizations", icon: Building2, end: false },
  { title: "Users", url: "/users", icon: Users, end: false },
  { title: "Subscriptions", url: "/subscriptions", icon: CreditCard, end: false },
  { title: "Pricing", url: "/pricing", icon: DollarSign, end: false },
  { title: "Features", url: "/features", icon: Puzzle, end: false },
  { title: "Help & Support", url: "/help", icon: HelpCircle, end: false },
  { title: "Analytics", url: "/analytics", icon: BarChart3, end: false },
  { title: "Security", url: "/security", icon: Shield, end: false },
  { title: "Email Triggers", url: "/email-triggers", icon: Mail, end: false },
  { title: "AI & Automation", url: "/ai-automation", icon: Bot, end: false },
  { title: "Compliance", url: "/compliance", icon: FileCheck, end: false },
];

export function AppSidebar() {
  const { open } = useSidebar();

  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
      : "hover:bg-sidebar-accent/50 text-sidebar-foreground";

  return (
    <Sidebar className="border-r border-sidebar-border">
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">P</span>
          </div>
          {open && (
            <div>
              <h2 className="text-sidebar-foreground font-semibold text-base">Portal 360</h2>
              <p className="text-sidebar-foreground/60 text-xs">Superadmin</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end={item.end}
                      className={getNavCls}
                    >
                      <item.icon className="h-4 w-4" />
                      {open && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
