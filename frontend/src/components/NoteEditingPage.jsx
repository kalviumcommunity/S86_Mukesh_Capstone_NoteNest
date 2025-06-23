import { useState, useEffect } from "react";

const NoteEditingPage = ({ editingNote, onCancel, onSave }) => {
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [newFile, setNewFile] = useState(null);

  useEffect(() => {
    if (editingNote) {
      setEditTitle(editingNote.title);
      setEditContent(editingNote.content);
    }
  }, [editingNote]);

  const handleSubmit = () => {
    onSave({
      _id: editingNote._id,
      title: editTitle,
      content: editContent,
      file: newFile,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
      <div className="bg-white rounded-xl w-[90%] max-w-md p-6 shadow-lg relative">
        <button
          onClick={onCancel}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>
        <h2 className="text-xl font-semibold mb-1">Edit Note</h2>
        <div className="space-y-4 mt-4">
          <div>
            <label className="text-sm font-medium">Title</label>
            <input
              className="w-full border p-2 rounded mt-1"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium">Content</label>
            <textarea
              className="w-full border p-2 rounded mt-1"
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              rows={4}
            />
          </div>
          <div>
            <label className="text-sm font-medium">Attachment (optional)</label>
            <input
              type="file"
              className="w-full border p-2 rounded mt-1"
              onChange={(e) => setNewFile(e.target.files[0])}
            />
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={onCancel}
              className="px-4 py-2 border rounded text-sm hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-black text-white rounded text-sm hover:bg-gray-800"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteEditingPage;
