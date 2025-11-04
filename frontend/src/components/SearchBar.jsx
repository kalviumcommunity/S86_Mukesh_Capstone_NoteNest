import React from "react";

const SearchBar = ({ search, onSearchChange }) => {
  return (
    <div className="mb-8 flex justify-center">
      <input
        type="text"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search by title, code, explanation, or language..."
        className="border border-gray-300 rounded-lg px-4 py-2 w-full max-w-xl text-base shadow focus:outline-none focus:ring-2 focus:ring-blue-300"
      />
    </div>
  );
};

export default SearchBar;