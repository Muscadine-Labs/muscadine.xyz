import Link from 'next/link';
import type { ReactNode } from 'react';

type ExternalLink = { label: string; href: string };

const WALLET_TYPES = [
  {
    name: 'Software (hot) wallet',
    body: 'An app on your phone or computer. Easy for everyday use and small amounts, but the keys sit on a device that is online.',
  },
  {
    name: 'Hardware wallet',
    body: 'A small device that keeps the keys offline and signs on its own screen. The usual choice for savings. Pair it with a software wallet to see balances and build transactions.',
  },
  {
    name: 'Air-gapped signer',
    body: 'A hardware signer that never connects by USB or Bluetooth; it passes transactions by QR code or microSD. SeedSigner and Coldcard work this way.',
  },
  {
    name: 'Multisig',
    body: 'Spending needs several keys, such as 2 of 3, kept on different devices and in different places. One lost or stolen key does not lose the funds. More setup, worth it for large amounts.',
  },
  {
    name: 'Smart wallet',
    body: 'On Ethereum-style networks, a wallet that is a contract, often secured by a passkey instead of a seed phrase. Base Account and Safe are examples. Recovery depends on that wallet, so learn how it works before funding it.',
  },
] as const;

const BACKUP_RULES = [
  'Most wallets give you a 12 or 24 word seed phrase. Anyone with those words has your funds.',
  'Write it on paper or stamp it in metal. Never photograph it, type it into a website, or store it in the cloud.',
  'Keep at least two copies in different places.',
  'An optional passphrase adds a secret “25th word”. It protects a found seed, but forgetting it loses the funds, so back it up separately.',
  'Practice a recovery with a small amount before you rely on a wallet.',
  'Leave instructions for someone you trust, without the seed itself, so your funds are not lost with you.',
] as const;

const HABITS = [
  'Buy hardware wallets from the maker, never second hand.',
  'Check the receive address on the device screen, and send a small test first.',
  'No real support person will ever ask for your seed phrase.',
  'Keep firmware and wallet apps up to date.',
] as const;

const BITCOIN_LINKS: readonly ExternalLink[] = [
  { label: 'Sparrow Wallet (desktop)', href: 'https://sparrowwallet.com/' },
  { label: 'SeedSigner (DIY air-gapped signer)', href: 'https://seedsigner.com/' },
  { label: 'Trezor (hardware)', href: 'https://trezor.io/' },
  { label: 'mempool.space (block explorer)', href: 'https://mempool.space/' },
  { label: 'Start9 (run your own node)', href: 'https://start9.com/' },
];

const DEFI_LINKS: readonly ExternalLink[] = [
  { label: 'Rabby (browser and mobile wallet)', href: 'https://rabby.io/' },
  { label: 'Phantom', href: 'https://phantom.com/' },
  { label: 'Trezor (hardware)', href: 'https://trezor.io/' },
  { label: 'Ledger (hardware)', href: 'https://www.ledger.com/' },
  { label: 'DeBank (portfolio view)', href: 'https://debank.com/' },
];

function ExternalIcon() {
  return (
    <svg className="w-4 h-4 shrink-0 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  );
}

function LinkList({ links }: { links: readonly ExternalLink[] }) {
  return (
    <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-6 border-t border-gray-200">
      {links.map((link) => (
        <li key={link.href} className="border-b border-gray-200">
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between gap-3 py-3 text-gray-900 hover:text-gray-600"
          >
            {link.label}
            <ExternalIcon />
          </a>
        </li>
      ))}
    </ul>
  );
}

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="mt-14 scroll-mt-24">
      <h2 className="text-2xl font-light text-gray-900 font-serif mb-4">{title}</h2>
      {children}
    </section>
  );
}

function BulletList({ items }: { items: readonly string[] }) {
  return (
    <ul className="space-y-2 text-gray-700 leading-relaxed list-disc pl-5">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export default function SelfCustodyPage() {
  return (
    <div className="max-w-3xl mx-auto py-8">
      <p className="text-sm font-medium text-gray-500 mb-2">Guide</p>
      <h1 className="font-light text-gray-900 leading-tight font-serif text-3xl sm:text-4xl">Self-custody</h1>
      <p className="mt-4 text-lg text-gray-600 leading-relaxed">
        Self-custody means you hold the keys to your own coins, so no exchange or bank can freeze, lose or lend them.
        It also means nobody can recover them for you. These are the notes we follow ourselves. Start small and learn
        each step before moving real savings.
      </p>

      <Section id="wallets" title="Kinds of wallets">
        <p className="text-gray-700 leading-relaxed mb-4">
          A wallet holds keys, not coins; the coins live on the blockchain. Wallets differ in where the keys are kept.
          A common setup is a hardware wallet for savings and a software wallet with a small balance for daily use.
        </p>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {WALLET_TYPES.map((type) => (
            <div key={type.name} className="border border-gray-200 rounded-xl bg-white p-5">
              <dt className="font-medium text-gray-900">{type.name}</dt>
              <dd className="mt-1 text-gray-700 leading-relaxed">{type.body}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section id="backup" title="Back up your seed">
        <BulletList items={BACKUP_RULES} />
        <details className="mt-6 border border-gray-200 rounded-xl bg-white p-5">
          <summary className="cursor-pointer font-medium text-gray-900">Advanced: one seed for several wallets (BIP-85)</summary>
          <p className="mt-3 text-gray-700 leading-relaxed">
            BIP-85 lets one master seed create separate child seeds, each its own wallet. You back up the master once,
            and any child can be re-created from it. The trade-off: the master controls every child, so it needs your
            best protection. Supported by Coldcard, SeedSigner and others.
          </p>
        </details>
      </Section>

      <Section id="habits" title="Everyday habits">
        <BulletList items={HABITS} />
      </Section>

      <Section id="bitcoin" title="Bitcoin">
        <p className="text-gray-700 leading-relaxed">
          Use a hardware or air-gapped signer with Sparrow on your computer. New wallets use native SegWit (bc1q…) or
          Taproot (bc1p…) addresses, which cost less to spend from. Your wallet asks a server for your balance, so
          connecting it to your own node, or{' '}
          <Link href="/node" className="text-gray-900 underline underline-offset-2 hover:text-gray-600">
            ours
          </Link>
          , keeps your addresses private.
        </p>
        <LinkList links={BITCOIN_LINKS} />
      </Section>

      <Section id="defi" title="DeFi">
        <p className="text-gray-700 leading-relaxed">
          On Ethereum, Base and similar networks, a browser wallet such as Rabby connects to apps, ideally with a
          hardware wallet doing the signing. Every app you use asks for approval to move your tokens. Read what you
          sign, approve only the amount you need, and revoke old approvals. Keep a separate wallet with little in it for
          trying new apps.
        </p>
        <LinkList links={DEFI_LINKS} />
      </Section>

      <p className="mt-14 text-sm text-gray-500">
        General information only, not advice. Products named here are examples; check each one yourself.
      </p>
    </div>
  );
}
