import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
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
  ChevronRight,
  LogOut,
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
  useSidebar,
} from "@/components/ui/sidebar";
import { useTheme } from "next-themes";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { logout } from "@/store/slices/authSlice";
import { Dialog, DialogOverlay, DialogPortal } from "@/components/ui/dialog";
import * as DialogPrimitive from "@radix-ui/react-dialog";

// MENU ITEMS
const menuItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard, end: true },
  { title: "Organisation", url: "/organizations", icon: Building2 },
  { title: "Users", url: "/users", icon: Users },
  { title: "Subscriptions", url: "/subscriptions", icon: CreditCard },
  { title: "Pricing", url: "/pricing", icon: DollarSign },
  { title: "Features", url: "/features", icon: Puzzle },
  { title: "Website Content", url: "/website-content", icon: Globe },
  { title: "Help & Support", url: "/help", icon: HelpCircle },
  { title: "Security", url: "/security", icon: Shield },
  { title: "Email Triggers", url: "/email-triggers", icon: Mail },
  // { title: "AI & Automation", url: "/ai-automation", icon: Bot },
  // { title: "Compliance", url: "/compliance", icon: FileCheck },
  { title: "Website Queries", url: "/website-queries", icon: Mail },
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
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  // console.log("User in Sidebar:", user);
  const { open, toggleSidebar } = useSidebar();
  const collapsed = !open;
  const { pathname } = useLocation();
  const { theme } = useTheme();
  const [emailTriggerNoticeOpen, setEmailTriggerNoticeOpen] = useState(false);
  return (
    <motion.div
      initial={false}
      animate={{
        width: collapsed ? 72 : 256,
        transition: {
          duration: 0.28,
          ease: [0.22, 1, 0.36, 1],
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
          <div className="h-12 w-12 rounded-lg overflow-hidden flex items-center justify-center">
            <img
               src={theme === "dark" ? "/login-logo.png" : "/login-logo.png"}
              alt="Portal 360 Logo"
              className="h-full w-full object-contain"
            />
          </div>

          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                <h2 className="font-semibold text-base leading-tight">
                  Portal 360
                </h2>
                <p className="text-sm text-sidebar-foreground/60">
                  SaasAdmin
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </SidebarHeader>

      {/* MENU */}
      <Sidebar
        collapsible="none"
        className="!w-full !max-w-full h-full overflow-hidden transition-none"
      >
        <SidebarContent>
          <SidebarGroup>
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
                          onClick={(e) => {
                            if (item.url === "/email-triggers") {
                              e.preventDefault();
                              setEmailTriggerNoticeOpen(true);
                            }
                          }}
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

      {/* ================================================================= */}
      {/*                    USER SECTION (BOTTOM FIXED)                    */}
      {/* ================================================================= */}

      {/* ================= USER SECTION ================= */}
      <motion.div
        initial={false}
        animate={{
          height: collapsed ? 60 : 70,
          transition: { duration: 0.25 },
        }}
        className="border-t border-sidebar-accent/20 px-3 py-2 flex items-center cursor-pointer group"
        onClick={() => {
          dispatch(logout());
          window.location.href = "/auth";
        }}
      >
        {/* Avatar */}
        <div className="h-10 w-10 rounded-full overflow-hidden bg-primary/20 flex items-center justify-center">
          <span className="text-primary font-semibold text-sm">
            {user?.firstName?.[0] || "U"}
          </span>
        </div>

        {/* USER INFO */}
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -6 }}
              transition={{ duration: 0.2 }}
              className="flex-1 flex flex-col ml-3 leading-tight overflow-hidden"
            >
              <span className="font-medium text-[13px] truncate">
                {user ? `${user.firstName} ${user.lastName}` : ""}
              </span>

              <span className="text-xs text-sidebar-foreground/60 truncate">
                {user?.role || ""}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Logout Icon (Only when expanded) */}
        {!collapsed && (
          <LogOut className="h-4 w-4 text-sidebar-foreground/60 group-hover:text-red-500 transition" />
        )}
      </motion.div>

      <Dialog open={emailTriggerNoticeOpen} onOpenChange={setEmailTriggerNoticeOpen}>
        <DialogPortal>
          <DialogOverlay
            className={cn(
              "bg-transparent backdrop-blur-sm top-0 right-0 bottom-0",
              collapsed ? "left-[72px]" : "left-[256px]"
            )}
          />
          <DialogPrimitive.Content
            className="fixed left-1/2 top-1/2 z-50 w-[92vw] max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-lg border bg-background/80 p-6 shadow-lg backdrop-blur supports-[backdrop-filter]:bg-background/60"
          >
            <div className="space-y-4">
              <div className="text-center">
                <p className="text-base font-medium">Email Trigger is not functional yet.</p>
              </div>
              <div className="flex justify-center">
                <DialogPrimitive.Close asChild>
                  <Button variant="default">Close</Button>
                </DialogPrimitive.Close>
              </div>
            </div>
          </DialogPrimitive.Content>
        </DialogPortal>
      </Dialog>

    </motion.div>
  );
}
