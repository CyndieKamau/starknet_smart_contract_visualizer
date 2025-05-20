// src/pages/DeploymentPage.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CodeBlock from '../components/common/CodeBlock';

function DeploymentPage() {
  const [currentStep, setCurrentStep] = useState(0);
  
  // Simple storage contract code
  const contractCode = `#[starknet::interface]
trait ISimpleStorage<TContractState> {
    fn set(ref self: TContractState, x: u128);
    fn get(self: @TContractState) -> u128;
}

#[starknet::contract]
mod SimpleStorage {
    use starknet::storage::{StoragePointerReadAccess, StoragePointerWriteAccess};

    #[storage]
    struct Storage {
        stored_data: u128,
    }

    #[abi(embed_v0)]
    impl SimpleStorage of super::ISimpleStorage<ContractState> {
        fn set(ref self: ContractState, x: u128) {
            self.stored_data.write(x);
        }

        fn get(self: @ContractState) -> u128 {
            self.stored_data.read()
        }
    }
}`;

  // Sierra file snippet
  const sierraCode = `{"sierra_program":["0x1","0x7","0x0","0x2","0xb","0x4","0xc0","0x40","0x19","0x52616e6765436865636b","0x800000000000000100000000000000000000000000000000","0x456e756d","0x800000000000000700000000000000000000000000000001","0x0","0x1e7cc030b6a62e51219c7055ff773a8dff8fb71637d893064207dc67ba74304","0x436f6e7374","0x800000000000000000000000000000000000000000000002","0x1","0x16","0x2","0x4661696c656420746f20646573657269616c697a6520706172616d202331","0x4661696c656420746f20646573657269616c697a6520706172616d202332","0x4661696c656420746f20646573657269616c697a6520706172616d202333","0x4f7574206f6620676173","0x496e70757420746f6f206c6f6e6720666f7220617267756d656e7473","0x53746f726167654261736541646472657373","0x800000000000000700000000000000000000000000000000","0x537472756374","0x800000000000000700000000000000000000000000000002","0x145cc613954179acf89d43c94ed0e091828cbddcca83f5b408785785036d36d","0x7","0x800000000000000f00000000000000000000000000000001"]`;

  // Account list output
  const accountListOutput = `- hello-account:
  network: alpha-sepolia
  public key: 0x424c67d5142fee6422227310ff594d256d3cf81f359e8556c7259e8f695aa27
  address: 0x6e9660bcf2cda3cdb894e1456e8dd8a7485b7f593814ced6fcd4d955861fba9
  salt: 0x53963c497d1ff560
  class hash: 0xe2eb8f5672af4e6a4e8a8f1b44989685e668489b0a25437733756c5a34a1d6
  deployed: false
  legacy: false
  type: OpenZeppelin

- my_first_account:
  network: alpha-sepolia
  public key: 0x7a9cdb78b0092840f55e248fa182e45ca4e60ad6689fc9a8de2a47e5166184a
  address: 0x1a28ae8aa74cfeb97a02475a8d127c8c017b4741b67619b24aea5a5b2efcc32
  class hash: 0x61dac032f228abef9c6626f995015233097ae253a7f72d68552db02f2971b8f
  deployed: true
  legacy: false
  type: OpenZeppelin`;

  const steps = [
    {
      title: 'Cairo Smart Contract',
      description: 'This is our simple storage contract written in Cairo. It allows storing and retrieving a u128 value.',
      icon: '📝'
    },
    {
      title: 'Build with Scarb',
      description: 'Running `scarb build` compiles the Cairo code into Sierra (Safe Intermediate Representation).',
      icon: '🔨'
    },
    {
      title: 'Test Your Contract',
      description: 'Use `snforge test` to run your tests and ensure your contract works correctly.',
      icon: '🧪'
    },
    {
      title: 'Create Account',
      description: 'Create a new account using sncast to deploy your contracts.',
      icon: '👤'
    },
    {
      title: 'Verify Account',
      description: 'List your accounts to confirm the account was created successfully.',
      icon: '✅'
    },
    {
      title: 'Fund Account',
      description: 'Add test tokens to your account address using the StarkNet faucet.',
      icon: '💰'
    },
    {
      title: 'Deploy Account',
      description: 'Deploy your account contract to the network before you can use it.',
      icon: '🚀'
    }
  ];

  return (
    <div>
      <div className="flex items-center mb-6">
        <Link to="/learn" className="text-indigo-600 hover:text-indigo-800 mr-2">
          ← Back to Learn
        </Link>
        <h1 className="text-3xl font-bold text-gray-800 flex-grow">
          Smart Contract Deployment Process
        </h1>
      </div>
      
      {/* Overview */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">📚 What You'll Learn</h2>
        <p className="text-gray-600 mb-4">
          This lesson covers the complete process of deploying a Cairo smart contract to StarkNet - 
          from writing the code to having it live on the blockchain. You'll learn about compilation, 
          testing, account creation, and the deployment process.
        </p>
        
        <div className="bg-indigo-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-indigo-800 mb-2">🎯 Learning Objectives:</h3>
          <ul className="list-disc pl-6 text-indigo-700 space-y-1">
            <li>Understand the Cairo to Sierra compilation process</li>
            <li>Learn how to test your contracts with snforge</li>
            <li>Master the account creation and deployment workflow</li>
            <li>See how contracts are processed before reaching the sequencer</li>
          </ul>
        </div>
      </div>

      {/* Step Navigation */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">📋 Deployment Steps</h2>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {steps.map((step, index) => (
            <button
              key={index}
              className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                index === currentStep
                  ? 'bg-indigo-600 text-white'
                  : index < currentStep
                  ? 'bg-green-100 text-green-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              onClick={() => setCurrentStep(index)}
            >
              <span className="mr-2">{step.icon}</span>
              <span className="hidden sm:inline">Step {index + 1}</span>
            </button>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
          <div 
            className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          ></div>
        </div>

        {/* Current Step Content */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="flex items-center mb-4">
            <span className="text-2xl mr-3">{steps[currentStep].icon}</span>
            <h3 className="text-xl font-semibold text-gray-800">
              Step {currentStep + 1}: {steps[currentStep].title}
            </h3>
          </div>
          
          <p className="text-gray-600 mb-6">{steps[currentStep].description}</p>

          {/* Step-specific content */}
          {currentStep === 0 && (
            <div>
              <CodeBlock 
                code={contractCode}
                fileName="SimpleStorage.cairo"
                language="cairo"
              />
              <div className="mt-4 bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">📖 Contract Breakdown:</h4>
                <ul className="list-disc pl-6 text-blue-700 space-y-1 text-sm">
                  <li><code className="bg-blue-100 px-1 rounded">#[starknet::interface]</code> - Defines the contract's public interface</li>
                  <li><code className="bg-blue-100 px-1 rounded">#[starknet::contract]</code> - Marks the module as a StarkNet contract</li>
                  <li><code className="bg-blue-100 px-1 rounded">#[storage]</code> - Defines persistent storage variables</li>
                  <li><code className="bg-blue-100 px-1 rounded">#[abi(embed_v0)]</code> - Implements the interface for external calls</li>
                </ul>
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div>
              <div className="bg-gray-900 rounded-lg overflow-hidden mb-4">
                <div className="bg-gray-800 px-4 py-2 text-gray-200 font-medium">
                  Terminal Command
                </div>
                <div className="p-4">
                  <code className="text-green-400 font-mono">$ scarb build</code>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex items-center mb-2">
                  <svg className="w-5 h-5 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-700 font-medium">Generated Sierra File (snippet):</span>
                </div>
                <CodeBlock 
                  code={sierraCode}
                  fileName="SimpleStorage.sierra.json"
                  language="json"
                />
              </div>
              
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-semibold text-yellow-800 mb-2">🔍 What Happens During Build:</h4>
                <ul className="list-disc pl-6 text-yellow-700 space-y-1 text-sm">
                  <li>Cairo code is compiled to Sierra (Safe Intermediate Representation)</li>
                  <li>Sierra provides safety guarantees and prevents infinite loops</li>
                  <li>The output includes both Sierra and CASM (Cairo Assembly) files</li>
                  <li>A contract class hash is generated for deployment</li>
                </ul>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <div className="bg-gray-900 rounded-lg overflow-hidden mb-4">
                <div className="bg-gray-800 px-4 py-2 text-gray-200 font-medium">
                  Terminal Command
                </div>
                <div className="p-4">
                  <code className="text-green-400 font-mono">$ snforge test</code>
                </div>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">🧪 Testing Your Contract:</h4>
                <ul className="list-disc pl-6 text-green-700 space-y-1 text-sm">
                  <li>Write tests to verify your contract functions work correctly</li>
                  <li>Test both successful operations and edge cases</li>
                  <li>Ensure your contract behaves as expected before deployment</li>
                  <li>snforge provides a comprehensive testing framework for Cairo</li>
                </ul>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div>
              <div className="bg-gray-900 rounded-lg overflow-hidden mb-4">
                <div className="bg-gray-800 px-4 py-2 text-gray-200 font-medium">
                  Terminal Command
                </div>
                <div className="p-4">
                  <code className="text-green-400 font-mono">$ sncast --profile sepolia account create --name hello-account</code>
                </div>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-800 mb-2">👤 Account Creation:</h4>
                <ul className="list-disc pl-6 text-purple-700 space-y-1 text-sm">
                  <li>Creates a new account configuration locally</li>
                  <li>Generates a public/private key pair</li>
                  <li>Computes the account address deterministically</li>
                  <li>Account is not yet deployed to the network</li>
                </ul>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div>
              <div className="bg-gray-900 rounded-lg overflow-hidden mb-4">
                <div className="bg-gray-800 px-4 py-2 text-gray-200 font-medium">
                  Terminal Command
                </div>
                <div className="p-4">
                  <code className="text-green-400 font-mono">$ sncast --profile sepolia account list</code>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex items-center mb-2">
                  <svg className="w-5 h-5 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-700 font-medium">Account List Output:</span>
                </div>
                <CodeBlock 
                  code={accountListOutput}
                  fileName="Account List"
                  language="yaml"
                />
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">🔍 Account Information:</h4>
                <ul className="list-disc pl-6 text-blue-700 space-y-1 text-sm">
                  <li><strong>deployed: false</strong> - Account contract not yet on-chain</li>
                  <li><strong>address</strong> - Where the account will be deployed</li>
                  <li><strong>public key</strong> - Used for signature verification</li>
                  <li><strong>class hash</strong> - OpenZeppelin account contract template</li>
                </ul>
              </div>
            </div>
          )}

          {currentStep === 5 && (
            <div>
              <div className="text-center mb-6">
                <div className="bg-indigo-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🚰</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Get Test Tokens</h3>
                <p className="text-gray-600 mb-4">
                  Visit the Starknet faucet to add test tokens to your account
                </p>
                
                <a 
                  href="https://faucet.starknet.io/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors inline-block"
                >
                  Open StarkNet Faucet →
                </a>
              </div>
              
              <div className="bg-orange-50 p-4 rounded-lg">
                <h4 className="font-semibold text-orange-800 mb-2">💡 Why You Need Test Tokens:</h4>
                <ul className="list-disc pl-6 text-orange-700 space-y-1 text-sm">
                  <li>Account deployment requires gas fees</li>
                  <li>Contract declaration and deployment cost ETH</li>
                  <li>Test tokens are free on testnets like Sepolia</li>
                  <li>You'll need tokens in your account address before deployment</li>
                </ul>
              </div>
            </div>
          )}

          {currentStep === 6 && (
            <div>
              <div className="bg-gray-900 rounded-lg overflow-hidden mb-4">
                <div className="bg-gray-800 px-4 py-2 text-gray-200 font-medium">
                  Terminal Command
                </div>
                <div className="p-4">
                  <code className="text-green-400 font-mono">$ sncast --profile sepolia account deploy --name hello-account</code>
                </div>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">🚀 Account Deployment:</h4>
                <ul className="list-disc pl-6 text-green-700 space-y-1 text-sm">
                  <li>Deploys your account contract to StarkNet</li>
                  <li>Account becomes active and can send transactions</li>
                  <li>Returns a transaction hash for the deployment</li>
                  <li>Your account is now ready to deploy smart contracts!</li>
                </ul>
              </div>
              
              <div className="mt-4 p-4 bg-indigo-50 rounded-lg">
                <h4 className="font-semibold text-indigo-800 mb-2">🎉 Next Steps:</h4>
                <p className="text-indigo-700 text-sm">
                  With your account deployed, you're ready to declare and deploy smart contracts. 
                  The next lessons will show you how to work with storage and contract state.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          <button
            className={`px-4 py-2 rounded-lg ${
              currentStep > 0
                ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
            onClick={() => currentStep > 0 && setCurrentStep(currentStep - 1)}
            disabled={currentStep === 0}
          >
            ← Previous Step
          </button>
          
          <button
            className={`px-4 py-2 rounded-lg ${
              currentStep < steps.length - 1
                ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
            onClick={() => currentStep < steps.length - 1 && setCurrentStep(currentStep + 1)}
            disabled={currentStep === steps.length - 1}
          >
            Next Step →
          </button>
        </div>
      </div>
      
      {/* Summary and Next Lesson */}
      <div className="bg-gradient-to-r from-indigo-100 to-purple-100 rounded-lg p-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-bold text-gray-800 mb-2">🎯 Ready for the Next Step?</h2>
            <p className="text-gray-600">
              Now that you understand deployment, let's explore how storage works in Starknet contracts.
            </p>
          </div>
          <Link 
            to="/simple-storage-one" 
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Next: Simple Storage Part 1 →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DeploymentPage;