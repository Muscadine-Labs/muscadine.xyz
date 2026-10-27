import Link from 'next/link';
import type { AppVaults, VaultRow } from '@/src/lib/vaults';

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

function shortAddress(address: string): string {
  return `${address.slice(0, 6)}…${address.slice(-4)}`;
}

const MIN_LIST_TVL_USD = 1000;

const ROLES = [
  { name: 'Owner', body: 'Appoints the curator and sentinels. Does not move funds or set risk.' },
  { name: 'Curator', body: 'Muscadine. Chooses which markets a vault may use, and the cap on each. Changes that add risk wait out a timelock.' },
  { name: 'Allocator', body: 'Moves funds among the markets the curator allowed, inside those caps.' },
  { name: 'Sentinel', body: 'Can pull funds back, lower a cap, or cancel a pending change. Cannot add risk.' },
] as const;

const LEARN_LINKS = [
  { label: 'What is Morpho?', href: 'https://docs.morpho.org/learn/' },
  { label: 'What is a vault?', href: 'https://docs.morpho.org/learn/concepts/vault-v2/' },
  { label: 'What is a wrapper vault?', href: 'https://docs.morpho.org/developers/earn/concepts/fee-wrapper/' },
  { label: 'What is a curator?', href: 'https://docs.morpho.org/learn/concepts/curator/' },
  { label: 'Variable-rate markets', href: 'https://docs.morpho.org/learn/concepts/blue/' },
  { label: 'Fixed-rate markets', href: 'https://docs.morpho.org/learn/concepts/midnight/' },
] as const;

export default function AppPage({ data }: { data: AppVaults }) {
  const listedVaults = data.vaults.filter(
    (vault): vault is VaultRow & { tvlUsd: number } =>
      vault.tvlUsd !== null && vault.tvlUsd >= MIN_LIST_TVL_USD
  );

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 mb-10">
        <div className="max-w-2xl">
          <h1 className="font-light text-gray-900 leading-tight font-serif text-3xl sm:text-4xl">
            Vaults
          </h1>
          <p className="mt-4 text-lg text-gray-600 leading-relaxed">
            Muscadine vaults are non-custodial Morpho vaults on Base. Assets stay in your control and earn yield from overcollateralized lending. Deposit or withdraw any amount, at any time.
          </p>
        </div>
        <a
          href="https://app.muscadine.xyz"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center justify-center px-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
        >
          Open App
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
        <div className="border border-gray-200 rounded-lg p-5">
          <p className="text-3xl font-light text-gray-900 font-serif tabular-nums">
            {data.tvlUsd === null ? '—' : formatUsd(data.tvlUsd)}
          </p>
          <p className="mt-1 text-sm text-gray-600">TVL</p>
        </div>
        <div className="border border-gray-200 rounded-lg p-5">
          <p className="text-3xl font-light text-gray-900 font-serif tabular-nums">
            {data.revenueToTokenHoldersUsd === null ? '—' : formatUsd(data.revenueToTokenHoldersUsd)}
          </p>
          <p className="mt-1 text-sm text-gray-600">Revenue to token holders</p>
        </div>
      </div>

      <h2 className="text-2xl font-light text-gray-900 font-serif mb-2">
        List of curated Muscadine Vaults
      </h2>
      <p className="text-sm text-gray-600 mb-4">
        Every vault here is on Base. APY is the recent average net rate, not a promised return.
      </p>
      <div className="overflow-x-auto border border-gray-200 rounded-lg">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-gray-50 text-left">
              <th className="px-4 py-3 font-medium text-gray-900">Vault</th>
              <th className="px-4 py-3 font-medium text-gray-900 text-right">APY</th>
              <th className="px-4 py-3 font-medium text-gray-900 text-right whitespace-nowrap">Performance fee</th>
              <th className="px-4 py-3 font-medium text-gray-900 text-right whitespace-nowrap">Management fee</th>
              <th className="px-4 py-3 font-medium text-gray-900 text-right">TVL</th>
              <th className="px-4 py-3 font-medium text-gray-900">Address</th>
            </tr>
          </thead>
          <tbody>
            {listedVaults.map((vault) => (
              <tr key={vault.address} className="border-b last:border-0">
                <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">{vault.name}</td>
                <td className="px-4 py-3 text-right text-gray-700 tabular-nums whitespace-nowrap">
                  {vault.apy === null ? '—' : formatApy(vault.apy)}
                </td>
                <td className="px-4 py-3 text-right text-gray-700 tabular-nums whitespace-nowrap">
                  {vault.performanceFee === null ? '—' : formatApy(vault.performanceFee)}
                </td>
                <td className="px-4 py-3 text-right text-gray-700 tabular-nums whitespace-nowrap">
                  {vault.managementFee === null ? '—' : formatApy(vault.managementFee)}
                </td>
                <td className="px-4 py-3 text-right text-gray-700 tabular-nums whitespace-nowrap">
                  {formatUsd(vault.tvlUsd)}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <a
                    href={`https://basescan.org/address/${vault.address}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${vault.name} contract ${vault.address} on Basescan`}
                    className="font-mono text-gray-700 hover:text-gray-900"
                  >
                    {shortAddress(vault.address)}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-sm text-gray-600">
        Allocations, liquidity, and the rest of each vault are on the{' '}
        <a
          href="https://app.muscadine.xyz"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-900 underline underline-offset-2 hover:text-gray-600"
        >
          app
        </a>
        .
      </p>

      <section className="mt-16 border-t border-gray-200 pt-12">
        <h2 className="text-2xl font-light text-gray-900 font-serif mb-8">
          How these vaults work
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-light text-gray-900 font-serif mb-2">Prime and Frontier</h3>
            <p className="text-gray-700 leading-relaxed">
              <span className="font-medium text-gray-900">Prime</span> generally allocates to lower-risk DeFi markets, such as Bitcoin and Ether.
            </p>
            <p className="mt-3 text-gray-700 leading-relaxed">
              <span className="font-medium text-gray-900">Frontier</span> is the higher-yield strategy. It optimizes for APY and allocates to other crypto and tokenized stocks.
            </p>
            <p className="mt-3 text-gray-700 leading-relaxed">
              Both are run with dedicated risk management.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-light text-gray-900 font-serif mb-3">Roles</h3>
            <dl className="space-y-3">
              {ROLES.map((role) => (
                <div key={role.name}>
                  <dt className="font-medium text-gray-900">{role.name}</dt>
                  <dd className="text-gray-700 leading-relaxed">{role.body}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <h3 className="text-xl font-light text-gray-900 font-serif mb-3">Learn more</h3>
            <ul className="space-y-2">
              {LEARN_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-900 underline underline-offset-2 hover:text-gray-600"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <Link href="/self-custody" className="text-gray-900 underline underline-offset-2 hover:text-gray-600">
                  How to self-custody
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
