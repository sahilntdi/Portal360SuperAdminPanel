import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Building2,
  Users,
  CreditCard,
  DollarSign,
  Puzzle,
  HelpCircle,
  BarChart3,
  Shield,
  Mail,
  Bot,
  FileCheck,
  Globe,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

import { NavLink, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
  useSidebar
} from "@/components/ui/sidebar";

// MENU ITEMS
const menuItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard, end: true },
  { title: "Organizations", url: "/organizations", icon: Building2 },
  { title: "Users", url: "/users", icon: Users },
  { title: "Subscriptions", url: "/subscriptions", icon: CreditCard },
  { title: "Pricing", url: "/pricing", icon: DollarSign },
  { title: "Features", url: "/features", icon: Puzzle },
  { title: "Website Content", url: "/website-content", icon: Globe },
  { title: "Help & Support", url: "/help", icon: HelpCircle },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
  { title: "Security", url: "/security", icon: Shield },
  { title: "Email Triggers", url: "/email-triggers", icon: Mail },
  { title: "AI & Automation", url: "/ai-automation", icon: Bot },
  { title: "Compliance", url: "/compliance", icon: FileCheck }
];

// ACTIVE + COLLAPSED ALIGNMENT FIX
const getNavCls = (active: boolean, collapsed: boolean) =>
  cn(
    "flex items-center w-full rounded-md transition-colors overflow-hidden",
    collapsed ? "justify-center h-10" : "gap-2 px-2 py-2",
    active
      ? "bg-sidebar-accent/40 text-sidebar-foreground font-semibold"
      : "text-sidebar-foreground hover:bg-sidebar-accent/40"
  );

export function AppSidebar() {
  const { open, toggleSidebar } = useSidebar();
  const collapsed = !open;
  const { pathname } = useLocation();

  return (
    <motion.div
      initial={false}
      animate={{
        width: collapsed ? 72 : 256,
        transition: {
          duration: 0.28,
          ease: [0.22, 1, 0.36, 1], // buttery smooth easing
        },
      }}
      style={{ willChange: "width" }}
      className="bg-sidebar text-sidebar-foreground h-screen flex flex-col border-r relative"
    >
      {/* Floating Collapse/Expand Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleSidebar}
        className="absolute -right-4 top-6 z-50 h-8 w-8 rounded-full border bg-background shadow-md hover:bg-sidebar-primary text-sidebar-foreground"
      >
        {collapsed ? (
          <ChevronRight className="h-5 w-5" />
        ) : (
          <ChevronLeft className="h-5 w-5" />
        )}
      </Button>

      {/* TOP HEADER */}
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold">P</span>
          </div>

          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                <h2 className="font-semibold text-base leading-tight">Portal 360</h2>
                <p className="text-sm text-sidebar-foreground/60">Superadmin</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </SidebarHeader>

      {/* MENU */}
      <Sidebar collapsible="none" className="!w-full !max-w-full h-full overflow-hidden transition-none">
        <SidebarContent>
          <SidebarGroup>

            {/* Animated Group Label */}
            <AnimatePresence>
              {!collapsed && (
                <SidebarGroupLabel>
                  <motion.div
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    transition={{ duration: 0.2 }}
                  >
                    Management
                  </motion.div>
                </SidebarGroupLabel>
              )}
            </AnimatePresence>

            <SidebarGroupContent>
              <SidebarMenu>

                {menuItems.map((item) => {
                  const isActive =
                    item.end ? pathname === item.url : pathname.startsWith(item.url);

                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild tooltip={item.title}>
                        <NavLink
                          to={item.url}
                          end={item.end}
                          className={getNavCls(isActive, collapsed)}
                        >
                          <item.icon className="h-4 w-4 flex-shrink-0" />

                          <AnimatePresence>
                            {!collapsed && (
                              <motion.span
                                initial={{ opacity: 0, x: -6 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -6 }}
                                transition={{ duration: 0.2 }}
                                className="truncate"
                              >
                                {item.title}
                              </motion.span>
                            )}
                          </AnimatePresence>
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}

              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </motion.div>
  );
}
