// src/components/Sidebar.jsx

import { Folder, File, Code } from "lucide-react";

const Sidebar = ({ isOpen }) => {
  const sidebarItems = [
    {
      label: "Create Folder",
      icon: Folder,
      onClick: () => console.log("Create Folder"),
      color: "text-blue-600",
    },
    {
      label: "Create File",
      icon: File,
      onClick: () => console.log("Create File"),
      color: "text-green-600",
    },
    {
      label: "Code Explanation",
      icon: Code,
      onClick: () => console.log("Code Explanation"),
      color: "text-purple-600",
    },
  ];

  return (
    <div
      className={`fixed inset-y-0 left-0 z-20 w-64 bg-white border-r transition-transform transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="pt-20 px-4">
        <h2 className="text-lg font-medium mb-4 px-2">Menu</h2>
        <nav className="space-y-2">
          {sidebarItems.map((item) => (
            <button
              key={item.label}
              onClick={item.onClick}
              className="flex items-center w-full px-4 py-2 rounded hover:bg-gray-100 transition"
            >
              <item.icon className={`mr-2 h-5 w-5 ${item.color}`} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;