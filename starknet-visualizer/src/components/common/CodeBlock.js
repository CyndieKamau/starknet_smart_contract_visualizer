// src/components/common/CodeBlock.js
import React from 'react';

function CodeBlock({ code, language = 'cairo', fileName = 'Code.cairo' }) {
  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden">
      <div className="bg-gray-800 px-4 py-2 text-gray-200 font-medium flex justify-between items-center">
        <span>{fileName}</span>
        <span className="text-xs text-gray-400 bg-gray-700 px-2 py-1 rounded">{language}</span>
      </div>
      <pre className="p-4 text-green-400 text-sm font-mono overflow-x-auto">
        {code}
      </pre>
    </div>
  );
}

export default CodeBlock;