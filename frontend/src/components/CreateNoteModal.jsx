import { useState, useEffect } from "react";
import axios from "axios";

const CreateNoteModal = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [folders, setFolders] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchFolders = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/folders/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFolders(res.data);
      if (res.data.length > 0) {
        setSelectedFolder(res.data[0]._id);
      }
    };
    if (isOpen) fetchFolders();
  }, [isOpen]);

  const handleSubmit = async () => {
    if (!title || !selectedFolder) return;
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("folder", selectedFolder);
    if (file) formData.append("file", file);

    await axios.post("http://localhost:5000/api/notes", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    onClose();
    setTitle("");
    setContent("");
    setFile(null);
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
              {folders.map((folder) => (
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
