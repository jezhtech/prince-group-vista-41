import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { ChevronDown, LogOut, Ticket, User, UserCircle } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const UserProfile = ({
  mode = "light",
}: {
  mode?: "light" | "dark";
}) => {
  const { currentUser, logout, userData } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed");
    }
  };
  if (!currentUser)
    return (
      <Button
        asChild
        variant="ghost"
        className={cn(
          "rounded-full",
          mode === "dark"
            ? "text-white hover:bg-[#85cbc3]/20 hover:text-white"
            : "hover:bg-[#85cbc3]/20 text-gray-700"
        )}
      >
        <Link to="/login">
          <User className="lg:mr-2 h-4 w-4" />
          <span className="hidden lg:inline">Login</span>
        </Link>
      </Button>
    );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "rounded-full",
            mode === "dark"
              ? "text-white hover:bg-[#85cbc3]/20 hover:text-white"
              : "hover:bg-[#85cbc3]/20 text-gray-700"
          )}
        >
          <User className="mr-2 h-4 w-4" />
          <span className="hidden lg:inline">
            {currentUser.displayName ||
              currentUser.email?.split("@")[0] ||
              "User"}
          </span>
          <ChevronDown className="ml-1 h-3 w-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 z-[999]">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {currentUser.displayName || "User"}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {currentUser.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link
            to={userData?.role === "admin" ? "/admin" : "/member/dashboard"}
          >
            <UserCircle className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            to={
              userData?.role === "admin" ? "/admin/tickets" : "/member/tickets"
            }
          >
            <Ticket className="mr-2 h-4 w-4" />
            <span>Tickets</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="text-red-600">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
