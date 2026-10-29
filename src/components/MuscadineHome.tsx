'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';

const IsometricNodes = dynamic(() => import('./IsometricNodes'), { ssr: false });
const StarShape = dynamic(() => import('./3DShapes/StarShape'), { ssr: false });
const TorusShape = dynamic(() => import('./3DShapes/TorusShape'), { ssr: false });
const PyramidShape = dynamic(() => import('./3DShapes/PyramidShape'), { ssr: false });
const PolyhedronShape = dynamic(() => import('./3DShapes/PolyhedronShape'), { ssr: false });

const MuscadineHome = () => {
  return (
    <>
      {/* Hero Section - Full Width Background */}
      <div className="relative left-1/2 right-1/2 -mx-[50vw] w-screen mt-20 mb-20 overflow-x-clip">
        {/* Nested rectangles effect - hidden on mobile; frames step outward from main content on desktop */}
        <div className="absolute inset-0 hidden lg:flex items-center justify-center z-10 pointer-events-none">
          {/* Rectangle 4 - outermost frame (wider than main content) */}
          <div className="w-full max-w-[1240px] h-[780px] border-2 border-black rounded-lg" />
        </div>
        <div className="absolute inset-0 hidden lg:flex items-center justify-center z-20 pointer-events-none">
          {/* Rectangle 3 */}
          <div className="w-full max-w-[1196px] h-[740px] border-2 border-black rounded-lg" />
        </div>
        <div className="absolute inset-0 hidden lg:flex items-center justify-center z-30 pointer-events-none">
          {/* Rectangle 2 - innermost frame, fits around main content (1152px) */}
          <div className="w-full max-w-[1168px] h-[700px] border-2 border-black rounded-lg" />
        </div>
        
        {/* Main hero container - max-w-6xl = 1152px, fits inside innermost frame */}
        <div className="relative py-8 px-4 sm:py-12 sm:px-8 lg:py-20 lg:px-20 mx-auto max-w-6xl border-2 border-black rounded-lg z-40">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <div className="space-y-6 text-center lg:text-left">
            <h1 className="text-4xl lg:text-5xl font-light text-gray-900 leading-tight font-serif">
              Take the First Step. <span className=" underline">Confidently.</span>
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Education and open-source tools for Bitcoin self-custody and DeFi. Learn to hold your own keys, run your own node, and understand the risks before you use on-chain protocols.
            </p>
          </div>

          {/* Right side - 3D Animation */}
          <div className="flex items-center justify-center">
            <div className="w-full min-h-[300px] h-[300px] sm:h-[400px] lg:min-w-[400px] lg:h-[500px]">
              <IsometricNodes />
            </div>
          </div>
        </div>
        </div>
      </div>

      {/* Solutions Section - Full Width Background with Gradient - Break out of container */}
      <div className="relative left-1/2 right-1/2 -mx-[50vw] w-screen overflow-x-hidden bg-linear-to-b from-gray-50 via-blue-50 to-gray-50 py-12 md:py-20 my-12 md:my-16">
        {/* Our Solutions Section */}
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-gray-900 mb-6 font-serif">
              Our Solutions
            </h2>
          </div>

          {/* Solutions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Service 1 - Vaults (Top Left) */}
            <div className="bg-white rounded-lg border-2 border-gray-200 p-6 sm:p-8 hover:border-gray-300 transition-colors">
              <div className="space-y-6">
                {/* 3D Shape Container */}
                <div className="w-full h-48 bg-gray-50 rounded-lg border border-gray-200">
                  <PyramidShape path="/app" />
                </div>
                
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

            {/* Service 2 - Bitcoin Node (Top Right) */}
            <div className="bg-white rounded-lg border-2 border-gray-200 p-6 sm:p-8 hover:border-gray-300 transition-colors">
              <div className="space-y-6">
                {/* 3D Shape Container */}
                <div className="w-full h-48 bg-gray-50 rounded-lg border border-gray-200">
                  <TorusShape path="/node" />
                </div>
                
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

            {/* Service 3 - Self Custody (Bottom Left) */}
            <div className="bg-white rounded-lg border-2 border-gray-200 p-6 sm:p-8 hover:border-gray-300 transition-colors">
              <div className="space-y-6">
                {/* 3D Shape Container */}
                <div className="w-full h-48 bg-gray-50 rounded-lg border border-gray-200">
                  <StarShape path="/self-custody" />
                </div>
                
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

            {/* Service 4 - Other Solutions (Bottom Right) */}
            <div className="bg-white rounded-lg border-2 border-gray-200 p-6 sm:p-8 hover:border-gray-300 transition-colors">
              <div className="space-y-6">
                {/* 3D Shape Container */}
                <div className="w-full h-48 bg-gray-50 rounded-lg border border-gray-200">
                  <PolyhedronShape path="/solutions" />
                </div>

                <h3 className="text-2xl font-light text-gray-900 font-serif">
                  Other Solutions
                </h3>
                <p className="text-base text-gray-600 leading-relaxed">
                  Open-source DeFi tools and experiments, built in the open. Many more things in development.
                </p>
                <Link
                  href="/solutions"
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                  See all solutions
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default MuscadineHome;
