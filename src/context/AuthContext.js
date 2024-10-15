import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Create a context for authentication
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check localStorage for user details to persist login state
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setAuthData(JSON.parse(storedUserData));
    }
  }, []);

  const handleLogin = (loginResponse) => {
    const { role, fname, userId } = loginResponse;
    const userData = { role, fname, userId };

    localStorage.setItem('userData', JSON.stringify(userData));
    setAuthData(userData);

    if (role === 'seller') {
      navigate('/seller-home');
    } else {
      navigate('/');  
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userData');
    setAuthData(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ authData, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
