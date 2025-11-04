import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import FolderGrid from "../components/FolderGrid";
import CreateFolderModal from "../components/CreateFolderModal";
import CreateNoteModal from "../components/CreateNoteModal";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [folders, setFolders] = useState(() => {
    // Try to load cached folders from sessionStorage for instant display
    const cached = sessionStorage.getItem("folders");
    return cached ? JSON.parse(cached) : [];
  });
  const [loading, setLoading] = useState(folders.length === 0);
  const [isFolderModalOpen, setIsFolderModalOpen] = useState(false);
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false); // 🆕
  const [search, setSearch] = useState("");

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const fetchFolders = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
  const response = await axios.get(`${BACKEND_URL}/api/folders/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  const folderArray = Array.isArray(response.data) ? response.data : [];
  setFolders(folderArray);
  sessionStorage.setItem("folders", JSON.stringify(folderArray));
    } catch (err) {
      console.error("Error fetching folders:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchFolders();
  }, []);

  const handleCreateFolder = async (name) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
  `${BACKEND_URL}/api/folders`,
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
            <div className="flex flex-col gap-4 mt-6 md:flex-row md:items-center md:justify-between">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full md:w-auto">
                <div className="bg-white rounded-xl shadow px-6 py-4 flex flex-col items-center min-w-[120px]">
                  <span className="text-lg font-semibold text-blue-600">{folders.length}</span>
                  <span className="text-xs text-muted-foreground mt-1">Total Folders</span>
                </div>
                <div className="bg-white rounded-xl shadow px-6 py-4 flex flex-col items-center min-w-[120px]">
                  <span className="text-lg font-semibold text-green-600">{folders.reduce((acc, f) => acc + (f.noteCount || 0), 0)}</span>
                  <span className="text-xs text-muted-foreground mt-1">Total Files</span>
                </div>
                <div className="bg-white rounded-xl shadow px-6 py-4 flex flex-col items-center min-w-[120px]">
                  {/* Empty block for future use */}
                </div>
              </div>
              <div className="w-full md:w-auto flex justify-end">
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search folders..."
                  className="px-4 py-3 border rounded-xl w-full sm:w-64 md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 text-base shadow-sm"
                />
              </div>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
              <span className="ml-4 text-lg text-gray-500">Loading folders...</span>
            </div>
          ) : (
            <FolderGrid
              folders={folders.filter(f =>
                f.name.toLowerCase().includes(search.toLowerCase())
              )}
              setFolders={setFolders}
            />
          )}
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
