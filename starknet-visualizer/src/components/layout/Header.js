// src/components/layout/Header.js
import React from 'react';
import { Link, NavLink } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-indigo-900 text-white shadow-lg">
      <div className="container mx-auto px-4 py-5">
        <div className="flex justify-between items-center">
          {/* Logo/Title Section */}
          <div>
            <Link to="/" className="text-white hover:text-white">
              <h1 className="text-2xl font-bold">StarkNet Visualized</h1>
              <p className="text-indigo-200 mt-1 text-sm">Understanding Cairo Smart Contracts From The Inside Out</p>
            </Link>
          </div>
          
          {/* Navigation Menu */}
          <nav>
            <ul className="flex space-x-6">
              <li>
                <NavLink 
                  to="/" 
                  className={({ isActive }) => 
                    isActive 
                      ? 'text-white font-medium border-b-2 border-white pb-1' 
                      : 'text-indigo-200 hover:text-white font-medium transition-colors'
                  }
                  end
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/learn" 
                  className={({ isActive }) => 
                    isActive 
                      ? 'text-white font-medium border-b-2 border-white pb-1' 
                      : 'text-indigo-200 hover:text-white font-medium transition-colors'
                  }
                >
                  Learn
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/about" 
                  className={({ isActive }) => 
                    isActive 
                      ? 'text-white font-medium border-b-2 border-white pb-1' 
                      : 'text-indigo-200 hover:text-white font-medium transition-colors'
                  }
                >
                  About
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;