import * as React from "react";
import { BarChart3, ChevronLeft, ChevronRight, Home, Package, Plus, X } from "lucide-react";
import { SidebarNavItem } from "./SidebarNavItem";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { to: "/", label: "Bosh sahifa", icon: <Home /> },
  { to: "/models", label: "Modellar", icon: <Package /> },
  { to: "/models/new", label: "Yangi model", icon: <Plus /> },
  { to: "/analytics", label: "Tahlil", icon: <BarChart3 /> },
];

interface SidebarProps {
  mobileOpen: boolean;
  onMobileClose: () => void;
}

export function Sidebar({ mobileOpen, onMobileClose }: SidebarProps) {
  const [collapsed, setCollapsed] = React.useState(false);

  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onMobileClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex h-screen w-64 shrink-0 flex-col border-r bg-sidebar text-sidebar-foreground transition-transform duration-200",
          "lg:static lg:translate-x-0 lg:transition-[width]",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
          collapsed ? "lg:w-[76px]" : "lg:w-64"
        )}
      >
        <div className="flex items-center gap-2 px-4 py-5">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground font-semibold">
            M
          </div>
          {!collapsed && (
            <span className="truncate text-base font-semibold text-foreground">
              Model Analytics
            </span>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={onMobileClose}
            aria-label="Sidebar'ni yopish"
            className="ml-auto lg:hidden"
          >
            <X className="size-4" />
          </Button>
        </div>

        <nav className="flex flex-1 flex-col gap-1 px-3">
          {NAV_ITEMS.map((item) => (
            <SidebarNavItem
              key={item.to}
              {...item}
              collapsed={collapsed}
              onNavigate={onMobileClose}
            />
          ))}
        </nav>

        <div className="flex items-center justify-between gap-2 px-3 pb-3">
          {!collapsed && <ThemeToggle />}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed((prev) => !prev)}
            aria-label={collapsed ? "Sidebar'ni kengaytirish" : "Sidebar'ni yig'ish"}
            className={cn("hidden lg:inline-flex", collapsed && "mx-auto")}
          >
            {collapsed ? <ChevronRight className="size-4" /> : <ChevronLeft className="size-4" />}
          </Button>
        </div>
      </aside>
    </>
  );
}
