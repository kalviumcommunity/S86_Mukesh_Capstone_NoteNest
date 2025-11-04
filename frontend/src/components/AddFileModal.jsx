import React, { useState } from "react";

const AddFileModal = ({ isOpen, onClose, onUpload }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]);
  const [preview, setPreview] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files);
    setFiles(selected);
    setPreview(selected.map(f =>
      f.type.startsWith("image/") ? URL.createObjectURL(f) : null
    ));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const dropped = Array.from(e.dataTransfer.files);
    setFiles(dropped);
    setPreview(dropped.map(f =>
      f.type.startsWith("image/") ? URL.createObjectURL(f) : null
    ));
  };

  const handleUpload = async () => {
    setUploading(true);
    await onUpload({ title, content, files });
    setUploading(false);
    setTitle("");
    setContent("");
    setFiles([]);
    setPreview([]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-xl w-[90%] max-w-md p-6 shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>
        <h2 className="text-xl font-semibold mb-1">Add File/Note</h2>
        <div className="space-y-4 mt-4">
          <div>
            <label className="text-sm font-medium">Title</label>
            <input
              className="w-full border p-2 rounded mt-1"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter file/note title"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Content</label>
            <textarea
              className="w-full border p-2 rounded mt-1"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter content (optional)"
              rows={3}
            />
          </div>
          <div
            className="w-full border-2 border-dashed rounded p-4 text-center cursor-pointer bg-gray-50 hover:bg-gray-100"
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => document.getElementById("file-input").click()}
          >
            <input
              id="file-input"
              type="file"
              className="hidden"
              onChange={handleFileChange}
              multiple
            />
            {files.length > 0 ? (
              <div className="flex flex-wrap gap-2 justify-center">
                {files.map((f, idx) => (
                  <div key={idx} className="flex flex-col items-center">
                    {preview[idx] ? (
                      <img src={preview[idx]} alt="Preview" className="mt-2 max-h-16 rounded" />
                    ) : (
                      <span className="mt-2 text-xs text-gray-600">{f.name}</span>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <span>Drag & drop file(s) here, or click to select</span>
            )}
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 border rounded text-sm hover:bg-gray-100"
              disabled={uploading}
            >
              Cancel
            </button>
            <button
              onClick={handleUpload}
              className="px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
              disabled={uploading || !title}
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFileModal;
