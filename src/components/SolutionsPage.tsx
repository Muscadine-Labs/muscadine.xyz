import Link from 'next/link';

const SolutionsPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Back Arrow */}
        <div className="mb-6">
          <Link 
            href="/" 
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
        </div>
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-light text-gray-900 mb-4 font-serif">
            Muscadine Solutions
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed max-w-4xl mx-auto">
            Tools and education for holding and using your own digital assets, from Bitcoin self-custody to DeFi. You keep your keys and make your own decisions.
          </p>
        </div>

        {/* Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Vaults */}
          <div className="bg-white rounded-lg border-2 border-gray-200 p-8 hover:border-gray-300 transition-colors">
            <div className="space-y-6">
              <h3 className="text-2xl font-light text-gray-900 font-serif">
                Vaults
              </h3>
              <p className="text-base text-gray-600 leading-relaxed">
                Non-custodial Morpho vaults on Base, set up for our own funds.
              </p>
              <Link
                href="/app"
                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                See the vaults
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Bitcoin Node */}
          <div className="bg-white rounded-lg border-2 border-gray-200 p-8 hover:border-gray-300 transition-colors">
            <div className="space-y-6">
              <h3 className="text-2xl font-light text-gray-900 font-serif">
                Bitcoin Node
              </h3>
              <p className="text-base text-gray-600 leading-relaxed">
                Point your Bitcoin wallet at our node over Tor, so balances and transactions do not go through a public server.
              </p>
              <Link 
                href="/node"
                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                Connect to our Bitcoin Node
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Self Custody */}
          <div className="bg-white rounded-lg border-2 border-gray-200 p-8 hover:border-gray-300 transition-colors">
            <div className="space-y-6">
              <h3 className="text-2xl font-light text-gray-900 font-serif">
                Self Custody
              </h3>
              <p className="text-base text-gray-600 leading-relaxed">
                How to hold your own keys: kinds of wallets, seed backups and everyday habits, for Bitcoin and DeFi.
              </p>
              <Link 
                href="/self-custody"
                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                Read the guide
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Other Solutions */}
          <div className="bg-white rounded-lg border-2 border-gray-200 p-8 hover:border-gray-300 transition-colors">
            <div className="space-y-6">
              <h3 className="text-2xl font-light text-gray-900 font-serif">
                Other Solutions
              </h3>
              <p className="text-base text-gray-600 leading-relaxed">
                Open-source DeFi tools and experiments, built in the open.
              </p>
              <p className="text-gray-500 italic text-sm">
                Many more things in development
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default SolutionsPage;
