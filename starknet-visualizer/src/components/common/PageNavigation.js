// src/components/common/PageNavigation.js
import React from 'react';
import { Link } from 'react-router-dom';

function PageNavigation({ prevLink, nextLink, prevText, nextText }) {
  return (
    <div className="bg-indigo-100 rounded-lg p-6 flex justify-between items-center">
      <Link 
        to={prevLink} 
        className="bg-white text-indigo-600 border border-indigo-600 px-6 py-2 rounded-lg hover:bg-indigo-50"
      >
        ← {prevText}
      </Link>
      
      <Link 
        to={nextLink} 
        className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
      >
        {nextText} →
      </Link>
    </div>
  );
}

export default PageNavigation;