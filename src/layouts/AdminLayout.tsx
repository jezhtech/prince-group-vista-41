import { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { Home, BarChart2, Users, CreditCard, Ticket, UserPlus, Menu, X, LogOut, Download, Settings, Link } from "lucide-react";
import Logo from "../components/Logo";
import { Button } from "@/components/ui/button";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const sidebarItems = [
    { name: "Dashboard", path: "/admin", icon: Home },
    { name: "Event Analytics", path: "/admin/event-analytics", icon: BarChart2 },
    { name: "Ticket Management", path: "/admin/tickets", icon: Ticket },
    { name: "Referrals", path: "/admin/referrals", icon: Link },
    { name: "Members", path: "/admin/membership", icon: UserPlus },
    { name: "Users", path: "/admin/users", icon: Users },
    { name: "Revenue", path: "/admin/revenue", icon: CreditCard },
  ];

  const isActiveLink = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "bg-ui-blue-500 text-white"
      : "text-gray-600 hover:bg-ui-blue-50 hover:text-ui-blue-600";

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "translate-x-0 md:w-64" : "-translate-x-full md:w-20"
        } fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transition-all duration-300 transform md:relative md:translate-x-0 shadow-md`}
      >
        <div className="flex flex-col h-full">
          <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
            {isSidebarOpen ? (
              <Logo />
            ) : (
              <div className="mx-auto">
                <div className="h-8 w-8 bg-ui-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  PG
                </div>
              </div>
            )}
            <button
              className="md:hidden p-1 rounded-md text-gray-500 hover:bg-gray-100"
              onClick={toggleSidebar}
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-4">
            <div className="px-4 mb-6">
              <div className="bg-prince-light rounded-lg p-3">
                <div className="flex items-center space-x-3">
                  <div className="h-8 w-8 min-w-8 bg-prince-green rounded-full flex items-center justify-center flex-shrink-0">
                    <Ticket size={16} className="text-white" />
                  </div>
                  {isSidebarOpen && (
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-prince-dark">Current Event</p>
                      <p className="text-sm font-bold text-prince-dark break-words">
                        Annual Developers Conference 2023
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <nav className="px-2 space-y-1">
              {sidebarItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    `${isActiveLink({ isActive })} flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors duration-200`
                  }
                  end={item.path === "/admin"}
                >
                  <item.icon
                    size={20}
                    className={isSidebarOpen ? "mr-3" : "mx-auto"}
                  />
                  {isSidebarOpen && <span>{item.name}</span>}
                </NavLink>
              ))}
            </nav>
          </div>

          <div className="p-4 border-t border-gray-200">
            {isSidebarOpen ? (
              <div className="space-y-2">
                <Button className="w-full flex items-center justify-center" variant="outline">
                  <Download size={18} className="mr-2" /> Export Data
                </Button>
              <Button className="w-full" variant="outline">
                <LogOut size={18} className="mr-2" /> Logout
              </Button>
              </div>
            ) : (
              <div className="space-y-2">
                <Button className="w-full p-2 flex justify-center" variant="outline">
                  <Download size={18} />
                </Button>
              <Button className="w-full p-2 flex justify-center" variant="outline">
                <LogOut size={18} />
              </Button>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white h-16 border-b border-gray-200 shadow-sm">
          <div className="container mx-auto h-full px-4 flex items-center justify-between">
            <div className="flex items-center">
            <button
                className="p-2 rounded-md text-gray-500 hover:bg-gray-100 md:mr-4"
              onClick={toggleSidebar}
            >
              <Menu size={24} />
            </button>
              <h1 className="text-lg font-bold hidden md:block">Event Management Console</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="hidden md:flex">
                <Settings size={18} className="mr-2" /> Settings
              </Button>
              <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">Admin User</span>
              <div className="h-8 w-8 bg-ui-blue-100 rounded-full flex items-center justify-center">
                <span className="text-xs font-medium text-ui-blue-600">AU</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
