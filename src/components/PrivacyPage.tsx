'use client';

import React from 'react';
import Link from 'next/link';

const SECTION_HEADING = 'text-2xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2';
const BODY = 'text-gray-700 mb-4';
const LIST = 'text-gray-700 list-disc list-inside space-y-2 mb-4';

const PrivacyPage: React.FC = () => {
  return (
    <div>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="prose prose-lg max-w-none">
          <h1 className="text-4xl font-light text-gray-900 mb-4 font-serif border-b-2 border-gray-200 pb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-600 italic mb-8">Last updated: October 2026</p>

          <div className="bg-gray-50 border border-gray-200 p-6 mb-8 rounded-sm">
            <p className="text-gray-800">
              Muscadine is a personal, non-commercial project. There are no accounts and no sign-ups, and we do not
              sell, rent or share personal information for marketing. We never ask for, and never see, your private
              keys or seed phrases.
            </p>
          </div>

          <section className="mb-8">
            <h2 className={SECTION_HEADING}>1. What we see</h2>
            <ul className={LIST}>
              <li><strong>No analytics:</strong> the sites use no analytics, tracking pixels or advertising cookies.</li>
              <li><strong>Server logs:</strong> our hosting provider (Vercel) keeps standard request logs, such as IP address, browser and time, for a short period.</li>
              <li><strong>Wallet address:</strong> when you connect a wallet to app.muscadine.xyz, the app reads that public address&apos;s balances and vault positions. We do not tie it to your name or store it in a database.</li>
              <li><strong>Email:</strong> if you email us, we keep your message and address to reply.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className={SECTION_HEADING}>2. Third parties the app talks to</h2>
            <p className={BODY}>
              To show balances and send transactions, the app calls outside services, which can see your IP address
              and the wallet address being looked up, under their own privacy policies:
            </p>
            <ul className={LIST}>
              <li>Your wallet and Reown / WalletConnect, which connect it</li>
              <li>Alchemy and other Base RPC providers, for on-chain reads and sending transactions</li>
              <li>Morpho&apos;s API, for vault and position data</li>
              <li>CoinGecko, for token prices</li>
            </ul>
            <p className={BODY}>
              Blockchains are public. Anything you do on-chain, including vault deposits and withdrawals, is visible
              to everyone, permanently.
            </p>
          </section>

          <section className="mb-8">
            <h2 className={SECTION_HEADING}>3. Stored in your browser</h2>
            <p className={BODY}>
              The app keeps a few settings on your device only: your theme, cached token prices, and that you
              accepted the terms. You can clear them at any time in your browser settings.
            </p>
          </section>

          <section className="mb-8">
            <h2 className={SECTION_HEADING}>4. Bitcoin node</h2>
            <p className={BODY}>
              If you point a wallet at our Bitcoin node, the node sees the addresses and transactions your wallet asks
              about. Over Tor it does not see your IP address. For full privacy, run your own node.
            </p>
          </section>

          <section className="mb-8">
            <h2 className={SECTION_HEADING}>5. When we would share information</h2>
            <p className={BODY}>
              Only if the law requires it, or to stop abuse of the sites.
            </p>
          </section>

          <section className="mb-8">
            <h2 className={SECTION_HEADING}>6. Children</h2>
            <p className={BODY}>The sites are not meant for anyone under 18.</p>
          </section>

          <section className="mb-8">
            <h2 className={SECTION_HEADING}>7. Changes and contact</h2>
            <p className={BODY}>
              We may update this policy and will change the date above when we do. To ask about or delete anything
              you sent us, email{' '}
              <a href="mailto:muscadinelabs@gmail.com" className="text-blue-600 hover:text-blue-700 underline">
                muscadinelabs@gmail.com
              </a>
              . See also the <Link href="/terms" className="text-blue-600 underline">Terms of Use</Link>.
            </p>
          </section>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <Link
              href="/"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Muscadine
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
