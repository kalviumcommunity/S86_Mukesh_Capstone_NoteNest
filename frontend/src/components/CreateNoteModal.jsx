import { useState, useEffect } from "react";
import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const CreateNoteModal = ({ isOpen, onClose, fetchFolders }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [folders, setFolders] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchFolders = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${BACKEND_URL}/api/folders/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Defensive: ensure folders is always an array
      const folderList = Array.isArray(res.data) ? res.data : [];
      setFolders(folderList);
      if (folderList.length > 0) {
        setSelectedFolder(folderList[0]._id);
      }
    };
    if (isOpen) fetchFolders();
  }, [isOpen]);

  const handleSubmit = async () => {
    if (!title) {
      setError("Please enter a title for your note.");
      return;
    }
    if (!selectedFolder) return;
    setError("");
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("folder", selectedFolder);
    if (file) formData.append("file", file);

    await axios.post(`${BACKEND_URL}/api/notes`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    if (typeof fetchFolders === "function") {
      await fetchFolders();
    }
    const folderObj = folders.find(f => f._id === selectedFolder);
    setSuccess(`File added in folder ${folderObj?.name || ""}`);
    setTimeout(() => {
      setSuccess("");
      onClose();
      setTitle("");
      setContent("");
      setFile(null);
      setError("");
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
      <div className="bg-white rounded-xl w-[90%] max-w-md p-6 shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>
        <h2 className="text-xl font-semibold mb-1">Create Note</h2>
        <p className="text-sm text-gray-500 mb-4">Enter the details for your new note</p>
        <div className="space-y-4">
          {error && (
            <div className="text-red-600 text-sm mb-2">{error}</div>
          )}
          {/* Success message as toast in bottom left */}
          {success && (
            <div className="fixed bottom-8 left-8 bg-white rounded-lg shadow px-6 py-3 flex items-center gap-2 border z-50">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-green-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              <span>{success}</span>
            </div>
          )}
          <div>
            <label className="text-sm font-medium">Title</label>
            <input
              className="w-full border p-2 rounded mt-1"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter note title"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Content</label>
            <textarea
              className="w-full border p-2 rounded mt-1"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter content"
              rows={4}
            />
          </div>
          <div>
            <label className="text-sm font-medium">Select Folder</label>
            <select
              className="w-full border p-2 rounded mt-1"
              value={selectedFolder}
              onChange={(e) => setSelectedFolder(e.target.value)}
            >
              {(Array.isArray(folders) ? folders : []).map((folder) => (
                <option key={folder._id} value={folder._id}>
                  {folder.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium">Attach File</label>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="block w-full mt-1 text-sm text-gray-600"
            />
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 border rounded text-sm hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-black text-white rounded text-sm hover:bg-gray-800"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateNoteModal;
