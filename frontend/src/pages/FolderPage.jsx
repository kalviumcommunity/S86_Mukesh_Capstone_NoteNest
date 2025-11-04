import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import { Card, CardContent } from "../components/ui/card";
import AddFileModal from "../components/AddFileModal";
import { FileText, Pencil, Trash2, ArrowLeft } from "lucide-react";
import Button from "../components/ui/button";
import Navbar from "../components/Navbar";
import NoteEditingPage from "../components/NoteEditingPage";

const FolderPage = () => {
  const { folderId } = useParams();
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");
  const [editingNote, setEditingNote] = useState(null);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const handleAddFile = async ({ title, content, files }) => {
    setUploading(true);
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("folder", folderId);
      if (Array.isArray(files)) {
        files.forEach((file) => formData.append("file", file));
      }
  await axios.post(`${BACKEND_URL}/api/notes`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      await fetchNotes();
    } catch (err) {
      alert("Error uploading file/note");
    }
    setUploading(false);
  };
  const navigate = useNavigate();

  const fetchNotes = async () => {
    try {
      const token = localStorage.getItem("token");
  const response = await axios.get(`${BACKEND_URL}/api/notes/folder/${folderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(response.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [folderId]);

  const handleDelete = async (noteId) => {
    const confirm = window.confirm("Are you sure you want to delete this note?");
    if (!confirm) return;

    try {
      const token = localStorage.getItem("token");
  await axios.delete(`${BACKEND_URL}/api/notes/${noteId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchNotes();
    } catch (err) {
      console.error("Error deleting note:", err);
    }
  };

  const handleEditSave = async (updated) => {
    try {
      const formData = new FormData();
      formData.append("title", updated.title);
      formData.append("content", updated.content);
      // Add new files (if any)
      if (updated.newFiles && updated.newFiles.length > 0) {
        updated.newFiles.forEach((file) => formData.append("file", file));
      }
  // Always send removeFiles as JSON string (even if empty)
  formData.append("removeFiles", JSON.stringify(updated.removeFiles || []));

      const token = localStorage.getItem("token");
  await axios.put(`${BACKEND_URL}/api/notes/${updated._id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setEditingNote(null);
      fetchNotes();
    } catch (err) {
      console.error("Error updating note:", err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <Button
            onClick={() => navigate("/home")}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <ArrowLeft size={18} />
            Back to Home
          </Button>
          <button
            onClick={() => setAddModalOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded font-semibold shadow hover:bg-blue-700"
          >
            + Add File
          </button>
        </div>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
          <h2 className="text-2xl font-bold">Files in this Folder</h2>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search files..."
            className="px-4 py-2 border rounded-xl w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 text-base shadow-sm"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {search && notes.filter(n => n.title.toLowerCase().includes(search.toLowerCase())).length === 0 ? (
              <div className="col-span-full text-center text-red-400 py-12 text-lg">There is no file with this name.</div>
            ) : null}
            {!search && notes.length === 0 && (
              <div className="col-span-full text-center text-gray-400 py-12 text-lg">No files or notes yet. Click "Add File" to get started!</div>
            )}
          {notes.filter(n => n.title.toLowerCase().includes(search.toLowerCase())).map((note) => (
            <Card key={note._id} className="hover:shadow-lg transition-shadow relative rounded-xl overflow-hidden border border-gray-200 bg-white">
              <CardContent className="p-0 flex flex-col h-full">
                <div className="relative w-full h-36 bg-gray-50 flex items-center justify-center border-b overflow-x-auto">
                  {Array.isArray(note.files) && note.files.length > 0 ? (
                    <div className="flex w-full h-full gap-2 items-center justify-center">
                      {note.files.map((file, idx) =>
                        file.match(/\.(jpg|jpeg|png|gif)$/i) ? (
                          <img
                            key={idx}
                            src={`${BACKEND_URL}/uploads/${file}`}
                            alt="thumbnail"
                            className="object-cover w-24 h-24 rounded shadow border"
                          />
                        ) : (
                          <div key={idx} className="flex flex-col items-center justify-center w-24 h-24 bg-white rounded shadow border">
                            <FileText className="w-8 h-8 text-blue-400 mb-1" />
                            <span className="text-xs text-gray-400 truncate max-w-[80px]">{file}</span>
                          </div>
                        )
                      )}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center w-full h-full">
                      <FileText className="w-12 h-12 text-blue-400 mb-2" />
                      <span className="text-xs text-gray-400">No Preview</span>
                    </div>
                  )}
                  <div className="absolute top-2 right-2 flex gap-2 z-10">
                    <button onClick={() => setEditingNote(note)} title="Edit" className="bg-white rounded-full p-1 shadow hover:bg-gray-100">
                      <Pencil className="w-4 h-4 text-yellow-600" />
                    </button>
                    <button onClick={() => handleDelete(note._id)} title="Delete" className="bg-white rounded-full p-1 shadow hover:bg-gray-100">
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </div>
                <div className="flex-1 flex flex-col p-4">
                  <h4 className="font-semibold text-lg truncate mb-1" title={note.title}>{note.title}</h4>
                  <p className="text-sm text-muted-foreground line-clamp-2 min-h-[32px] mb-2">{note.content}</p>
                  {Array.isArray(note.files) && note.files.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-1">
                      {note.files.map((file, idx) => (
                        <a
                          key={idx}
                          href={`${BACKEND_URL}/uploads/${file}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-blue-600 underline inline-block truncate max-w-[120px]"
                        >
                          {file}
                        </a>
                      ))}
                    </div>
                  )}
                  <div className="text-xs text-gray-400 mt-auto">
                    {note.updatedAt ? (() => {
                      const updated = new Date(note.updatedAt);
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
                    })() : ""}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <AddFileModal
          isOpen={addModalOpen}
          onClose={() => setAddModalOpen(false)}
          onUpload={handleAddFile}
        />
      </div>

      {editingNote && (
        <NoteEditingPage
          editingNote={editingNote}
          onCancel={() => setEditingNote(null)}
          onSave={handleEditSave}
        />
      )}
    </>
  );
};

export default FolderPage;
