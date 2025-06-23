import { useState } from "react";
import { Folder, File, Code, FolderGit2 } from "lucide-react"; // Added FolderGit2 icon
import { useNavigate } from "react-router-dom";
import CreateNoteModal from "./CreateNoteModal";

const Sidebar = ({ isOpen, onCreateFolder }) => {
  const [noteModalOpen, setNoteModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleSaveNote = (noteData) => {
    console.log("Saved Note:", noteData);
  };

  const sidebarItems = [
    {
      label: "Create Folder",
      icon: Folder,
      onClick: onCreateFolder,
      color: "text-blue-600",
    },
    {
      label: "Create File",
      icon: File,
      onClick: () => setNoteModalOpen(true),
      color: "text-green-600",
    },
    {
      label: "Code Explanation",
      icon: Code,
      onClick: () => navigate("/code-explanation"),
      color: "text-purple-600",
    },
    {
      label: "Projects",
      icon: FolderGit2, // You can use any other icon you prefer
      onClick: () => navigate("/projects"),
      color: "text-pink-600",
    },
  ];

  return (
    <>
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

      {/* Create Note Modal */}
      <CreateNoteModal
        isOpen={noteModalOpen}
        onClose={() => setNoteModalOpen(false)}
        onSave={handleSaveNote}
      />
    </>
  );
};

export default Sidebar;
