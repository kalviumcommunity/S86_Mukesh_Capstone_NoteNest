import React from "react";
import ExplanationCard from "./ExplanationCard";

const ExplanationList = ({ explanations, search, onEdit, onDelete, onView }) => {
  const filteredExplanations = explanations.filter(exp => {
    const q = search.toLowerCase();
    return (
      exp.name?.toLowerCase().includes(q) ||
      exp.code?.toLowerCase().includes(q) ||
      exp.explanation?.toLowerCase().includes(q) ||
      exp.language?.toLowerCase().includes(q)
    );
  });

  if (explanations.length === 0) {
    return (
      <div className="col-span-2 text-lg text-gray-500 mb-4 text-center">
        No code explanations added yet.
      </div>
    );
  }

  if (filteredExplanations.length === 0) {
    return (
      <div className="col-span-2 text-lg text-gray-500 mb-4 text-center">
        No explanations found for "{search}".
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {filteredExplanations.map((exp, idx) => (
        <ExplanationCard
          key={exp._id || idx}
          explanation={exp}
          index={explanations.findIndex(e => e._id === exp._id)}
          onEdit={onEdit}
          onDelete={onDelete}
          onView={onView}
        />
      ))}
    </div>
  );
};

export default ExplanationList;