import React from "react";

const ExplanationCard = ({ explanation, index, onEdit, onDelete, onView }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6 flex flex-col gap-3 transition hover:shadow-xl">
      <div className="flex items-center justify-between mb-2">
        <div>
          <span className="text-xl font-bold text-gray-900">{explanation.name}</span>
          <span className="ml-3 px-2 py-1 text-xs rounded bg-blue-100 text-blue-700 font-semibold">
            {explanation.language || "Unknown"}
          </span>
        </div>
        <div className="flex gap-2">
          <button 
            className="text-blue-600 hover:bg-blue-50 px-3 py-1 rounded text-sm font-semibold transition" 
            onClick={() => onEdit(index)}
          >
            Edit
          </button>
          <button 
            className="text-red-600 hover:bg-red-50 px-3 py-1 rounded text-sm font-semibold transition" 
            onClick={() => onDelete(explanation._id)}
          >
            Delete
          </button>
          <button 
            className="text-gray-700 hover:bg-gray-100 px-3 py-1 rounded text-sm font-semibold transition" 
            onClick={() => onView(index)}
          >
            View
          </button>
        </div>
      </div>
      <div className="flex items-center justify-between text-xs text-gray-400">
        <span>Created: {explanation.timestamp || new Date().toLocaleString()}</span>
      </div>
    </div>
  );
};

export default ExplanationCard;