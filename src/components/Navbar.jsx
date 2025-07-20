import React from 'react'
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faBell, faUser } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Navbar({ toggleSideBar  }) {

    const [showNotifications, setShowNotifications] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const handleNotifications = () => {
        setShowNotifications((prev) => !prev);
    };
    const [showUserProfile, setShowUserProfile] = React.useState(false);

    const handleUserProfile = () => {
        setShowUserProfile((prev) => !prev);
    };  
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchTerm.trim() !== '') {
      navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm('');
    }
  };


  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
  };
    
    return (
        <div className="w-full h-20 bg-blue-400 text-white flex items-center justify-between px-4 sm:px-6 md:max-w-screen sm:max-w-full md:min-w-full sm:min-w-screen md:justify-between sm:justify-between  absolute  shadow-2xl">

            <div className="flex items-center gap-4">
                <button onClick={toggleSideBar} className='cursor-pointer p-4'>
                    <FontAwesomeIcon icon={faBars} size="2xl" />
                </button>



                <h1 className="text-4xl sm:text-2xl font-bold hidden sm:block">Ecommerce Store</h1>
            </div>

            <div className="flex items-center gap-4 sm:gap-6 relative">
                  <div className="relative w-64 sm:w-80">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          className="px-4 py-2 pr-10 rounded-lg bg-white text-black w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          size="lg"
          onClick={handleSearch}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black cursor-pointer"
        />
      </div>
                <div>

                </div>
                <Link to="/cart">
                    <FontAwesomeIcon icon={faCartShopping} size='2xl' style={{ color: "white" }} />
                </Link>
                <FontAwesomeIcon icon={faBell} size='2xl' style={{ color: "white" }} onClick={handleNotifications} />
                {showNotifications && (
                    <div className='bg-gray-100 rounded-xl shadow-xl p-6 h-40 w-80 absolute top-16 right-4'>
                        <span className='text-gray-500 '>No Notifications</span>
                    </div>
                )}
                <div className='flex items-center gap-2 p-2 cursor-pointer relative' onClick={handleUserProfile}>
                    <FontAwesomeIcon icon={faUser} size='2xl' />
                    <span className="hidden lg:inline bg-amber-50 text-black px-2 py-1 rounded-lg text-sm font-bold">
                        Hi! User
                    </span>
                    {showUserProfile && (
                        <div className='bg-white text-black rounded-xl shadow-xl p-6 w-64 absolute top-14 right-0 z-50'>
                            <div className="flex flex-col items-center">
                                <FontAwesomeIcon icon={faUser} size='3x' className="mb-2" />
                                <span className="font-bold text-lg mb-1">User Name</span>
                                <span className="text-gray-500 mb-4">user@email.com</span>
                                <button className="bg-amber-300 text-white px-4 py-2 rounded-lg font-semibold hover:bg-amber-400 transition">
                                    Logout
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Navbar