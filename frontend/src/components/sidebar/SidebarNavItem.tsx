import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

interface SidebarNavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  collapsed: boolean;
  onNavigate?: () => void;
}

export function SidebarNavItem({ to, icon, label, collapsed, onNavigate }: SidebarNavItemProps) {
  return (
    <NavLink
      to={to}
      end={to === "/"}
      onClick={onNavigate}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
          "hover:bg-accent hover:text-accent-foreground",
          isActive ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground",
          collapsed && "justify-center px-2"
        )
      }
      title={collapsed ? label : undefined}
    >
      <span className="shrink-0 [&_svg]:size-5">{icon}</span>
      {!collapsed && <span className="truncate">{label}</span>}
    </NavLink>
  );
}
