import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { DiscountHeader } from "@/components/DiscountHeader";
import { Outlet } from "react-router-dom";

export function AppLayout() {
  return (
    <SidebarProvider>
      <div className="flex flex-col min-h-screen w-full">

        {/* TOP BANNER (Optional) */}
        <DiscountHeader />

        <div className="flex flex-1 w-full">
          <AppSidebar />

          {/* MAIN AREA */}
          <div className="flex-1 min-w-0 relative">

            {/* HEADER (same height as sidebar header) */}
            <header className="h-14 flex items-center gap-4 border-b bg-background px-6 sticky top-0 z-10">
              {/* <SidebarTrigger /> */}
              <div className="flex-1" />
              <ThemeToggle />
            </header>

            {/* MAIN PAGE CONTENT */}
            <main className="p-6 overflow-x-auto bg-background h-[calc(100vh-56px-40px)]">
              <Outlet />
            </main>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
