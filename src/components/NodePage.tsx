
'use client';

import Link from 'next/link';

export default function NodePage() {

  // Copy to clipboard function
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // You could add a toast notification here if desired
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }
  };

  return (
    <div>
      {/* Back Arrow */}
      <div className="mb-6">
        <Link 
          href="/projects" 
          className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Projects
        </Link>
      </div>
      
      <div className="text-center mb-8">
        <h1 className="text-4xl font-light text-gray-900 mb-4 font-serif">Bitcoin Node</h1>
        <p className="text-xl text-gray-600">
          Connect your wallet to our self-hosted Bitcoin node
        </p>
      </div>
      
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Node Information */}
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h2 className="text-2xl font-light text-gray-900 mb-4 font-serif">About This Node</h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            This is the Bitcoin node we run for ourselves, left open for others to use for free, with no guarantee it stays up. By connecting to it, you can:
          </p>
          <ul className="text-gray-700 space-y-2 ml-4">
            <li className="flex items-start">
              <span className="text-gray-400 mr-2">•</span>
              <span>Send and receive Bitcoin transactions with enhanced privacy</span>
            </li>
            <li className="flex items-start">
              <span className="text-gray-400 mr-2">•</span>
              <span>Validate your own transactions without trusting third parties</span>
            </li>
            <li className="flex items-start">
              <span className="text-gray-400 mr-2">•</span>
              <span>Reach the Bitcoin network over Tor without running a node yourself</span>
            </li>
            <li className="flex items-start">
              <span className="text-gray-400 mr-2">•</span>
              <span>Reduce reliance on centralized Bitcoin services</span>
            </li>
          </ul>
        </div>

        {/* Connection Details */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Connection Details</h3>
          <p className="text-gray-600 mb-6">
            Use these details to connect your Bitcoin wallet or Electrum client to our node:
          </p>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600 mb-2 font-medium">Electrum Server Hostname:</p>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <code className="bg-gray-100 px-3 py-2 rounded-sm text-sm min-w-0 break-all font-mono">gq6fwuul5vdayoy5wutvavelt5bglezmohypuxdb7bfk2tayitpllvid.onion</code>
                <button 
                  className="bg-gray-900 text-white px-3 py-2 rounded-lg text-sm hover:bg-gray-800 transition-colors shrink-0 touch-manipulation" 
                  onClick={() => copyToClipboard('gq6fwuul5vdayoy5wutvavelt5bglezmohypuxdb7bfk2tayitpllvid.onion')}
                >
                  Copy
                </button>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-2 font-medium">Port:</p>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <span className="bg-gray-100 px-3 py-2 rounded-sm text-sm font-mono">50002</span>
                <button 
                  className="bg-gray-900 text-white px-3 py-2 rounded-lg text-sm hover:bg-gray-800 transition-colors shrink-0 touch-manipulation" 
                  onClick={() => copyToClipboard('50002')}
                >
                  Copy
                </button>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-2 font-medium">Protocol:</p>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <span className="bg-gray-100 px-3 py-2 rounded-sm text-sm font-mono">SSL</span>
                <button 
                  className="bg-gray-900 text-white px-3 py-2 rounded-lg text-sm hover:bg-gray-800 transition-colors shrink-0 touch-manipulation" 
                  onClick={() => copyToClipboard('SSL')}
                >
                  Copy
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* How to Connect */}
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h3 className="text-xl font-light text-gray-900 mb-4 font-serif">How to Connect</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">For Sparrow Wallet:</h4>
              <ol className="text-gray-700 space-y-1 ml-4">
                <li>1. Open Sparrow wallet</li>
                <li>2. Go to Settings → Server</li>
                <li>3. Enter the hostname and port above</li>
                <li>4. Click Test connection then close.</li>
              </ol>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
