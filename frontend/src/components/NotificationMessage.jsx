import React from "react";

const NotificationMessage = ({ message }) => {
  if (!message) return null;

  return (
    <div 
      style={{ position: 'fixed', left: 24, bottom: 24, zIndex: 100 }} 
      className="bg-white border border-green-400 rounded-lg px-6 py-3 text-green-700 font-semibold shadow-lg"
    >
      {message}
    </div>
  );
};

export default NotificationMessage;