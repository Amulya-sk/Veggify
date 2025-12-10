import React, { useState, useEffect } from 'react' ;
import { Link, useNavigate } from 'react-router-dom';
import { HiBars3BottomRight } from "react-icons/hi2";
import { RiCloseCircleLine } from "react-icons/ri";
const MobileNav = ({menuItems, Logo,onClose,hideLeft,onOpen}) => {
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
    onClose(); // Close the mobile menu
    navigate('/');
  };

  return (
    <div className='h-16 flex justify-between items-center px-6 lg:px-12'>
       <a href="/">
        <img src={Logo} alt="logo"/>
        </a>
        <button onClick={onOpen} className='border border-primary rounded'>
            <HiBars3BottomRight className='w-7 h-7'/>
        </button>
         <div className={`transition-all w-full h-full fixed bg-primary z-50 top-0 ${hideLeft} flex justify-center items-center`}>
            <button onClick={onClose} className='absolute right-8 top-32'>
                <RiCloseCircleLine className='w-7 h-7'/>
            </button>
            <div>
              <ul className='flex flex-col gap-5'>
                {menuItems?.map((menu, index) => (
                  <li key={index}>
                    <Link to={menu} onClick={onClose} className='font-medium capitalize text-secondary text-2xl'>{menu}</Link>
                    </li>
                ))}
              </ul>
               <ul className='flex flex-col gap-4 font-medium mt-10'>
                <li>
                  <Link to="/create-recipe" onClick={onClose} className='text-btnColor px-4 py-2 rounded border border-btnColor block text-center hover:bg-btnColor hover:text-white transition-all'>Create Recipe</Link>
                </li>
                {isLoggedIn ? (
                  <li>
                    <button 
                      onClick={handleLogout}
                      className='bg-red-600 text-white px-4 py-2 rounded block text-center hover:bg-red-700 transition-all w-full'
                    >
                      Logout
                    </button>
                  </li>
                ) : (
                  <>
                    <li>
                      <Link to="/login" onClick={onClose} className='text-secondary px-4 py-2 rounded border block text-center'>Log In</Link>
                    </li>
                    <li>
                      <Link to="/signup" onClick={onClose} className='bg-btnColor text-white px-4 py-2 rounded block text-center hover:bg-opacity-90 transition-all'>Sign Up</Link>
                    </li>
                  </>
                )}
               </ul>
            </div>
        </div> 
    </div>
  )
}

export default MobileNav