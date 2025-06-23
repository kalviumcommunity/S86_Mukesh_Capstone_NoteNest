import { Folder, Trash2 } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FolderGrid = ({ refreshFlag }) => {
  const [folders, setFolders] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchFolders();
  }, [refreshFlag]); // Re-fetch when parent changes flag

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

  const handleFolderClick = (folderId) => {
    navigate(`/folder/${folderId}`);
  };

  const handleRename = (folder) => {
    setEditingId(folder._id);
    setEditName(folder.name);
  };

  const handleRenameSubmit = async (folderId) => {
    if (!editName.trim()) return;

    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:5000/api/folders/${folderId}`,
        { name: editName },
        {
          headers: {
            Authorization: `Bearer ${token}` },
        }
      );
      setFolders((prev) =>
        prev.map((f) => (f._id === folderId ? response.data : f))
      );
      setEditingId(null);
    } catch (err) {
      console.error("Error renaming folder:", err);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this folder?");
    if (!confirm) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/folders/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFolders((prev) => prev.filter((folder) => folder._id !== id));
    } catch (err) {
      console.error("Error deleting folder:", err);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
      {folders.map((folder) => (
        <Card key={folder._id} className="hover:shadow-md transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-blue-50 rounded-full">
                <Folder
                  className="h-8 w-8 text-note-folder cursor-pointer"
                  onClick={() => handleFolderClick(folder._id)}
                />
              </div>
            </div>

            {editingId === folder._id ? (
              <div className="flex flex-col items-center">
                <input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  onBlur={() => handleRenameSubmit(folder._id)}
                  onKeyDown={(e) => e.key === "Enter" && handleRenameSubmit(folder._id)}
                  className="border px-2 py-1 rounded text-center text-sm w-full"
                  autoFocus
                />
              </div>
            ) : (
              <h3
                className="font-medium text-center text-lg cursor-pointer"
                onClick={() => handleRename(folder)}
              >
                {folder.name}
              </h3>
            )}

            <p className="text-sm text-center text-muted-foreground mt-1">
              {folder.noteCount || 0} items
            </p>
          </CardContent>
          <div className="flex justify-between items-center p-2">
            <div className="text-xs text-muted-foreground">
              Updated {new Date(folder.updatedAt).toLocaleString()}
            </div>
            <div>
              <button onClick={() => handleDelete(folder._id)} title="Delete Folder">
                <Trash2 className="h-4 w-4 text-red-500 hover:text-red-700" />
              </button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default FolderGrid;
