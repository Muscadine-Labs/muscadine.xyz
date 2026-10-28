import Link from 'next/link';
import type { AppVaults, VaultRow } from '@/src/lib/vaults';

const APP_URL = 'https://app.muscadine.xyz';

function formatPercent(value: number): string {
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

function formatTokenAmount(value: number, symbol: string | null): string {
  const amount =
    value >= 1000
      ? new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 2 }).format(value)
      : new Intl.NumberFormat('en-US', {
          maximumFractionDigits: value >= 1 ? 2 : 4,
          maximumSignificantDigits: value >= 1 ? undefined : 4,
        }).format(value);
  return symbol ? `${amount} ${symbol}` : amount;
}

function shortAddress(address: string): string {
  return `${address.slice(0, 6)}…${address.slice(-4)}`;
}

function vaultAppUrl(address: string): string {
  return `${APP_URL}/vault/v2/${address}`;
}

// Hides empty vaults. A vault whose TVL failed to load stays listed with dashes.
const MIN_LIST_TVL_USD = 1000;

const STRATEGIES = [
  {
    name: 'Prime',
    body: 'Generally allocates to lower-risk DeFi markets, such as Bitcoin and Ether collateral.',
  },
  {
    name: 'Frontier',
    body: 'The higher-yield strategy. It optimizes for APY and allocates to other crypto and tokenized stocks.',
  },
] as const;

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

function ExternalIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  );
}

function StrategyPill({ strategy }: { strategy: VaultRow['strategy'] }) {
  return (
    <span className="inline-flex items-center rounded-full border border-gray-200 bg-white px-2 py-0.5 text-xs font-medium text-gray-700">
      {strategy}
    </span>
  );
}

function AmountWithUsd({ amount, usd }: { amount: string; usd: number | null }) {
  return (
    <>
      <span className="block text-gray-900 tabular-nums">{amount}</span>
      <span className="block text-xs text-gray-500 tabular-nums">{usd === null ? '—' : formatUsd(usd)}</span>
    </>
  );
}

function Deposits({ vault }: { vault: VaultRow }) {
  return (
    <AmountWithUsd
      amount={vault.totalAssets === null ? '—' : formatTokenAmount(vault.totalAssets, vault.assetSymbol)}
      usd={vault.tvlUsd}
    />
  );
}

function Apy({ vault, prominent = false }: { vault: VaultRow; prominent?: boolean }) {
  return (
    <>
      <span className={`block font-medium text-gray-900 tabular-nums ${prominent ? 'text-lg' : ''}`}>
        {vault.apy === null ? '—' : formatPercent(vault.apy)}
      </span>
      <span className="block text-xs text-gray-500 tabular-nums">
        {vault.apy90 === null ? '—' : `${formatPercent(vault.apy90)} 90D`}
      </span>
    </>
  );
}

function SharePrice({ vault }: { vault: VaultRow }) {
  return (
    <AmountWithUsd
      amount={formatSharePrice(vault.sharePrice, vault.assetSymbol)}
      usd={vault.sharePriceUsd}
    />
  );
}

function feePercent(value: number | null): string {
  return value === null ? '—' : formatPercent(value);
}

function formatSharePrice(value: number | null, symbol: string | null): string {
  if (value === null) return '—';
  const amount = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 4,
    maximumFractionDigits: 4,
  }).format(value);
  return symbol ? `${amount} ${symbol}` : amount;
}

export default function AppPage({ data }: { data: AppVaults }) {
  // Wrappers hold their deposits in an underlying vault, so only underlying vaults are listed.
  const listedVaults = data.vaults
    .filter((vault) => vault.kind === 'vault')
    .filter((vault) => vault.tvlUsd === null || vault.tvlUsd >= MIN_LIST_TVL_USD);

  const stats = [
    { label: 'Total deposits', value: data.tvlUsd === null ? '—' : formatUsd(data.tvlUsd) },
    {
      label: 'Interest earned by depositors',
      value: data.revenueToTokenHoldersUsd === null ? '—' : formatUsd(data.revenueToTokenHoldersUsd),
    },
    { label: 'Vaults on Base', value: String(listedVaults.length) },
  ];

  return (
    <div className="max-w-5xl mx-auto py-8">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-8">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-gray-500 mb-2">Morpho vaults on Base</p>
          <h1 className="font-light text-gray-900 leading-tight font-serif text-3xl sm:text-4xl">
            Vaults
          </h1>
          <p className="mt-4 text-lg text-gray-600 leading-relaxed">
            Muscadine vaults are non-custodial Morpho vaults on Base. Assets stay in your control and earn yield from overcollateralized lending. Deposit or withdraw any amount, at any time.
          </p>
        </div>
        <a
          href={APP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
        >
          Open App
          <ExternalIcon />
        </a>
      </div>

      <dl className="grid grid-cols-1 sm:grid-cols-3 border border-gray-200 rounded-xl bg-white divide-y sm:divide-y-0 sm:divide-x divide-gray-200 mb-12">
        {stats.map((stat) => (
          <div key={stat.label} className="p-5">
            <dt className="text-sm text-gray-500">{stat.label}</dt>
            <dd className="mt-1 text-2xl sm:text-3xl font-light text-gray-900 font-serif tabular-nums">{stat.value}</dd>
          </div>
        ))}
      </dl>

      <h2 className="text-2xl font-light text-gray-900 font-serif mb-4">Curated vaults</h2>

      {/* Desktop: table */}
      <div className="hidden lg:block border border-gray-200 rounded-xl bg-white overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-left text-xs font-medium text-gray-500">
              <th className="px-3 py-3 font-medium lg:px-5">Vault</th>
              <th className="px-3 py-3 font-medium text-right lg:px-5">Deposits</th>
              <th className="px-3 py-3 font-medium text-right lg:px-5">Performance fee</th>
              <th className="px-3 py-3 font-medium text-right lg:px-5">Management fee</th>
              <th className="px-3 py-3 font-medium text-right lg:px-5">APY</th>
              <th className="px-3 py-3 font-medium text-right lg:px-5">Share price</th>
            </tr>
          </thead>
          <tbody>
            {listedVaults.map((vault) => (
              <tr key={vault.address} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                <td className="px-3 py-4 align-top lg:px-5">
                  <a
                    href={vaultAppUrl(vault.address)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-gray-900 hover:underline underline-offset-2"
                  >
                    {vault.name}
                  </a>
                  <div className="mt-1 flex items-center gap-2">
                    <StrategyPill strategy={vault.strategy} />
                    <a
                      href={`https://basescan.org/address/${vault.address}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${vault.name} contract ${vault.address} on Basescan`}
                      className="whitespace-nowrap font-mono text-xs text-gray-500 hover:text-gray-900"
                    >
                      {shortAddress(vault.address)}
                    </a>
                  </div>
                </td>
                <td className="px-3 py-4 text-right align-top whitespace-nowrap lg:px-5">
                  <Deposits vault={vault} />
                </td>
                <td className="px-3 py-4 text-right align-top text-gray-700 tabular-nums whitespace-nowrap lg:px-5">
                  {feePercent(vault.performanceFee)}
                </td>
                <td className="px-3 py-4 text-right align-top text-gray-700 tabular-nums whitespace-nowrap lg:px-5">
                  {feePercent(vault.managementFee)}
                </td>
                <td className="px-3 py-4 text-right align-top whitespace-nowrap lg:px-5">
                  <Apy vault={vault} />
                </td>
                <td className="px-3 py-4 text-right align-top whitespace-nowrap lg:px-5">
                  <SharePrice vault={vault} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile: cards */}
      <ul className="lg:hidden space-y-3">
        {listedVaults.map((vault) => (
          <li key={vault.address} className="border border-gray-200 rounded-xl bg-white p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <a
                  href={vaultAppUrl(vault.address)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-gray-900 hover:underline underline-offset-2"
                >
                  {vault.name}
                </a>
                <div className="mt-1 flex items-center gap-2">
                  <StrategyPill strategy={vault.strategy} />
                  <a
                    href={`https://basescan.org/address/${vault.address}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${vault.name} contract ${vault.address} on Basescan`}
                    className="font-mono text-xs text-gray-500 hover:text-gray-900"
                  >
                    {shortAddress(vault.address)}
                  </a>
                </div>
              </div>
              <div className="shrink-0 text-right">
                <Apy vault={vault} prominent />
              </div>
            </div>
            <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
              <div>
                <dt className="text-xs text-gray-500 mb-0.5">Deposits</dt>
                <dd>
                  <Deposits vault={vault} />
                </dd>
              </div>
              <div>
                <dt className="text-xs text-gray-500 mb-0.5">Share price</dt>
                <dd>
                  <SharePrice vault={vault} />
                </dd>
              </div>
              <div>
                <dt className="text-xs text-gray-500 mb-0.5">Performance fee</dt>
                <dd className="text-gray-900 tabular-nums">{feePercent(vault.performanceFee)}</dd>
              </div>
              <div>
                <dt className="text-xs text-gray-500 mb-0.5">Management fee</dt>
                <dd className="text-gray-900 tabular-nums">{feePercent(vault.managementFee)}</dd>
              </div>
            </dl>
          </li>
        ))}
      </ul>

      <p className="mt-3 text-sm text-gray-600">
        APY is the current net rate after fees and moves with market rates. It is not a promised return. 90D APY is the realized average of that rate over the last 90 days. Share price is what one share is worth in the vault asset. The performance fee is taken from the yield. The management fee is charged on assets over the year. Allocations, liquidity, and risk details for each vault are in the{' '}
        <a
          href={APP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-900 underline underline-offset-2 hover:text-gray-600"
        >
          app
        </a>
        .
      </p>

      <section className="mt-16 border-t border-gray-200 pt-12">
        <h2 className="text-2xl font-light text-gray-900 font-serif mb-8">How these vaults work</h2>

        <h3 className="text-sm font-medium text-gray-500 mb-3">Strategies</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {STRATEGIES.map((strategy) => (
            <div key={strategy.name} className="border border-gray-200 rounded-xl bg-white p-5">
              <p className="text-xl font-light text-gray-900 font-serif">{strategy.name}</p>
              <p className="mt-2 text-gray-700 leading-relaxed">{strategy.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-3 mb-10 text-sm text-gray-600">Both are run with dedicated risk management.</p>

        <h3 className="text-sm font-medium text-gray-500 mb-3">Roles</h3>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {ROLES.map((role) => (
            <div key={role.name} className="border border-gray-200 rounded-xl bg-white p-5">
              <dt className="font-medium text-gray-900">{role.name}</dt>
              <dd className="mt-1 text-gray-700 leading-relaxed">{role.body}</dd>
            </div>
          ))}
        </dl>

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
