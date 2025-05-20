// src/pages/LearnPage.js
import React from 'react';
import { Link } from 'react-router-dom';

function LearnPage() {
  const lessons = [
    {
      id: 'deployment',
      title: 'Smart Contract Deployment',
      description: 'Learn how smart contracts are processed in Starknet - from Cairo code to Sierra/CASM, through the sequencer, to proof generation.',
      level: 'Beginner',
      path: '/deployment',
      icon: '🚀',
      topics: ['Compilation', 'Sequencer', 'Proof Generation']
    },
    {
      id: 'storageone',
      title: 'Simple Storage - Part 1',
      description: 'Understand the basic storage mechanism with a simple storage contract. Learn about storage slots and read/write operations.',
      level: 'Beginner',
      path: '/storageone',
      icon: '💾',
      topics: ['Storage Variables', 'Read Operations', 'Write Operations']
    },
    {
      id: 'storagetwo',
      title: 'Simple Storage - Part 2',
      description: 'Deep dive into the Patricia Merkle Tree structure and how contract storage is organized behind the scenes.',
      level: 'Beginner',
      path: '/storagetwo',
      icon: '🌳',
      topics: ['Merkle Tree', 'Storage Layout', 'Syscalls']
    },
    {
      id: 'constructor',
      title: 'Constructor Mechanism',
      description: 'Learn how constructors initialize contract state during deployment with constructor arguments.',
      level: 'Beginner',
      path: '/constructor',
      icon: '🏗️',
      topics: ['Constructor', 'Initial State', 'Deployment Arguments']
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Learn StarkNet Smart Contracts
      </h1>
      
      <p className="text-lg text-gray-600 mb-8">
        Master Cairo smart contracts through interactive visualizations. Each lesson builds upon the previous one 
        to give you a complete understanding of how StarkNet works.
      </p>
      
      {/* Learning Path */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">📚 Recommended Learning Path</h2>
        <p className="text-gray-600 mb-4">
          Follow these lessons in order for the best learning experience:
        </p>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded">1. Deployment</span>
          <span>→</span>
          <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded">2. Simple Storage 1</span>
          <span>→</span>
          <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded">3. Simple Storage 2</span>
          <span>→</span>
          <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded">4. Constructor</span>
        </div>
      </div>
      
      {/* Lessons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {lessons.map((lesson, index) => (
          <Link 
            key={lesson.id}
            to={lesson.path}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <span className="text-2xl mr-3">{lesson.icon}</span>
                <div>
                  <div className="flex items-center mb-1">
                    <span className="text-sm font-medium text-gray-500 mr-2">Lesson {index + 1}</span>
                    <span className="inline-block bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded">
                      {lesson.level}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">
                    {lesson.title}
                  </h2>
                </div>
              </div>
            </div>
            
            <p className="text-gray-600 mb-4 leading-relaxed">
              {lesson.description}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {lesson.topics.map(topic => (
                <span key={topic} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                  {topic}
                </span>
              ))}
            </div>
            
            <div className="text-indigo-600 font-medium group-hover:text-indigo-700 transition-colors">
              Start Lesson →
            </div>
          </Link>
        ))}
      </div>
      
      {/* Call to Action */}
      <div className="bg-indigo-100 rounded-lg p-6 mt-8 text-center">
        <h2 className="text-xl font-bold text-indigo-800 mb-2">Ready to Get Started?</h2>
        <p className="text-indigo-700 mb-4">
          Begin your journey with the first lesson on smart contract deployment.
        </p>
        <Link 
          to="/deployment" 
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors inline-block"
        >
          Start with Deployment →
        </Link>
      </div>
    </div>
  );
}

export default LearnPage;