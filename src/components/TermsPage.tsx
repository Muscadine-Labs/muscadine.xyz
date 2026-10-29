'use client';

import React from 'react';
import Link from 'next/link';

const SECTION_HEADING = 'text-2xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2';
const BODY = 'text-gray-700 mb-4';
const LIST = 'text-gray-700 list-disc list-inside space-y-2 mb-4';

const TermsPage: React.FC = () => {
  return (
    <div>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="prose prose-lg max-w-none">
          <h1 className="text-4xl font-light text-gray-900 mb-4 font-serif border-b-2 border-gray-200 pb-4">
            Terms of Use
          </h1>
          <p className="text-gray-600 italic mb-8">Last updated: October 2026</p>

          <div className="bg-gray-50 border border-gray-200 p-6 mb-8 rounded-sm">
            <p className="text-gray-800 font-semibold">
              Muscadine is a personal, non-commercial project. It is not a business, has no clients and offers no
              services for hire. Nothing here is financial, investment, tax or legal advice, or an offer to sell or a
              solicitation to buy anything. Read the{' '}
              <Link href="/risk" className="underline">Risk</Link> page and the{' '}
              <Link href="/legal" className="underline">Legal disclaimer</Link> before using a vault.
            </p>
          </div>

          <section className="mb-8">
            <h2 className={SECTION_HEADING}>1. Acceptance</h2>
            <p className={BODY}>
              By using muscadine.xyz or app.muscadine.xyz (the &quot;sites&quot;), you agree to these terms. If you
              do not agree, do not use the sites. &quot;Muscadine&quot;, &quot;we&quot; and &quot;us&quot; mean the
              individual who runs the sites.
            </p>
          </section>

          <section className="mb-8">
            <h2 className={SECTION_HEADING}>2. What the sites are</h2>
            <ul className={LIST}>
              <li><strong>muscadine.xyz</strong>: notes, guides and open-source tools about Bitcoin self-custody and DeFi, shared for free.</li>
              <li><strong>app.muscadine.xyz</strong>: an open-source interface to Morpho vaults on Base that we set up for our own funds.</li>
              <li><strong>Bitcoin node</strong>: a self-hosted node we run for ourselves and leave open to connect to, free and with no guarantee it stays up.</li>
            </ul>
            <p className={BODY}>
              We are not a bank, broker, investment adviser, fund or custodian. We do not charge anyone for anything,
              take payment, manage anyone else&apos;s money or enter into any professional or advisory relationship
              with you.
            </p>
          </section>

          <section className="mb-8">
            <h2 className={SECTION_HEADING}>3. The vaults</h2>
            <p className={BODY}>
              The vaults are Morpho Vault V2 smart contracts on Base. We chose their markets and caps for our own
              use. Deposits are open to approved wallets only, and every vault&apos;s performance and management fee
              is set to 0%.
            </p>
            <ul className={LIST}>
              <li>You keep custody. We never hold your keys or your assets; you sign every transaction yourself.</li>
              <li>The vault, market and Morpho contracts are third-party, open-source code that we do not control. On-chain state is the source of truth.</li>
              <li>Yields are variable and not guaranteed. Past APY is not a reliable indicator of future results.</li>
              <li>A large withdrawal can wait for market liquidity, and you can lose some or all of what you deposit.</li>
              <li>We can change markets, caps and other settings at any time, within the vault&apos;s on-chain rules.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className={SECTION_HEADING}>4. Your responsibility</h2>
            <ul className={LIST}>
              <li>You decide whether to use a vault, a guide or the node, and you accept the risks of doing so.</li>
              <li>You do your own research and get your own professional advice before any financial decision.</li>
              <li>You keep your keys, devices and seed phrases secure, and check every URL, address and transaction before you sign.</li>
              <li>You follow the laws that apply to you, including tax and sanctions laws.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className={SECTION_HEADING}>5. No warranty</h2>
            <p className={BODY}>
              The sites, the code, the node and all content are provided &quot;as is&quot; and &quot;as
              available&quot;, without any warranty, express or implied, including merchantability, fitness for a
              particular purpose, accuracy and non-infringement. They can be wrong, out of date, unavailable or
              changed at any time.
            </p>
          </section>

          <section className="mb-8">
            <h2 className={SECTION_HEADING}>6. Limitation of liability</h2>
            <p className={BODY}>
              To the maximum extent permitted by law, we are not liable for any direct, indirect, incidental, special
              or consequential loss arising from your use of the sites, the vaults, the node or any content, including
              loss of digital assets, smart-contract exploits, liquidations, oracle or market failures, interface or
              phishing attacks, downtime, and errors in anything we publish.
            </p>
          </section>

          <section className="mb-8">
            <h2 className={SECTION_HEADING}>7. Indemnity</h2>
            <p className={BODY}>
              You agree to indemnify and hold us harmless from any claim, loss or expense arising from your use of the
              sites or your breach of these terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className={SECTION_HEADING}>8. Open source and third parties</h2>
            <p className={BODY}>
              Our code is published under open-source licenses; use it under those licenses. The sites link to and
              rely on third parties (Morpho, wallets, RPC providers, block explorers and others) with their own terms
              and risks. We are not responsible for them.
            </p>
          </section>

          <section className="mb-8">
            <h2 className={SECTION_HEADING}>9. Changes</h2>
            <p className={BODY}>
              We can change or take down the sites, and change these terms, at any time. Continuing to use the sites
              means you accept the current terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className={SECTION_HEADING}>10. Governing law</h2>
            <p className={BODY}>
              These terms are governed by the laws of the United States and of the U.S. state where the operator of
              the sites resides, without regard to conflict-of-law rules. If any part of these terms is unenforceable,
              the rest stays in effect.
            </p>
          </section>

          <section className="mb-8">
            <h2 className={SECTION_HEADING}>11. Contact</h2>
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

export default TermsPage;
