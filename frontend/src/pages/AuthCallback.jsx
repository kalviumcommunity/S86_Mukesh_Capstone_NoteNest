import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';

const DEPLOY_URL = import.meta.env.VITE_BACKEND_URL;

const AuthCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const handleCallback = async () => {
      const token = searchParams.get('token');
      const error = searchParams.get('error');

      if (error) {
        console.error('OAuth error:', error);
        navigate('/login?error=Authentication failed');
        return;
      }

      if (token) {
        try {
          // Store the token
          localStorage.setItem('token', token);

          // Fetch user data
          const response = await axios.get(`${DEPLOY_URL}/api/auth/profile`, {
            headers: { Authorization: `Bearer ${token}` }
          });

          localStorage.setItem('user', JSON.stringify(response.data.user));
          navigate('/home');
        } catch (error) {
          console.error('Error fetching user data:', error);
          localStorage.removeItem('token');
          navigate('/login?error=Failed to complete authentication');
        }
      } else {
        navigate('/login?error=No authentication token received');
      }
    };

    handleCallback();
  }, [navigate, searchParams]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
        <p className="text-gray-600">Completing authentication...</p>
      </div>
    </div>
  );
};

export default AuthCallback;