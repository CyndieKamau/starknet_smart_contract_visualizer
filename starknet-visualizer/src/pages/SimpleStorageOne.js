// src/pages/SimpleStorageOne.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CodeBlock from '../components/common/CodeBlock';

function SimpleStorageOne() {
  const [a, setA] = useState(5);
  const [b, setB] = useState(7);
  const [sum, setSum] = useState(0);
  const [hasExecuted, setHasExecuted] = useState(false);
  
  const handleAddNumbers = () => {
    setSum(a + b);
    setHasExecuted(true);
  };
  
  const handleReset = () => {
    setSum(0);
    setHasExecuted(false);
  };

  // HelloContract code
  const contractCode = `#[starknet::interface]
trait HelloContractInterface<TContractState> {
    fn add_two_numbers(ref self: TContractState, a:felt252, b:felt252);
    fn get_sum_of_two_numbers(self: @TContractState) -> felt252;
}

#[starknet::contract]
mod HelloContract {
    use starknet::storage::{StoragePointerReadAccess, StoragePointerWriteAccess};
    use super::HelloContractInterface;

    #[storage]
    pub struct Storage {
        pub sum: felt252
    }

    #[abi(embed_v0)]
    pub impl HelloImpl of HelloContractInterface<ContractState> {
        fn add_two_numbers(ref self: ContractState, a:felt252, b:felt252) {
            let sum_a_b = a + b;
            self.sum.write(sum_a_b);
        }

        fn get_sum_of_two_numbers(self: @ContractState) -> felt252 {
            self.sum.read()
        }
    }
}`;

  return (
    <div>
      <div className="flex items-center mb-6">
        <Link to="/learn" className="text-indigo-600 hover:text-indigo-800 mr-2">
          ← Back to Learn
        </Link>
        <h1 className="text-3xl font-bold text-gray-800 flex-grow">
          Simple Storage - Part 1: Storage Fundamentals
        </h1>
      </div>
      
      {/* Overview */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">📚 Understanding Storage in Starknet</h2>
        <p className="text-gray-600 mb-4">
          This lesson explores how storage works in Starknet smart contracts using a simple HelloContract 
          that adds two numbers and stores the sum. You'll learn about storage layout, read/write operations, 
          and the Patricia Merkle Tree structure.
        </p>
        
        <div className="bg-indigo-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-indigo-800 mb-2">🎯 Learning Objectives:</h3>
          <ul className="list-disc pl-6 text-indigo-700 space-y-1">
            <li>Understand how storage variables are mapped to storage slots</li>
            <li>Learn about storage read and write operations</li>
            <li>Visualize the Patricia Merkle Tree structure</li>
            <li>See how the sequencer processes deployed contracts</li>
          </ul>
        </div>
      </div>

      {/* Contract Code */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">📝 HelloContract Code</h2>
        <p className="text-gray-600 mb-4">
          This contract demonstrates basic storage operations by adding two numbers and storing the result.
        </p>
        
        <CodeBlock 
          code={contractCode}
          fileName="HelloContract.cairo"
          language="cairo"
        />
        
        <div className="mt-4 bg-blue-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">🔍 Key Components:</h3>
          <ul className="list-disc pl-6 text-blue-700 space-y-1">
            <li><strong>Storage variable:</strong> <code className="bg-blue-100 px-1 rounded">sum: felt252</code> - stores the result</li>
            <li><strong>Write operation:</strong> <code className="bg-blue-100 px-1 rounded">self.sum.write(sum_a_b)</code> - saves the sum</li>
            <li><strong>Read operation:</strong> <code className="bg-blue-100 px-1 rounded">self.sum.read()</code> - retrieves the sum</li>
          </ul>
        </div>
      </div>

      {/* Interactive Demo */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">🎮 Interactive Demo</h2>
        <p className="text-gray-600 mb-4">
          Try the contract operations and see how storage is updated in real-time.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Function Call</h3>
            <div className="space-y-4">
              <div className="flex space-x-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Value A</label>
                  <input 
                    type="number" 
                    value={a}
                    onChange={(e) => setA(parseInt(e.target.value) || 0)}
                    className="border border-gray-300 rounded-md px-3 py-2 w-20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Value B</label>
                  <input 
                    type="number"
                    value={b}
                    onChange={(e) => setB(parseInt(e.target.value) || 0)}
                    className="border border-gray-300 rounded-md px-3 py-2 w-20"
                  />
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button 
                  onClick={handleAddNumbers}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                >
                  Call add_two_numbers({a}, {b})
                </button>
                <button 
                  onClick={handleReset}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Storage State</h3>
            <div className="bg-white p-4 rounded border border-gray-200">
              <div className="flex items-center mb-2">
                <div className={`w-3 h-3 rounded-full mr-2 ${hasExecuted ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                <span className="font-semibold text-gray-800">Contract Storage:</span>
              </div>
              <code className="font-mono text-lg text-gray-700">
                sum = {hasExecuted ? sum : '0'}
              </code>
            </div>
          </div>
        </div>
      </div>

      {/* Storage Layout Table */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">🗂️ Storage Layout</h2>
        <p className="text-gray-600 mb-4">
          Starknet uses a hash function to determine storage addresses for each variable. Here's how our storage is organized:
        </p>
        
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg">
            <thead className="bg-indigo-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-indigo-800 uppercase tracking-wider border-b border-gray-200">
                  Variable Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-indigo-800 uppercase tracking-wider border-b border-gray-200">
                  Hash (Storage Address)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-indigo-800 uppercase tracking-wider border-b border-gray-200">
                  Value
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr className={hasExecuted ? 'bg-green-50' : ''}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">
                  sum
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-purple-600">
                  H("sum") = 0x0366a9b2b62c...3d2e1f
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-green-600">
                  {hasExecuted ? sum : '0'}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="mt-4 bg-yellow-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">🔑 Storage Address Calculation:</h3>
          <div className="text-yellow-700 space-y-2">
            <p><code className="bg-yellow-100 px-2 py-1 rounded">storage_address = sn_keccak("sum")</code></p>
            <p className="text-sm">The sn_keccak hash function is a Starknet variant of the Keccak-256 hash function, which creates a unique storage address for each storage variable.</p>
          </div>
        </div>
      </div>

      {/* Storage Access Operations */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">⚡ Storage Access Operations</h2>
        <p className="text-gray-600 mb-6">
          Every storage read and write operation in Cairo translates to specific system calls that interact with Starknet's state.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Write Operation */}
          <div className="bg-red-50 rounded-lg border border-red-200 p-6">
            <h3 className="text-lg font-semibold text-red-800 mb-4 flex items-center">
              <span className="mr-2">✍️</span>
              Write Operation
            </h3>
            
            <div className="space-y-4">
              <div className="bg-white p-3 rounded border border-gray-200">
                <div className="text-sm text-gray-600 mb-1">Cairo Code</div>
                <code className="text-sm font-mono text-gray-800">self.sum.write({a} + {b})</code>
              </div>
              
              <div className="flex justify-center">
                <svg height="30" width="30" className="text-red-500">
                  <polyline points="15,0 15,30" stroke="currentColor" strokeWidth="2"/>
                  <polyline points="10,20 15,30 20,20" stroke="currentColor" strokeWidth="2" fill="none"/>
                </svg>
              </div>
              
              <div className="bg-white p-3 rounded border border-gray-200">
                <div className="text-sm text-gray-600 mb-1">System Call</div>
                <code className="text-xs font-mono text-gray-800">
                  storage_write_syscall(<br/>
                  &nbsp;&nbsp;address=H("sum"),<br/>
                  &nbsp;&nbsp;value={a + b}<br/>
                  )
                </code>
              </div>
              
              <div className="flex justify-center">
                <svg height="30" width="30" className="text-red-500">
                  <polyline points="15,0 15,30" stroke="currentColor" strokeWidth="2"/>
                  <polyline points="10,20 15,30 20,20" stroke="currentColor" strokeWidth="2" fill="none"/>
                </svg>
              </div>
              
              <div className="bg-white p-3 rounded border border-gray-200">
                <div className="text-sm text-gray-600 mb-1">Result</div>
                <div className="text-sm text-gray-800">
                  Storage slot updated with value: <span className="font-bold text-red-600">{a + b}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Read Operation */}
          <div className="bg-blue-50 rounded-lg border border-blue-200 p-6">
            <h3 className="text-lg font-semibold text-blue-800 mb-4 flex items-center">
              <span className="mr-2">📖</span>
              Read Operation
            </h3>
            
            <div className="space-y-4">
              <div className="bg-white p-3 rounded border border-gray-200">
                <div className="text-sm text-gray-600 mb-1">Cairo Code</div>
                <code className="text-sm font-mono text-gray-800">self.sum.read()</code>
              </div>
              
              <div className="flex justify-center">
                <svg height="30" width="30" className="text-blue-500">
                  <polyline points="15,0 15,30" stroke="currentColor" strokeWidth="2"/>
                  <polyline points="10,20 15,30 20,20" stroke="currentColor" strokeWidth="2" fill="none"/>
                </svg>
              </div>
              
              <div className="bg-white p-3 rounded border border-gray-200">
                <div className="text-sm text-gray-600 mb-1">System Call</div>
                <code className="text-xs font-mono text-gray-800">
                  storage_read_syscall(<br/>
                  &nbsp;&nbsp;address=H("sum")<br/>
                  )
                </code>
              </div>
              
              <div className="flex justify-center">
                <svg height="30" width="30" className="text-blue-500">
                  <polyline points="15,0 15,30" stroke="currentColor" strokeWidth="2"/>
                  <polyline points="10,20 15,30 20,20" stroke="currentColor" strokeWidth="2" fill="none"/>
                </svg>
              </div>
              
              <div className="bg-white p-3 rounded border border-gray-200">
                <div className="text-sm text-gray-600 mb-1">Result</div>
                <div className="text-sm text-gray-800">
                  Returns value: <span className="font-bold text-blue-600">{hasExecuted ? sum : '0'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 bg-gray-100 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-800 mb-2">🔧 System Call Details:</h4>
          <ul className="list-disc pl-6 text-gray-700 space-y-1 text-sm">
            <li><strong>storage_write_syscall:</strong> Updates the contract's state in the Starknet storage tree</li>
            <li><strong>storage_read_syscall:</strong> Retrieves the current value from the storage tree</li>
            <li><strong>Address calculation:</strong> Each variable gets a deterministic storage address</li>
            <li><strong>State changes:</strong> Write operations create new state roots for the contract</li>
          </ul>
        </div>
      </div>

      {/* Patricia Merkle Tree */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">🌳 Contract Storage as a Patricia Merkle Tree</h2>
        <p className="text-gray-600 mb-6">
          Starknet stores contract data in a Patricia Merkle Tree structure for efficient verification and updates.
        </p>
        
        <div className="flex justify-center mb-6">
          <svg width="600" height="400" viewBox="0 0 600 400">
            {/* Contract Root */}
            <rect x="250" y="20" width="100" height="40" rx="5" fill="#4F46E5" />
            <text x="300" y="45" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Contract Root</text>
            
            {/* Lines from root */}
            <line x1="300" y1="60" x2="300" y2="100" stroke="#4F46E5" strokeWidth="2" />
            
            {/* Storage Tree */}
            <rect x="225" y="100" width="150" height="40" rx="5" fill="#818CF8" />
            <text x="300" y="125" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Storage Tree</text>
            
            {/* Lines to storage slots */}
            <line x1="300" y1="140" x2="300" y2="180" stroke="#818CF8" strokeWidth="2" />
            
            {/* Storage Address Node */}
            <rect x="200" y="180" width="200" height="40" rx="5" fill="#C7D2FE" stroke="#6366F1" strokeWidth="2" />
            <text x="300" y="205" textAnchor="middle" fill="#4338CA" fontSize="12" fontWeight="bold">
              Storage Address: H("sum")
            </text>
            
            {/* Lines to value */}
            <line x1="300" y1="220" x2="300" y2="260" stroke="#6366F1" strokeWidth="2" />
            
            {/* Storage Value */}
            <rect x="225" y="260" width="150" height="40" rx="5" 
                  fill={hasExecuted ? "#10B981" : "#D1D5DB"} 
                  stroke={hasExecuted ? "#059669" : "#9CA3AF"} strokeWidth="2" />
            <text x="300" y="285" textAnchor="middle" 
                  fill={hasExecuted ? "white" : "#6B7280"} fontSize="14" fontWeight="bold">
              {hasExecuted ? `Value: ${sum}` : "Value: 0"}
            </text>
            
            {/* Hash representation */}
            <rect x="50" y="320" width="200" height="60" rx="5" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1" />
            <text x="150" y="340" textAnchor="middle" fill="#92400E" fontSize="12" fontWeight="bold">Storage Address Hash</text>
            <text x="150" y="355" textAnchor="middle" fill="#92400E" fontSize="10">0x0366a9b2b62c...3d2e1f</text>
            <text x="150" y="370" textAnchor="middle" fill="#92400E" fontSize="10">(Computed from variable name)</text>
            
            {/* State Root */}
            <rect x="350" y="320" width="200" height="60" rx="5" fill="#E0E7FF" stroke="#6366F1" strokeWidth="1" />
            <text x="450" y="340" textAnchor="middle" fill="#4338CA" fontSize="12" fontWeight="bold">New State Root</text>
            <text x="450" y="355" textAnchor="middle" fill="#4338CA" fontSize="10">
              {hasExecuted ? "0x9fa3c2b1...7e8d4f" : "0x1234567...abcdef"}
            </text>
            <text x="450" y="370" textAnchor="middle" fill="#4338CA" fontSize="10">
              {hasExecuted ? "(Updated after write)" : "(Original state)"}
            </text>
            
            {/* Connecting lines */}
            <line x1="250" y1="280" x2="150" y2="320" stroke="#F59E0B" strokeWidth="2" strokeDasharray="5,5" />
            <line x1="350" y1="280" x2="450" y2="320" stroke="#6366F1" strokeWidth="2" strokeDasharray="5,5" />
          </svg>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-purple-800 mb-2">🔗 Tree Structure Benefits:</h3>
            <ul className="list-disc pl-6 text-purple-700 space-y-1 text-sm">
              <li>Efficient storage and retrieval of contract state</li>
              <li>Cryptographic proof of state integrity</li>
              <li>Incremental updates without full tree reconstruction</li>
              <li>Sparse tree structure saves space for unused slots</li>
            </ul>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-green-800 mb-2">⚡ How Updates Work:</h3>
            <ul className="list-disc pl-6 text-green-700 space-y-1 text-sm">
              <li>Each write operation creates a new state root</li>
              <li>Only the path from leaf to root needs updating</li>
              <li>Old state remains available for historical queries</li>
              <li>Merkle proofs enable efficient state verification</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Contract Deployment Flow */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">🚀 Contract Deployment Flow</h2>
        <p className="text-gray-600 mb-6">
          Here's what happens when you deploy the HelloContract to Starknet using sncast.
        </p>
        
        <div className="space-y-6">
          {/* Deploy Command */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">📝 Deploy Command</h3>
            <div className="bg-gray-900 rounded-lg overflow-hidden">
              <div className="bg-gray-800 px-4 py-2 text-gray-200 font-medium">
                Terminal Command
              </div>
              <div className="p-4">
                <code className="text-green-400 font-mono text-sm">
                sncast --profile sepolia --account hello-account declare --contract-name HelloContract<br/><br/>
                sncast --profile sepolia --account hello-account deploy --class-hash 0x006df12382e0809733b81dc1990711baf352abc56de7c1093a090b76cb426bd0<br/><br/>
                sncast --profile sepolia --account hello-account deploy --class-hash 0x006df12382e0809733b81dc1990711baf352abc56de7c1093a090b76cb426bd0  --constructor-calldata 5 10<br/><br/>
                sncast --profile sepolia --account hello-account call --contract-address 0x034785397fe1e60cc21d5debdf297eac980db15c7556d05271d4088796ed9411 --function get_sum<br/><br/>
                sncast --profile sepolia --account hello-account invoke --contract-address 0x034785397fe1e60cc21d5debdf297eac980db15c7556d05271d4088796ed9411 --function set_values --calldata 20 30<br/>

                </code>
              </div>
            </div>
          </div>
          
          {/* Sequencer Processing */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-800 mb-4">🔄 Starknet Sequencer Processing</h3>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">1</div>
                <div className="flex-1">
                  <div className="font-medium text-blue-800">Transaction Validation</div>
                  <div className="text-sm text-blue-600">Sequencer validates deploy transaction signature and parameters</div>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">2</div>
                <div className="flex-1">
                  <div className="font-medium text-blue-800">Contract Instantiation</div>
                  <div className="text-sm text-blue-600">Creates new contract instance with unique address and empty storage</div>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">3</div>
                <div className="flex-1">
                  <div className="font-medium text-blue-800">Storage Tree Creation</div>
                  <div className="text-sm text-blue-600">Initializes Patricia Merkle Tree for contract storage</div>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">4</div>
                <div className="flex-1">
                  <div className="font-medium text-blue-800">State Root Update</div>
                  <div className="text-sm text-blue-600">Updates global Starknet state with new contract</div>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">5</div>
                <div className="flex-1">
                  <div className="font-medium text-blue-800">Block Inclusion</div>
                  <div className="text-sm text-blue-600">Includes deployment transaction in next block</div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-blue-100 rounded">
              <div className="text-sm text-blue-800">
                <strong>Result:</strong> Contract is now live at address 
                <code className="ml-1 bg-blue-200 px-1 rounded">0x07b3e42fb1...</code> 
                with storage initialized to default values (sum = 0).
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Next Step */}
      <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-bold text-gray-800 mb-2">🎯 Ready for Part 2?</h2>
            <p className="text-gray-600">
              Continue learning with a deeper dive into the Patricia Merkle Tree and advanced storage concepts.
            </p>
          </div>
          <Link 
            to="/storagetwo" 
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Next: Simple Storage Part 2 →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SimpleStorageOne;