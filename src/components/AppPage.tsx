import Link from 'next/link';

const LEARN_LINKS = [
  { label: 'What is Morpho?', href: 'https://docs.morpho.org/learn/' },
  { label: 'What is a vault?', href: 'https://docs.morpho.org/learn/concepts/vault-v2/' },
  { label: 'What is a curator?', href: 'https://docs.morpho.org/learn/concepts/curator/' },
] as const;

function ExternalIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  );
}

export default function AppPage() {
  return (
    <div className="max-w-5xl mx-auto py-8">
      <div className="max-w-2xl mb-12">
        <p className="text-sm font-medium text-gray-500 mb-2">Morpho vaults on Base</p>
        <h1 className="font-light text-gray-900 leading-tight font-serif text-3xl sm:text-4xl">
          Vaults
        </h1>
        <p className="mt-4 text-lg text-gray-600 leading-relaxed">
          Non-custodial Morpho vaults on Base, set up for our own funds. Deposit access is controlled on-chain and
          may be limited to addresses we allow; check the vault on the app or on-chain before sending funds. Yield
          comes from overcollateralized lending, is not guaranteed, and you
          can lose money. A large withdrawal can wait for market liquidity.
        </p>
      </div>

      <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
        <p>
          <strong className="font-medium text-gray-900">Prime</strong> lends against lower-risk collateral such as
          Bitcoin and Ether. <strong className="font-medium text-gray-900">Frontier</strong> aims for more yield with
          more risk. Both use per-market caps, timelocks on changes that add risk, and a sentinel that can pull funds
          back.
        </p>
        <p>
          Yields are variable and not guaranteed. Vault performance and management fees are set to 0%. You still pay
          network (gas) and any third-party costs. Read the{' '}
          <Link href="/risk" className="text-blue-600 underline">
            Risk
          </Link>{' '}
          page,{' '}
          <Link href="/legal" className="text-blue-600 underline">
            Legal disclaimer
          </Link>
          , and{' '}
          <Link href="/terms" className="text-blue-600 underline">
            Terms of Use
          </Link>{' '}
          before using a vault. For any questions,{' '}
          <Link href="/contact" className="text-blue-600 underline">
            Contact
          </Link>{' '}
          us.
        </p>
      </div>

      <section className="mt-12">
        <h3 className="text-sm font-medium text-gray-500 mb-3">Learn more</h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 border-t border-gray-200">
          {LEARN_LINKS.map((link) => (
            <li key={link.href} className="border-b border-gray-200">
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between py-3 text-gray-900 hover:text-gray-600"
              >
                {link.label}
                <ExternalIcon className="w-4 h-4 text-gray-400" />
              </a>
            </li>
          ))}
          <li className="border-b border-gray-200">
            <Link href="/self-custody" className="flex items-center justify-between py-3 text-gray-900 hover:text-gray-600">
              How to self-custody
              <span aria-hidden="true" className="text-gray-400">→</span>
            </Link>
          </li>
        </ul>
      </section>
    </div>
  );
}
