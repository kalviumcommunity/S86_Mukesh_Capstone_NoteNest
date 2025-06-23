import React from "react";

export const Avatar = ({ children, className = "" }) => {
  return (
    <div className={`relative inline-block h-10 w-10 overflow-hidden rounded-full bg-gray-200 ${className}`}>
      {children}
    </div>
  );
};

export const AvatarImage = ({ src, alt }) => {
  return (
    <img
      className="h-full w-full object-cover"
      src={src}
      alt={alt}
    />
  );
};

export const AvatarFallback = ({ children }) => {
  return (
    <span className="flex h-full w-full items-center justify-center text-sm font-medium text-gray-600">
      {children}
    </span>
  );
};

export default Avatar;
