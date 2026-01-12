import { Sidebar } from "@/components/admin/Sidebar";
import { MobileMenuButton } from "@/components/admin/MobileMenuButton";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // Temporary: Skip auth check until NextAuth is fully configured
  // if (!session) {
  //   redirect("/admin/login");
  // }

  const user = {
    name: session?.user?.name || "Administrator",
    email: session?.user?.email || "admin@rijekaonline.hr",
    role: (session?.user?.role as any) || "ADMIN",
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <aside className="hidden lg:block">
        <Sidebar user={user} />
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex h-16 items-center justify-between border-b bg-white px-6">
          <div className="flex items-center gap-4">
            <MobileMenuButton />
            <h1 className="text-xl font-semibold text-gray-900">
              Admin Panel
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">{user.name}</span>
            <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center text-sm font-medium text-gray-700">
              {user.name.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
