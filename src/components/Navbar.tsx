import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, LogIn, UserPlus, Upload, User, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Navbar: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-2 text-xl font-bold">
            <BookOpen size={24} />
            <span>EduShare</span>
          </Link>
          <div className="space-x-4">
            {isAuthenticated ? (
              <>
                <Link to="/upload" className="hover:text-blue-200 flex items-center">
                  <Upload size={18} className="mr-1" />
                  Upload
                </Link>
                <Link to="/profile" className="hover:text-blue-200 flex items-center">
                  <User size={18} className="mr-1" />
                  Profile
                </Link>
                <button onClick={logout} className="hover:text-blue-200 flex items-center">
                  <LogOut size={18} className="mr-1" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-blue-200 flex items-center">
                  <LogIn size={18} className="mr-1" />
                  Login
                </Link>
                <Link to="/register" className="hover:text-blue-200 flex items-center">
                  <UserPlus size={18} className="mr-1" />
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;