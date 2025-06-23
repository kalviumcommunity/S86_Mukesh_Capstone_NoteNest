import { Link, useNavigate } from "react-router-dom";
import { Menu as MenuIcon } from "lucide-react";
import Button from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const Navbar = ({ toggleSidebar = () => {}, isSidebarOpen }) => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleTitleClick = () => {
    navigate(isLoggedIn ? "/home" : "/");
  };

  if (isLoggedIn) {
    return (
      <header className="sticky top-0 z-30 w-full border-b bg-background">
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
              className="text-xl font-semibold cursor-pointer"
            >
              NoteNest
            </h1>
          </div>
          <div className="ml-auto flex items-center gap-4">
            <p className="text-sm text-muted-foreground">
              {user?.name || "User"}
            </p>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>
                {user?.name?.slice(0, 2).toUpperCase() || "UN"}
              </AvatarFallback>
            </Avatar>
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
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
