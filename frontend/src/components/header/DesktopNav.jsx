import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'

const DesktopNav = ({ menuItems, Logo }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Function to check auth status
  const checkAuthStatus = () => {
    const token = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');
    if (token && storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    } else {
      setIsLoggedIn(false);
      setUsername('');
    }
  };

  useEffect(() => {
    // Check auth status on mount and route changes
    checkAuthStatus();
  }, [location]);

  useEffect(() => {
    // Listen for custom login event
    const handleLoginEvent = () => {
      checkAuthStatus();
    };

    window.addEventListener('userLoggedIn', handleLoginEvent);
    window.addEventListener('storage', checkAuthStatus);

    return () => {
      window.removeEventListener('userLoggedIn', handleLoginEvent);
      window.removeEventListener('storage', checkAuthStatus);
    };
  }, []);

  const handleLogout = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setIsLoggedIn(false);
    setUsername('');
    setShowLogoutConfirm(false);
    navigate('/');
  };

  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  return (
    <div className='h-16 flex justify-between items-center px-6 lg:px-12'>
      <a href="/">
        <img src={Logo} alt="logo" />
      </a>
      <ul className='flex gap-7'>
        {
          menuItems?.map((menu, index) =>
          (
            <li key={index}>
              <Link to={menu} className='font-medium capitalize text-secondary'>{menu}</Link>
            </li>
          ))
        }
      </ul>
      {/* login and signup btn or user info */}
      {isLoggedIn ? (
        <div className='flex items-center gap-4'>
          <Link to="/create-recipe" className='text-btnColor px-4 py-2 rounded hover:bg-btnColor hover:text-white transition-all duration-300 font-medium'>
            Create Recipe
          </Link>
          <div className='flex items-center gap-3 bg-gradient-to-r from-green-50 to-emerald-50 px-4 py-2 rounded-lg border border-green-200'>
            <span className='text-secondary font-medium'>Welcome, <span className='text-btnColor font-semibold'>{username}</span></span>
          </div>
          <button
            onClick={handleLogout}
            className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-all duration-300 font-medium shadow-sm hover:shadow-md'
          >
            Logout
          </button>
        </div>
      ) : (
        <ul className='flex items-center gap-4 font-medium'>
          <li>
            <Link to="/create-recipe" className='text-btnColor px-4 py-2 rounded hover:bg-btnColor hover:text-white transition-all duration-300'>Create Recipe</Link>
          </li>
          <li>
            <Link to="/login" className='text-secondary px-4 py-2 rounded hover:text-btnColor transition-colors'>Log In</Link>
          </li>
          <li>
            <Link to="/signup" className='bg-btnColor text-white px-4 py-2 rounded hover:bg-opacity-90 transition-all duration-300'>Sign Up</Link>
          </li>
        </ul>
      )}

      {/* Logout Confirmation Dialog */}
      {showLogoutConfirm && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl'>
            <h3 className='text-xl font-semibold text-secondary mb-4'>Confirm Logout</h3>
            <p className='text-gray-600 mb-6'>Are you sure you want to logout?</p>
            <div className='flex gap-4 justify-end'>
              <button
                onClick={cancelLogout}
                className='px-6 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-all duration-300 font-medium'
              >
                No
              </button>
              <button
                onClick={confirmLogout}
                className='px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-all duration-300 font-medium'
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
export default DesktopNav