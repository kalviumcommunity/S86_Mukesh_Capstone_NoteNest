import { useState, useEffect, useRef } from "react";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


const NoteEditingPage = ({ editingNote, onCancel, onSave }) => {
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [newFiles, setNewFiles] = useState([]); // multiple new files
  const [removeFiles, setRemoveFiles] = useState([]); // filenames to remove
  const [existingFiles, setExistingFiles] = useState([]); // current files
  const fileInputRef = useRef();

  useEffect(() => {
    if (editingNote) {
      setEditTitle(editingNote.title);
      setEditContent(editingNote.content);
      setExistingFiles(Array.isArray(editingNote.files) ? editingNote.files : []);
      setRemoveFiles([]);
      setNewFiles([]);
    }
  }, [editingNote]);

  const handleRemoveExistingFile = (filename) => {
    setRemoveFiles((prev) => [...prev, filename]);
    setExistingFiles((prev) => prev.filter((f) => f !== filename));
  };

  const handleNewFilesChange = (e) => {
    setNewFiles(Array.from(e.target.files));
    // Clear the file input so the same file can be selected again
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = () => {
    onSave({
      _id: editingNote._id,
      title: editTitle,
      content: editContent,
      newFiles,
      removeFiles,
      resetFiles: () => {
        setNewFiles([]);
        if (fileInputRef.current) fileInputRef.current.value = "";
      },
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
            <label className="text-sm font-medium">Attachments</label>
            {/* Existing files */}
            {existingFiles.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-2">
                {existingFiles.map((file, idx) => (
                  <div key={idx} className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded">
                    <a
                      href={`${BACKEND_URL}/uploads/${file}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-600 underline truncate max-w-[80px]"
                    >
                      {file}
                    </a>
                    <button
                      type="button"
                      className="text-red-500 text-xs ml-1 hover:underline"
                      onClick={() => handleRemoveExistingFile(file)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
            {/* Add new files */}
            <input
              type="file"
              className="w-full border p-2 rounded mt-1"
              multiple
              onChange={handleNewFilesChange}
              ref={fileInputRef}
            />
            {newFiles.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {newFiles.map((f, idx) => (
                  <span key={idx} className="text-xs bg-blue-50 px-2 py-1 rounded">{f.name}</span>
                ))}
              </div>
            )}
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
