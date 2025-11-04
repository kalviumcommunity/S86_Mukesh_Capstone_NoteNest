import React from "react";
import Button from "./ui/button";

const ViewExplanationModal = ({ explanation, onClose }) => {
  if (!explanation) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30" 
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-xl w-[98%] max-w-4xl p-8 shadow-lg relative border">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">{explanation.name}</h2>
            <Button onClick={onClose} className="px-4 py-2">
              Close
            </Button>
          </div>
          
          <div className="mb-4">
            <span className="inline-block px-3 py-1 text-sm rounded bg-blue-100 text-blue-700 font-semibold">
              {explanation.language || "Unknown"}
            </span>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Code:</h3>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                <code>{explanation.code}</code>
              </pre>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Explanation:</h3>
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed">{explanation.explanation}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-gray-400 mt-6">
            <span>Created: {explanation.timestamp || new Date().toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewExplanationModal;