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

/** Same slug Morpho uses in its vault URLs (Muscadine USDC Prime → muscadine-usdc-prime). */
function morphoVaultUrl(vault: VaultRow): string {
  const network = vault.network.toLowerCase();
  const slug = vault.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  return `https://app.morpho.org/${network}/vault/${vault.address}/${slug}`;
}

// Hides empty vaults. A vault whose TVL failed to load stays listed with dashes.
const MIN_LIST_TVL_USD = 1000;

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

function StrategyPill({ strategy }: { strategy: VaultRow['strategy'] }) {
  return (
    <span className="inline-flex items-center rounded-full border border-gray-200 bg-white px-2 py-0.5 text-xs font-medium text-gray-700">
      {strategy}
    </span>
  );
}

function VaultName({ vault }: { vault: VaultRow }) {
  return (
    <>
      <a
        href={morphoVaultUrl(vault)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${vault.name} on Morpho`}
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
    </>
  );
}

function Deposits({ vault }: { vault: VaultRow }) {
  return (
    <>
      <span className="block text-gray-900 tabular-nums">
        {vault.totalAssets === null ? '—' : formatTokenAmount(vault.totalAssets, vault.assetSymbol)}
      </span>
      <span className="block text-xs text-gray-500 tabular-nums">
        {vault.tvlUsd === null ? '—' : formatUsd(vault.tvlUsd)}
      </span>
    </>
  );
}

function Apy({ vault }: { vault: VaultRow }) {
  return (
    <span className="font-medium text-gray-900 tabular-nums">
      {vault.apy === null ? '—' : formatPercent(vault.apy)}
    </span>
  );
}

export default function AppPage({ data }: { data: AppVaults }) {
  const listedVaults = data.vaults.filter((vault) => vault.tvlUsd === null || vault.tvlUsd >= MIN_LIST_TVL_USD);

  return (
    <div className="max-w-5xl mx-auto py-8">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-gray-500 mb-2">Morpho vaults on Base</p>
          <h1 className="font-light text-gray-900 leading-tight font-serif text-3xl sm:text-4xl">
            Vaults
          </h1>
          <p className="mt-4 text-lg text-gray-600 leading-relaxed">
            Non-custodial Morpho vaults on Base, set up for our own funds. Deposits are open to approved wallets only. Yield comes from overcollateralized lending, is not guaranteed, and you can lose money. A large withdrawal can wait for market liquidity.
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

      <h2 className="text-2xl font-light text-gray-900 font-serif mb-4">Current vaults</h2>

      <ul className="border border-gray-200 rounded-xl bg-white divide-y divide-gray-100">
        <li className="hidden sm:grid grid-cols-[1fr_10rem_6rem] gap-4 px-5 py-3 text-xs font-medium text-gray-500">
          <span>Vault</span>
          <span className="text-right">Deposits</span>
          <span className="text-right">APY</span>
        </li>
        {listedVaults.map((vault) => (
          <li
            key={vault.address}
            className="grid grid-cols-[1fr_auto] sm:grid-cols-[1fr_10rem_6rem] gap-x-4 gap-y-3 px-4 py-4 sm:px-5"
          >
            <div className="min-w-0">
              <VaultName vault={vault} />
            </div>
            <div className="order-last col-span-2 flex items-baseline justify-between text-sm sm:order-none sm:col-span-1 sm:block sm:text-right">
              <span className="text-xs text-gray-500 sm:hidden">Deposits</span>
              <div className="text-right">
                <Deposits vault={vault} />
              </div>
            </div>
            <div className="text-right">
              <Apy vault={vault} />
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-4 space-y-2 text-sm text-gray-600 leading-relaxed">
        <p>
          <strong className="font-medium text-gray-900">Prime</strong> lends against lower-risk collateral such as Bitcoin and Ether. <strong className="font-medium text-gray-900">Frontier</strong> aims for more yield with more risk. Both use per-market caps, timelocks on changes that add risk, and a sentinel that can pull funds back.
        </p>
        <p>
          APY is the current net rate and changes with the market. The vaults charge no fees. Vault names open the vault on Morpho, with its markets, liquidity and history.
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
