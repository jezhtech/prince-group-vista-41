import { cn, isIOS } from "@/lib/utils";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Ticket } from "lucide-react";

export const EventNavbar = ({
  mode = "light",
}: {
  mode?: "light" | "dark";
}) => {
  const navigate = useNavigate();

  return (
    <nav
      style={{
        marginTop: isIOS() ? "48px" : 0,
      }}
      className={cn(
        "sticky top-12 left-0 right-0 z-10 backdrop-blur py-3 shadow-md",
        mode === "dark" && "bg-black/20",
        mode === "light" && "bg-white/20"
      )}
    >
      <div className="container mx-auto px-3 sm:px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 p-2 pb-0 md:p-0">
            <img
              src="/logo.png"
              alt="Prince Group"
              className="h-10 w-60 object-contain"
            />
          </Link>

          <div className={cn("items-center gap-2 hidden md:flex")}>
            <Button
              className="bg-gradient-to-r from-pink-600 to-red-600 hover:from-pink-700 hover:to-red-700 text-white text-lg"
              onClick={() => navigate("/events?eventDialogue=true")}
            >
              <Ticket className="mr-2 h-5 w-5" />
              Book Tickets Now
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
