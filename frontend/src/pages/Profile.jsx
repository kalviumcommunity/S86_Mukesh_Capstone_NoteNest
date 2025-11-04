import React, { useEffect, useState, useRef } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


const Profile = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef();

  useEffect(() => {
    // Fetch user from backend
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
  const res = await axios.get(`${BACKEND_URL}/api/auth/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const u = res.data.user;
        setUser(u);
        setName(u.name || "");
        setEmail(u.email || "");
        setBio(u.bio || "");
        setAvatarPreview(u.avatar || "/images/Notenest-logo.png");
  // Only open edit mode if this is the first time (no bio or avatar) and only on first load
  // Do not auto-open edit mode when navigating to profile page after initial setup
  // Remove auto setEditMode here
      } catch {
        // fallback demo user if error
        const u = { name: "User Name", email: "user@example.com", bio: "", avatar: "" };
        setUser(u);
        setName(u.name || "");
        setEmail(u.email || "");
        setBio(u.bio || "");
        setAvatarPreview(u.avatar || "/images/Notenest-logo.png");
        setEditMode(true);
      }
    };
    fetchUser();
  }, []);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setAvatarPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const payload = { name, bio };
      // Only send avatar if changed (base64 string)
      if (avatarPreview && avatarPreview !== user.avatar) {
        payload.avatar = avatarPreview;
      }
      const res = await axios.put(
        `${BACKEND_URL}/api/auth/profile`,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUser(res.data.user);
      setEditMode(false);
      setSuccess(true);
      window.dispatchEvent(new Event("profileUpdated"));
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      alert("Failed to update profile: " + (err.response?.data?.msg || err.message));
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#fff]">
      <Navbar />
      <main className="flex flex-col items-center mt-12">
  {/* ...existing code... */}
        <h1 className="text-5xl font-extrabold mb-2 text-[#18181b]">Profile</h1>
        <p className="text-lg text-[#71717a] mb-8">Manage your personal information and settings</p>
        <section className="bg-white rounded-2xl shadow p-10 w-full max-w-2xl flex flex-col items-center border">
          <h2 className="text-2xl font-bold mb-1 text-[#18181b] text-left w-full">Personal Information</h2>
          <p className="text-sm text-[#71717a] mb-6 text-left w-full">Update your photo and personal details here</p>
          <div className="flex flex-row w-full items-center gap-8">
            <div className="flex flex-col items-center justify-center">
              <img
                src={avatarPreview || "/public/images/Notenest-logo.png"}
                alt="User Avatar"
                className="w-28 h-28 rounded-full border-4 border-white shadow object-cover mb-2"
              />
              {editMode && (
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleAvatarChange}
                  className="mt-2 text-xs"
                />
              )}
            </div>
            <div className="flex-1">
              <div className="flex flex-col items-start w-full">
                <span className="font-semibold text-base text-[#18181b]">Name</span>
                {editMode ? (
                  <input
                    className="mb-2 border rounded px-3 py-2 w-full text-base"
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                ) : (
                  <span className="mb-2 text-base">{user.name}</span>
                )}
                <span className="font-semibold text-base text-[#18181b]">Email</span>
                {editMode ? (
                  <input
                    className="mb-2 border rounded px-3 py-2 w-full text-base"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                ) : (
                  <span className="mb-2 text-base">{user.email}</span>
                )}
                <span className="font-semibold text-base text-[#18181b]">Bio</span>
                {editMode ? (
                  <textarea
                    className="border rounded px-3 py-2 w-full text-base"
                    value={bio}
                    onChange={e => setBio(e.target.value)}
                  />
                ) : (
                  <span className="text-base">{user.bio || ""}</span>
                )}
              </div>
            </div>
            <div className="flex flex-col items-end justify-between h-full">
              {!editMode && (
                <button
                  className="px-6 py-2 bg-[#18181b] text-white rounded-lg font-semibold text-base"
                  onClick={() => setEditMode(true)}
                >
                  Edit Profile
                </button>
              )}
              {editMode && (
                <button
                  className="px-6 py-2 bg-[#18181b] text-white rounded-lg font-semibold text-base mt-2"
                  onClick={handleSave}
                >
                  Save Profile
                </button>
              )}
            </div>
          </div>
        </section>
        <button
          className="mt-8 px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold text-base"
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
        >
          Logout
        </button>
        {success && (
          <div className="fixed bottom-8 right-8 bg-white rounded-lg shadow px-6 py-3 flex items-center gap-2 border">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-green-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            <span>Profile updated successfully</span>
          </div>
        )}
      </main>
    </div>
  );
};

export default Profile;
