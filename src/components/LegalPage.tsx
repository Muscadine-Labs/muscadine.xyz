'use client';

import React from 'react';
import Link from 'next/link';

const SECTION_HEADING = 'text-2xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2';
const BODY = 'text-gray-700 mb-4';
const LIST = 'text-gray-700 list-disc list-inside space-y-2 mb-4';

const LegalPage: React.FC = () => {
  return (
    <div>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="prose prose-lg max-w-none">
          <h1 className="text-4xl font-light text-gray-900 mb-4 font-serif border-b-2 border-gray-200 pb-4">
            Legal Disclaimer
          </h1>
          <p className="text-gray-600 italic mb-8">Last updated: October 2026</p>

          <div className="bg-gray-50 border border-gray-200 p-6 mb-8 rounded-sm">
            <p className="text-gray-800 font-semibold mb-2">
              Nothing on this website is an offer to sell or a solicitation to buy any product, service, or
              investment.
            </p>
            <p className="text-gray-700">
              Past performance is not a reliable indicator of future results. Yields are variable and not guaranteed.
              Muscadine does not provide investment advice; seek your own professional advice before making any
              decision.
            </p>
          </div>

          <section className="mb-8">
            <h2 className={SECTION_HEADING}>1. A personal project</h2>
            <p className={BODY}>
              Muscadine is a personal, non-commercial project run by an individual. It is not a company and has no
              clients, customers or employees. We do not sell anything, charge fees to anyone, take payment, or manage
              money for other people. The vaults hold our own and our family&apos;s funds and are open to approved
              wallets only.
            </p>
          </section>

          <section className="mb-8">
            <h2 className={SECTION_HEADING}>2. Not advice</h2>
            <p className={BODY}>
              Everything on muscadine.xyz and app.muscadine.xyz is general information, shared for free. None of it is
              financial, investment, trading, tax or legal advice, a recommendation, or a statement that anything is
              suitable for you. We are not a bank, broker, investment adviser, fund or custodian, and using the sites
              creates no professional or advisory relationship.
            </p>
          </section>

          <section className="mb-8">
            <h2 className={SECTION_HEADING}>3. No custody</h2>
            <p className={BODY}>
              We never hold your keys or your assets. Vault deposits and withdrawals are transactions you sign
              yourself with smart contracts on Base. The vault, market and Morpho contracts are third-party,
              open-source code that we do not control.
            </p>
          </section>

          <section className="mb-8">
            <h2 className={SECTION_HEADING}>4. Risk</h2>
            <p className={BODY}>Using crypto, DeFi or the vaults can lose you some or all of your money. Risks include:</p>
            <ul className={LIST}>
              <li>Smart-contract bugs and exploits in the vault, market, oracle or Morpho contracts</li>
              <li>Liquidations, bad debt, oracle failures and depegs in the underlying markets</li>
              <li>Withdrawals that wait for market liquidity</li>
              <li>Price volatility</li>
              <li>Phishing, fake sites, malicious browser extensions and compromised wallets</li>
              <li>Lost or stolen keys and seed phrases, and transactions that cannot be undone</li>
              <li>Changes in law, regulation and tax treatment</li>
            </ul>
            <p className={BODY}>
              See the <Link href="/risk" className="text-blue-600 underline">Risk</Link> page for how the vaults are
              set up. Never put in more than you can afford to lose.
            </p>
          </section>

          <section className="mb-8">
            <h2 className={SECTION_HEADING}>5. No warranty, no liability</h2>
            <p className={BODY}>
              Everything here is provided &quot;as is&quot;, without any warranty. It can be incomplete, wrong or out
              of date. To the maximum extent permitted by law, we are not liable for any loss arising from your use of
              the sites, the vaults, the Bitcoin node or anything we publish. The full terms are in the{' '}
              <Link href="/terms" className="text-blue-600 underline">Terms of Use</Link>.
            </p>
          </section>

          <section className="mb-8">
            <h2 className={SECTION_HEADING}>6. Contact</h2>
            <p className="text-gray-700"><strong>Email:</strong>{' '}
              <a href="mailto:muscadinelabs@gmail.com" className="text-blue-600 hover:text-blue-700 underline">
                muscadinelabs@gmail.com
              </a>
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

export default LegalPage;
