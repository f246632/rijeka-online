"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  FileText,
  Plus,
  FolderOpen,
  Tags,
  Settings,
  LogOut,
} from "lucide-react";

const navigation = [
  {
    name: "Nadzorna ploča",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    name: "Članci",
    href: "/admin/articles",
    icon: FileText,
  },
  {
    name: "Novi članak",
    href: "/admin/articles/new",
    icon: Plus,
  },
  {
    name: "Kategorije",
    href: "/admin/categories",
    icon: FolderOpen,
  },
  {
    name: "Tagovi",
    href: "/admin/tags",
    icon: Tags,
  },
  {
    name: "Postavke",
    href: "/admin/settings",
    icon: Settings,
  },
];

interface SidebarProps {
  user?: {
    name: string;
    email: string;
    role: string;
  };
}

export function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 flex-col bg-gray-900 text-white">
      {/* Logo */}
      <div className="flex h-16 items-center justify-center border-b border-gray-800 px-4">
        <Link href="/admin" className="text-xl font-bold">
          Rijeka Online
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-gray-800 text-white"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              )}
            >
              <Icon className="h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* User section */}
      {user && (
        <div className="border-t border-gray-800 p-4">
          <div className="mb-3">
            <p className="text-sm font-medium">{user.name}</p>
            <p className="text-xs text-gray-400">{user.email}</p>
            <p className="mt-1 text-xs text-gray-500 uppercase">{user.role}</p>
          </div>
          <button
            onClick={() => {
              // Logout functionality will be implemented with NextAuth
              window.location.href = "/api/auth/signout";
            }}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-300 transition-colors hover:bg-gray-800 hover:text-white"
          >
            <LogOut className="h-4 w-4" />
            Odjava
          </button>
        </div>
      )}
    </div>
  );
}
