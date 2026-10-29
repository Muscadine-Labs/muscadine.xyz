'use client';

const AboutPage = () => {
  return (
    <>
      <div>
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-light text-gray-900 mb-6 font-serif">
            About Muscadine
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-4xl mx-auto">
            Muscadine is a personal, non-commercial project about Bitcoin self-custody and DeFi. It shares free guides and open-source tools for running a Bitcoin node, holding your own keys and understanding on-chain protocols. It is not a business and offers no services or advice.
          </p>
        </div>

        {/* Mission Section */}
        <div className="py-16">
          <div className="max-w-3xl mx-auto">
            <div>
              <h2 className="text-4xl font-light text-gray-900 mb-6 font-serif">
                Why this exists
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Muscadine started from a simple belief: you should be able to hold and use your own money without asking permission. Self-custody, open-source software and transparent on-chain systems make that possible.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                The guides here are the notes and tools we use ourselves, published so others can learn from them. The vaults on app.muscadine.xyz are set up for our own and our family's funds.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Everything here is information only. Do your own research and get your own professional advice before any financial decision.
              </p>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="py-16 bg-gray-50 rounded-lg my-16">
          <div className="px-8">
            <h2 className="text-4xl font-light text-gray-900 mb-12 text-center font-serif">
              Principles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-light text-gray-900 mb-3 font-serif">Security First</h3>
                <p className="text-gray-600">Your keys, your coins. Every guide starts from keeping control of your own keys.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl font-light text-gray-900 mb-3 font-serif">Education Focus</h3>
                <p className="text-gray-600">Understand the technology and its risks before you rely on it.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-light text-gray-900 mb-3 font-serif">Transparency</h3>
                <p className="text-gray-600">The code is open source and the vaults are on-chain, so anyone can check how they work.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default AboutPage;
