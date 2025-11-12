import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import LogoIcon from './LogoIcon';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Mission', path: '/mission' },
  { name: 'Platform', path: '/platform' },
  { name: 'Team', path: '/team' },
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'Store', path: '/store' },
];

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const activeLinkStyle = {
    color: '#FF9933',
    textDecoration: 'underline',
    textUnderlineOffset: '8px',
  };

  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <NavLink to="/" className="flex items-center space-x-3 group">
          <LogoIcon className="transform group-hover:rotate-12 transition-transform duration-300" />
          <span className="text-3xl font-bebas text-yr-blue">YouR Role</span>
        </NavLink>
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className="text-slate-600 hover:text-yr-saffron transition duration-300 font-medium"
              style={({ isActive }) => (isActive ? activeLinkStyle : {})}
            >
              {link.name}
            </NavLink>
          ))}
          <NavLink
            to="/profile"
            className="bg-yr-saffron text-white font-bold py-2 px-4 rounded-full hover:bg-opacity-90 transition duration-300"
          >
            Play YouR Role
          </NavLink>
        </nav>
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-slate-800 focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
            </svg>
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <nav className="flex flex-col items-center py-4 space-y-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="text-slate-600 hover:text-yr-saffron transition duration-300 font-medium text-lg"
                style={({ isActive }) => (isActive ? activeLinkStyle : {})}
              >
                {link.name}
              </NavLink>
            ))}
            <NavLink
              to="/profile"
              onClick={() => setIsOpen(false)}
              className="bg-yr-saffron text-white font-bold py-3 px-6 rounded-full hover:bg-opacity-90 transition duration-300 w-full text-center"
            >
              Play YouR Role
            </NavLink>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;