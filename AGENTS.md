# AGENTS.md — muscadine.xyz

Static Next.js 16 (App Router) site for Muscadine. Tailwind CSS 4, Three.js shapes on the home page. No environment variables, no analytics.

Security headers (CSP included) live in `vercel.json`. The CSP has no `'unsafe-eval'`: plain `three` and the Next production build do not need it. Re-check the home page shapes under that CSP if you add a 3D or animation library.

## Home page 3D (do not regress)

- The shapes are decorative. Their containers must never capture touches: no `touch-action: none` (it made a 300px band of the phone home page unscrollable); `IsometricNodes` is `pointer-events-none` + `aria-hidden`. The card shapes only listen to mouse events on `window`, so touch scrolling and taps still work.
- `new THREE.WebGLRenderer` is wrapped in try/catch in every shape: without WebGL the box stays empty instead of crashing the page into the error boundary. Cleanup calls `forceContextLoss()` before `dispose()` (the home page holds 5 contexts).
- Renderers use `powerPreference: 'default'` and cap the pixel ratio at 1.5 on touch devices (`pointer: coarse`), 2 elsewhere. The card shapes skip their hover raycast while off-screen.
- The hero's outer frames show from `xl` (1280px); at `lg` they clip on iPad landscape.
- The mobile menu (`MuscadineBanner`) closes on any route change (logo, Back, links).

## What Muscadine is

A personal, non-commercial project (the LLC is dissolved). Copy never mentions services, clients, a company, fees charged to anyone or an advisory relationship. The vaults are set up for our own funds; deposit access is controlled on-chain and may be limited to addresses we allow; performance/management fees 0% (gas and third-party costs still apply).

## Pages

| Route | Component | Notes |
|-------|-----------|-------|
| `/` | `MuscadineHome` | Hero + Projects cards (Vaults, Bitcoin Node, Self Custody, Other Projects) |
| `/projects` | `ProjectsPage` | Same cards. `/solutions` redirects here (308, `next.config.js`) |
| `/app` | `AppPage` | Vaults intro + Open App CTA. No live Morpho API / vault table. |
| `/self-custody` | `SelfCustodyPage` | One page: kinds of wallets, seed backups (BIP-85 as a collapsed note), habits, Bitcoin and DeFi links |
| `/node` | `NodePage` | Electrum server over Tor |
| `/about`, `/contact` | | |
| `/terms`, `/legal`, `/privacy`, `/risk` | | Legal pages. The app links to these exact URLs; do not move them |

## Vaults page rules

- **Open App** is the only link to app.muscadine.xyz.
- Copy matches Legal / Terms / Risk: own funds; on-chain deposit access may be limited; yields not guaranteed; 0% performance/management fees; link Risk, Legal, Terms, and Contact.

## Self-custody page

No Coldcard, Revoke.cash, exchange or protocol recommendations. Products named are examples only.

## Commands

```bash
npm run dev     # http://localhost:3002 (scripts set NEXT_TELEMETRY_DISABLED=1)
npm run lint
npm run build
```

Run `npm run lint` and `npm run build` before every push. Never push to or merge into `main`; changes reach `main` through a PR the user merges.
