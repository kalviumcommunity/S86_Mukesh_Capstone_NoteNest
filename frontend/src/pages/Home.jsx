import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import FolderGrid from "../components/FolderGrid";
import CreateFolderModal from "../components/CreateFolderModal";
import CreateNoteModal from "../components/CreateNoteModal"; // 🆕

const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [folders, setFolders] = useState([]);
  const [isFolderModalOpen, setIsFolderModalOpen] = useState(false);
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false); // 🆕

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const fetchFolders = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/folders/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFolders(response.data);
    } catch (err) {
      console.error("Error fetching folders:", err);
    }
  };

  useEffect(() => {
    fetchFolders();
  }, []);

  const handleCreateFolder = async (name) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/api/folders",
        { name },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setFolders((prev) => [...prev, response.data]);
    } catch (err) {
      console.error("Error creating folder:", err);
    }
  };

  return (
    <div className="min-h-screen bg-background relative">
      <Navbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />

      <div className="flex">
        <Sidebar
          isOpen={isSidebarOpen}
          onCreateFolder={() => setIsFolderModalOpen(true)}
          onCreateFile={() => setIsNoteModalOpen(true)} // 🆕
        />

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

          <FolderGrid folders={folders} setFolders={setFolders} />
        </main>
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-10 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      <CreateFolderModal
        isOpen={isFolderModalOpen}
        onClose={() => setIsFolderModalOpen(false)}
        onCreate={handleCreateFolder}
      />

      <CreateNoteModal
        isOpen={isNoteModalOpen}
        onClose={() => setIsNoteModalOpen(false)}
        folders={folders}
        fetchFolders={fetchFolders}
      />
    </div>
  );
};

export default Home;
