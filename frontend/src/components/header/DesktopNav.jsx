import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const DesktopNav = ({menuItems,Logo}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in by checking localStorage
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      setIsLoggedIn(!!token);
    };
    
    checkAuth();
    
    // Listen for storage changes (e.g., when user logs in from another tab)
    window.addEventListener('storage', checkAuth);
    
    // Also listen for custom event for same-tab login/logout
    window.addEventListener('authChange', checkAuth);
    
    return () => {
      window.removeEventListener('storage', checkAuth);
      window.removeEventListener('authChange', checkAuth);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    // Dispatch event to update navbar auth state
    window.dispatchEvent(new Event('authChange'));
    navigate('/');
  };

  return (
    <div className='h-16 flex justify-between items-center px-6 lg:px-12'>
        <a href="/">
        <img src={Logo} alt="logo"/>
        </a>
        <ul className='flex gap-7'>
          {
            menuItems?.map((menu,index) => 
            (
              <li key={index}>
                <Link to={menu} className='font-medium capitalize text-secondary'>{menu}</Link>
              </li>
            ))
          }
        </ul>
        {/* login and signup btn */}
        <ul className='flex items-center gap-4 font-medium'>
          <li>
            <Link to="/create-recipe" className='text-btnColor px-4 py-2 rounded hover:bg-btnColor hover:text-white transition-all duration-300'>Create Recipe</Link>
          </li>
          {isLoggedIn ? (
            <li>
              <button 
                onClick={handleLogout}
                className='bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-all duration-300'
              >
                Logout
              </button>
            </li>
          ) : (
            <>
              <li>
                <Link to="/login" className='text-secondary px-4 py-2 rounded hover:text-btnColor transition-colors'>Log In</Link>
              </li>
              <li>
                <Link to="/signup" className='bg-btnColor text-white px-4 py-2 rounded hover:bg-opacity-90 transition-all duration-300'>Sign Up</Link>
              </li>
            </>
          )}
        </ul>
    </div>
  )
}
export default DesktopNav