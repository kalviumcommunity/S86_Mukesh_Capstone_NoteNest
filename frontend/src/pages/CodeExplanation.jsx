import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Button from "../components/ui/button";
import AddExplanationModal from "../components/AddExplanationModal";
import ViewExplanationModal from "../components/ViewExplanationModal";
import SearchBar from "../components/SearchBar";
import ExplanationList from "../components/ExplanationList";
import NotificationMessage from "../components/NotificationMessage";
import { api } from "../utils/api";

const CodeExplanation = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [explanations, setExplanations] = useState([]);
  const [search, setSearch] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [editIdx, setEditIdx] = useState(null);
  const [viewIdx, setViewIdx] = useState(null);
  const [message, setMessage] = useState("");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Fetch explanations on component mount
  useEffect(() => {
    const fetchExplanations = async () => {
      try {
        const response = await api.get("/explanations");
        setExplanations(response.data);
      } catch (error) {
        console.error("Failed to fetch explanations:", error);
        setMessage("Failed to fetch explanations.");
        setTimeout(() => setMessage(""), 2500);
      }
    };

    fetchExplanations();
  }, []);

  const handleEdit = (idx) => {
    setEditIdx(idx);
    setShowAdd(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this explanation?")) {
      try {
        await api.delete(`/explanations/${id}`);
        setExplanations((prev) => prev.filter((exp) => exp._id !== id));
        setMessage("Explanation deleted successfully.");
        setTimeout(() => setMessage(""), 2500);
      } catch (error) {
        console.error("Failed to delete explanation:", error);
        setMessage("Failed to delete explanation.");
        setTimeout(() => setMessage(""), 2500);
      }
    }
  };

  const handleView = (idx) => {
    setViewIdx(idx);
  };

  const handleSaveExplanation = async (doc) => {
    if (editIdx !== null && explanations[editIdx]?._id) {
      // Edit mode
      try {
        const res = await api.put(`/explanations/${explanations[editIdx]._id}`, doc);
        setExplanations((prev) => prev.map((item, i) => i === editIdx ? res.data : item));
        setMessage("Explanation updated successfully.");
        setTimeout(() => setMessage(""), 2500);
      } catch (err) {
        console.error("Failed to update explanation:", err);
        setMessage("Failed to update explanation.");
        setTimeout(() => setMessage(""), 2500);
      }
    } else {
      // Add mode
      try {
        const res = await api.post("/explanations", doc);
        setExplanations((prev) => [res.data, ...prev]);
        setMessage("Explanation added successfully.");
        setTimeout(() => setMessage(""), 2500);
      } catch (err) {
        console.error("Failed to add explanation:", err);
        setMessage("Failed to add explanation.");
        setTimeout(() => setMessage(""), 2500);
      }
    }
    setShowAdd(false);
    setEditIdx(null);
  };

  const handleCancelModal = () => {
    setShowAdd(false);
    setEditIdx(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <Navbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />

      <div className="flex">
        <Sidebar
          isOpen={isSidebarOpen}
          onCreateFolder={() => {}} // Add empty handlers if needed
        />

        <main
          className={`flex-1 transition-all duration-300 ease-in-out p-6 ${
            isSidebarOpen ? "ml-64" : "ml-0"
          }`}
        >
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
              <h2 className="text-4xl font-extrabold text-gray-900">Code Explanations</h2>
              <Button 
                onClick={() => { setShowAdd(true); setEditIdx(null); }} 
                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-blue-700 transition"
              >
                Add Explanation
              </Button>
            </div>
            
            <SearchBar search={search} onSearchChange={setSearch} />
            
            <ExplanationList
              explanations={explanations}
              search={search}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onView={handleView}
            />
          </div>
        </main>
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-10 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      <NotificationMessage message={message} />

      {/* Modals */}
      {showAdd && (
        <AddExplanationModal
          initialData={editIdx !== null ? explanations[editIdx] : null}
          onSave={handleSaveExplanation}
          onCancel={handleCancelModal}
        />
      )}

      {viewIdx !== null && (
        <ViewExplanationModal
          explanation={explanations[viewIdx]}
          onClose={() => setViewIdx(null)}
        />
      )}
    </div>
  );
};

export default CodeExplanation;
