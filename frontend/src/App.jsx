// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landingPage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import FolderPage from "./pages/FolderPage";
import Profile from "./pages/Profile";
import CodeExplanation from "./pages/CodeExplanation";
import AuthCallback from "./pages/AuthCallback";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/auth/callback" element={<AuthCallback />} />
      <Route path="/home" element={<Home />} />
      <Route path="/folder/:folderId" element={<FolderPage />} />
  <Route path="/profile" element={<Profile />} />
  <Route path="/code-explanation" element={<CodeExplanation />} />
    </Routes>
  </BrowserRouter>
);

export default App;
