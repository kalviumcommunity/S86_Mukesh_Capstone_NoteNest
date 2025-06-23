import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, CardContent } from "../components/ui/card";
import { FileText, Pencil, Trash2 } from "lucide-react";
import Navbar from "../components/Navbar";
import NoteEditingPage from "../components/NoteEditingPage";

const FolderPage = () => {
  const { folderId } = useParams();
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);
  const navigate = useNavigate();

  const fetchNotes = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:5000/api/notes/folder/${folderId}`, {
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
      await axios.delete(`http://localhost:5000/api/notes/${noteId}`, {
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
      if (updated.file) {
        formData.append("file", updated.file);
      }

      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:5000/api/notes/${updated._id}`, formData, {
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
        <button
          onClick={() => navigate("/home")}
          className="text-blue-600 mb-4 underline"
        >
          ← Back to Home
        </button>
        <h2 className="text-2xl font-bold mb-4">Notes in this Folder</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {notes.map((note) => (
            <Card key={note._id} className="hover:shadow-sm relative">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <FileText className="text-blue-500" />
                    <h4 className="font-semibold text-lg">{note.title}</h4>
                  </div>
                  <div className="flex gap-2">
                    <Pencil
                      className="w-4 h-4 text-yellow-600 cursor-pointer"
                      onClick={() => setEditingNote(note)}
                      title="Edit"
                    />
                    <Trash2
                      className="w-4 h-4 text-red-500 cursor-pointer"
                      onClick={() => handleDelete(note._id)}
                      title="Delete"
                    />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{note.content}</p>
                {note.file && (
                  <a
                    href={`http://localhost:5000/uploads/${note.file}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 underline mt-2 inline-block"
                  >
                    View Attachment
                  </a>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
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
