# AGENTS.md — muscadine.xyz

Static Next.js 16 (App Router) site for Muscadine. Tailwind CSS 4, Three.js shapes on the home page. No environment variables, no analytics.

## What Muscadine is

A personal, non-commercial project (the LLC is dissolved). Copy never mentions services, clients, a company, fees charged to anyone or an advisory relationship. The vaults are set up for our own funds, open to approved wallets only, with 0% fees.

## Pages

| Route | Component | Notes |
|-------|-----------|-------|
| `/` | `MuscadineHome` | Hero + Projects cards (Vaults, Bitcoin Node, Self Custody, Other Projects) |
| `/projects` | `ProjectsPage` | Same cards. `/solutions` redirects here (308, `next.config.js`) |
| `/app` | `AppPage` | Vault list: name, deposits, APY. Data from Morpho GraphQL in `src/lib/vaults.ts` (revalidates every 5 min) |
| `/self-custody` | `SelfCustodyPage` | One page: kinds of wallets, seed backups (BIP-85 as a collapsed note), habits, Bitcoin and DeFi links |
| `/node` | `NodePage` | Electrum server over Tor |
| `/about`, `/contact` | | |
| `/terms`, `/legal`, `/privacy`, `/risk` | | Legal pages. The app links to these exact URLs; do not move them |

## Vaults page rules

- Vault names link to the vault on `app.morpho.org/base/vault/{address}/{slug}`. **Open App** is the only link to app.muscadine.xyz.
- Columns are Vault, Deposits, APY only. No fee columns (every vault is 0%), share price or roles.
- `VAULTS` holds the four live vaults. The retired fee wrappers are not listed.

## Self-custody page

No Coldcard, Revoke.cash, exchange or protocol recommendations. Products named are examples only.

## Commands

```bash
npm run dev     # http://localhost:3002
npm run lint
npm run build
```

Run `npm run lint` and `npm run build` before every push. Never push to or merge into `main`; changes reach `main` through a PR the user merges.
