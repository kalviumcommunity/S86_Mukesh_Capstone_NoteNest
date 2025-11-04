import { Link, useNavigate } from "react-router-dom";
import { Menu as MenuIcon } from "lucide-react";
import Button from "./ui/button";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

import React, { useEffect, useState } from "react";

const Navbar = ({ toggleSidebar = () => {}, isSidebarOpen }) => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
  const res = await fetch(`${BACKEND_URL}/api/auth/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch user");
        const data = await res.json();
        setUser(data.user);
      } catch {
        setUser(null);
      }
    };
    if (isLoggedIn) fetchUser();

    // Listen for profile update event
    const handleProfileUpdated = () => {
      if (isLoggedIn) fetchUser();
    };
    window.addEventListener("profileUpdated", handleProfileUpdated);
    return () => {
      window.removeEventListener("profileUpdated", handleProfileUpdated);
    };
  }, [isLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleTitleClick = () => {
    navigate(isLoggedIn ? "/home" : "/");
  };

  if (isLoggedIn) {
    return (
  <header className="sticky top-0 z-30 w-full border-b bg-white">
        <div className="flex h-16 items-center px-4 w-full">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="mr-2 text-gray-700"
            >
              <MenuIcon className="h-5 w-5 text-black" />
              <span className="sr-only">Toggle sidebar</span>
            </Button>
            <h1
              onClick={handleTitleClick}
              className="text-xl font-bold cursor-pointer"
            >
              NoteNest
            </h1>
          </div>
          <div className="ml-auto flex items-center gap-4">
            <p className="text-sm text-muted-foreground">
              {user?.name || "User"}
            </p>
            <div onClick={() => navigate("/profile")}
                 className="cursor-pointer">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover border border-gray-300"
                />
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                </svg>
              )}
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="border-b py-4 px-6 md:px-8 flex items-center justify-between bg-white sticky top-0 z-50 shadow-sm">
      <Link to="/" className="flex items-center gap-2">
        <span className="text-xl md:text-2xl font-bold text-primary">
          NoteNest
        </span>
      </Link>
      <div className="flex gap-2">
        <Link to="/login">
          <Button variant="outline" size="sm">
            Login
          </Button>
        </Link>
        <Link to="/signup">
          <Button
            variant="outline"
            size="sm"
            className="text-white bg-black hover:bg-gray-800"
          >
            Sign Up
          </Button>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
