import { Folder, Trash2 } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const FolderGrid = ({ folders, setFolders }) => {
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const navigate = useNavigate();

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
  `${BACKEND_URL}/api/folders/${folderId}`,
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
  await axios.delete(`${BACKEND_URL}/api/folders/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFolders((prev) => prev.filter((folder) => folder._id !== id));
    } catch (err) {
      console.error("Error deleting folder:", err);
    }
  };

  if (!Array.isArray(folders) || folders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center mt-16 text-center">
        <p className="text-lg font-semibold mb-2">No folders found</p>
        <p className="text-muted-foreground mb-4">Create a folder to add files in it.</p>
      </div>
    );
  }

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
              {(() => {
                const updated = new Date(folder.updatedAt);
                const now = new Date();
                const diffMs = now - updated;
                const diffSec = Math.floor(diffMs / 1000);
                const diffMin = Math.floor(diffSec / 60);
                const diffHr = Math.floor(diffMin / 60);
                const isToday = updated.toDateString() === now.toDateString();
                if (diffMin < 1) return "Updated just now";
                if (diffHr < 1) return `Updated ${diffMin} min ago`;
                if (isToday) return `Updated ${diffHr} hr ago`;
                return `Updated on ${updated.toLocaleDateString()}`;
              })()}
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
