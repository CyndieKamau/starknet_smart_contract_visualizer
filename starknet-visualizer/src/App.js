// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Import all your pages
import HomePage from './pages/HomePage';
import DeploymentPage from './pages/Deployment';
import SimpleStorageOne from './pages/SimpleStorageOne';
import SimpleStorageTwo from './pages/SimpleStorageTwo';
import ConstructorPage from './pages/ConstructorPage';
import LearnPage from './pages/LearnPage';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50">
        {/* Header - appears on all pages */}
        <Header />
        
        {/* Main content area */}
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            {/* Home page route */}
            <Route path="/" element={<HomePage />} />

            <Route path="/learn" element={<LearnPage />} />
            
            {/* Individual lesson pages */}
            <Route path="/deployment" element={<DeploymentPage />} />
            <Route path="/storageone" element={<SimpleStorageOne />} />
            <Route path="/storagetwo" element={<SimpleStorageTwo/>} />
            <Route path="/constructor" element={<ConstructorPage />} />
           
            
            
            {/* Catch-all route for 404 errors (optional) */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        
        {/* Footer - appears on all pages */}
        <Footer />
      </div>
    </Router>
  );
}

// Optional: 404 Not Found component
function NotFound() {
  return (
    <div className="text-center py-16">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Page Not Found</h1>
      <p className="text-gray-600 mb-8">The page you're looking for doesn't exist.</p>
      <a 
        href="/" 
        className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
      >
        Go Back Home
      </a>
    </div>
  );
}

export default App;
