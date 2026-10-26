import Link from 'next/link';
import type { AppVaults, VaultRow } from '@/src/lib/vaults';

const LEARN_LINKS = [
  { question: 'What is Morpho?', href: 'https://docs.morpho.org/learn/' },
  { question: 'What is a vault?', href: 'https://docs.morpho.org/learn/concepts/vault-v2/' },
  { question: 'What is a wrapper vault?', href: 'https://docs.morpho.org/developers/earn/concepts/fee-wrapper/' },
  { question: 'What is a curator?', href: 'https://docs.morpho.org/learn/concepts/curator/' },
  { question: 'How do Morpho variable interest rate markets work?', href: 'https://docs.morpho.org/learn/concepts/blue/' },
  { question: 'How do Morpho fixed interest rate markets work?', href: 'https://docs.morpho.org/learn/concepts/midnight/' },
  { question: 'How do I self-custody?', href: '/self-custody' },
] as const;

function formatApy(value: number): string {
  return `${value.toFixed(2)}%`;
}

function formatUsd(value: number): string {
  const digits = value >= 100 ? 0 : 2;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value);
}

const MIN_LIST_TVL_USD = 1000;

export default function AppPage({ data }: { data: AppVaults }) {
  const listedVaults = data.vaults.filter(
    (vault): vault is VaultRow & { tvlUsd: number } =>
      vault.tvlUsd !== null && vault.tvlUsd >= MIN_LIST_TVL_USD
  );

  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-10 max-w-3xl mx-auto">
        <h1 className="font-light text-gray-900 leading-tight mb-4 font-serif text-3xl sm:text-4xl">
          Vaults
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed">
          Muscadine vaults are non-custodial Morpho vaults on Base. Assets stay in your control and earn yield from overcollateralized lending. Deposit or withdraw any amount, at any time.
        </p>
        <a
          href="https://app.muscadine.xyz"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center mt-6 px-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
        >
          Open App
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 max-w-3xl mx-auto">
        <div className="border border-gray-200 rounded-lg p-5 text-center">
          <p className="text-3xl font-light text-gray-900 font-serif tabular-nums">
            {data.tvlUsd === null ? '—' : formatUsd(data.tvlUsd)}
          </p>
          <p className="mt-1 text-sm text-gray-600">TVL</p>
        </div>
        <div className="border border-gray-200 rounded-lg p-5 text-center">
          <p className="text-3xl font-light text-gray-900 font-serif tabular-nums">
            {data.revenueToTokenHoldersUsd === null ? '—' : formatUsd(data.revenueToTokenHoldersUsd)}
          </p>
          <p className="mt-1 text-sm text-gray-600">Revenue to token holders</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_17rem] gap-8 items-start">
        <div>
        <h2 className="text-xl font-light text-gray-900 font-serif mb-4">
          List of curated Muscadine Vaults
        </h2>
      <div className="overflow-x-auto border border-gray-200 rounded-lg">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b bg-gray-50 text-left">
              <th className="px-2 py-1.5 font-medium text-gray-900">Vault</th>
              <th className="px-2 py-1.5 font-medium text-gray-900">Network</th>
              <th className="px-2 py-1.5 font-medium text-gray-900 text-right">APY</th>
              <th className="px-2 py-1.5 font-medium text-gray-900">Address</th>
              <th className="px-2 py-1.5 font-medium text-gray-900 text-right">TVL</th>
            </tr>
          </thead>
          <tbody>
            {listedVaults.map((vault) => (
              <tr key={vault.address} className="border-b last:border-0">
                <td className="px-2 py-1.5 font-medium text-gray-900 whitespace-nowrap">{vault.name}</td>
                <td className="px-2 py-1.5 text-gray-700 whitespace-nowrap">{vault.network}</td>
                <td className="px-2 py-1.5 text-right text-gray-700 tabular-nums whitespace-nowrap">
                  {vault.apy === null ? '—' : formatApy(vault.apy)}
                </td>
                <td className="px-2 py-1.5">
                  <a
                    href={`https://basescan.org/address/${vault.address}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[11px] text-gray-700 hover:text-gray-900 break-all"
                  >
                    {vault.address}
                  </a>
                </td>
                <td className="px-2 py-1.5 text-right text-gray-700 tabular-nums whitespace-nowrap">
                  {formatUsd(vault.tvlUsd)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        </div>

        <aside>
        <h2 className="text-xl font-light text-gray-900 font-serif">Learning Resources</h2>
        <p className="mt-1 text-sm text-gray-600">
          Learn about DeFi, Morpho Protocol, and how to use Muscadine Vaults.
        </p>
        <ul className="mt-4">
          {LEARN_LINKS.map((resource) => {
            const external = !resource.href.startsWith('/');
            const className = 'flex items-center justify-between gap-3 py-2.5 border-b border-gray-200 text-sm text-gray-900 hover:text-blue-600';
            const label = (
              <>
                <span>{resource.question}</span>
                <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  {external ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  )}
                </svg>
              </>
            );
            return (
              <li key={resource.href}>
                {!external ? (
                  <Link href={resource.href} className={className}>
                    {label}
                  </Link>
                ) : (
                  <a href={resource.href} target="_blank" rel="noopener noreferrer" className={className}>
                    {label}
                  </a>
                )}
              </li>
            );
          })}
        </ul>
        <a
          href="https://docs.morpho.org/learn/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-4 text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          View all resources
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
        </aside>
      </div>
    </div>
  );
}
