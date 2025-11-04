import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
const DEPLOY_URL = import.meta.env.VITE_BACKEND_URL;
import Navbar from "../components/Navbar";
import GoogleOAuthButton from "../components/GoogleOAuthButton";

const Login = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Check for OAuth errors in URL params
  useEffect(() => {
    const error = searchParams.get('error');
    if (error) {
      setErrorMsg(decodeURIComponent(error));
    }
  }, [searchParams]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    try {
  const res = await axios.post(`${DEPLOY_URL}/api/auth/login`, formData);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setErrorMsg("Welcome back!");
      setTimeout(() => {
        navigate("/home");
      }, 1200);
    } catch (error) {
      const msg = error.response?.data?.msg || error.response?.data?.error || error.message;
      setErrorMsg(msg);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex flex-1 items-center justify-center px-4">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Login to Your Account</h2>
          {errorMsg && (
            <div className="mb-4 text-red-600 text-center font-semibold">{errorMsg}</div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="w-full px-3 py-2 border rounded" />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded pr-10"
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-black focus:outline-none"
                style={{ cursor: 'pointer', background: 'none', border: 'none', padding: 0 }}
                onClick={() => setShowPassword((prev) => !prev)}
                tabIndex={-1}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  // Hide password icon (custom SVG)
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                    <path d="M12 5C7 5 3.1 8.1 1.5 12c1.6 3.9 5.5 7 10.5 7s8.9-3.1 10.5-7C20.9 8.1 17 5 12 5z"/>
                    <circle cx="12" cy="12" r="3"/>
                    <line x1="3" y1="3" x2="21" y2="21"/>
                  </svg>
                ) : (
                  // Show password icon
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="18" height="18">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
            <button type="submit" className="w-full bg-black text-white py-2 rounded">Login</button>
          </form>

          <br />

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with email</span>
            </div>
          </div>

          {/* Google OAuth Button */}
          <div className="mb-6">
            <GoogleOAuthButton text="Continue with Google" />
          </div>

          <p className="text-sm mt-4 text-center">
            Don’t have an account? <Link to="/signup" className="text-blue-600 hover:underline">Sign Up</Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Login;
