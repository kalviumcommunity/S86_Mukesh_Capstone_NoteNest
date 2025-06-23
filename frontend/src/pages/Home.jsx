//src/pages/Home.jsx

import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar stays full width, no padding */}
      <Navbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />

      {/* Sidebar and content container */}
      <div className="flex">
        <Sidebar isOpen={isSidebarOpen} />

        {/* Content shifts right when sidebar open */}
        <main
          className={`flex-1 transition-all duration-300 ease-in-out p-6 ${
            isSidebarOpen ? "ml-64" : "ml-0"
          }`}
        >
          <div className="space-y-2 pb-6">
            <h2 className="text-3xl font-bold tracking-tight">Your Notes</h2>
            <p className="text-muted-foreground">
              Manage and organize your notes and folders.
            </p>
          </div>
          {/* Your other page content */}
        </main>
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-10 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
};

export default Home;