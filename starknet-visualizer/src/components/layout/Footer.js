// src/components/layout/Footer.js (Simple Version)
import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Brand */}
          <div className="mb-4 md:mb-0">
            <Link to="/" className="text-white hover:text-white">
              <h2 className="text-xl font-bold">Starknet Visualized</h2>
            </Link>
            <p className="text-gray-400 mt-1">© {new Date().getFullYear()} - Educational Resource</p>
          </div>
          
          {/* Links */}
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6">
            <a 
              href="https://docs.starknet.io" 
              className="text-gray-400 hover:text-white transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Starknet Docs
            </a>
            <a 
              href="https://book.cairo-lang.org" 
              className="text-gray-400 hover:text-white transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Cairo Book
            </a>
            <Link 
              to="/about" 
              className="text-gray-400 hover:text-white transition-colors"
            >
              About
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;