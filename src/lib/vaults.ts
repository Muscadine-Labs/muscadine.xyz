// Curated Morpho V2 vaults on Base. Fee wrappers sit on top of an underlying
// vault, so protocol TVL counts underlying vaults only.

export const REVALIDATE_SECONDS = 300;

export const BASE_CHAIN_ID = 8453;

const MORPHO_GRAPHQL_URL = 'https://api.morpho.org/graphql';
const DEFILLAMA_SUPPLY_SIDE_URL =
  'https://api.llama.fi/summary/fees/muscadine?dataType=dailySupplySideRevenue&excludeTotalDataChart=true&excludeTotalDataChartBreakdown=true';

export type VaultKind = 'vault' | 'wrapper';

export interface VaultConfig {
  name: string;
  address: string;
  kind: VaultKind;
}

export const VAULTS: readonly VaultConfig[] = [
  { name: 'Muscadine USDC Prime', address: '0x89712980Cb434eF5aE4AB29349419eb976B0b496', kind: 'vault' },
  { name: 'Muscadine USDC Frontier', address: '0x314fD07319ef645bA7D548915CCd91F4788A1839', kind: 'vault' },
  { name: 'Muscadine WETH Prime', address: '0xD6DCAd2f7Da91FBb27BdA471540d9770c97a5a43', kind: 'vault' },
  { name: 'Muscadine cbBTC Prime', address: '0x99dcd0D75822BA398F13B2A8852B07c7e137EC70', kind: 'vault' },
  { name: 'Muscadine USDC Prime wrapper', address: '0x036A01eFdDC87F6634FFDE0533EE528b90fc7A45', kind: 'wrapper' },
  { name: 'Muscadine WETH Prime wrapper', address: '0x548653b09b03A69f93B3890c382fE9DcD245cbc4', kind: 'wrapper' },
  { name: 'Muscadine cbBTC Prime wrapper', address: '0x0e0a857d2AF1A2d43c82d1FA54766239CAb70147', kind: 'wrapper' },
  { name: 'Muscadine USDC Frontier wrapper', address: '0x54D8417bD21C86A7806b58f5aa2e2E0bB88B856A', kind: 'wrapper' },
];

export const underlyingVaultAddresses = VAULTS.filter((vault) => vault.kind === 'vault').map(
  (vault) => vault.address
);

export interface VaultRow {
  name: string;
  address: string;
  kind: VaultKind;
  network: string;
  apy: number | null;
  tvlUsd: number | null;
}

export interface AppVaults {
  tvlUsd: number | null;
  revenueToTokenHoldersUsd: number | null;
  vaults: VaultRow[];
}

function displayName(fallback: string, liveName: string | null | undefined, kind: VaultKind): string {
  const base = liveName?.trim() || fallback.replace(/ wrapper$/, '');
  if (kind === 'wrapper') return `${base} wrapper`;
  return base;
}

async function fetchVaultRows(): Promise<VaultRow[]> {
  const fields = VAULTS.map(
    (vault, i) =>
      `v${i}: vaultV2ByAddress(address: "${vault.address}", chainId: ${BASE_CHAIN_ID}) { name totalAssetsUsd avgNetApy chain { network } }`
  ).join('\n');

  try {
    const res = await fetch(MORPHO_GRAPHQL_URL, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ query: `{ ${fields} }` }),
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) throw new Error('morpho');
    const json = (await res.json()) as {
      data?: Record<
        string,
        {
          name: string | null;
          totalAssetsUsd: number | null;
          avgNetApy: number | null;
          chain: { network: string | null } | null;
        } | null
      >;
    };
    if (!json.data) throw new Error('morpho');
    return VAULTS.map((vault, i) => {
      const row = json.data?.[`v${i}`];
      return {
        name: displayName(vault.name, row?.name, vault.kind),
        address: vault.address,
        kind: vault.kind,
        network: row?.chain?.network?.trim() || 'Base',
        apy: typeof row?.avgNetApy === 'number' ? row.avgNetApy * 100 : null,
        tvlUsd: typeof row?.totalAssetsUsd === 'number' ? row.totalAssetsUsd : null,
      };
    });
  } catch {
    return VAULTS.map((vault) => ({
      name: vault.name,
      address: vault.address,
      kind: vault.kind,
      network: 'Base',
      apy: null,
      tvlUsd: null,
    }));
  }
}

// DefiLlama supply-side revenue: yield distributed to vault depositors.
async function fetchRevenueToTokenHoldersUsd(): Promise<number | null> {
  try {
    const res = await fetch(DEFILLAMA_SUPPLY_SIDE_URL, {
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) return null;
    const json = (await res.json()) as { totalAllTime?: number | null };
    return typeof json.totalAllTime === 'number' ? json.totalAllTime : null;
  } catch {
    return null;
  }
}

export async function getAppVaults(): Promise<AppVaults> {
  const [vaults, revenueToTokenHoldersUsd] = await Promise.all([
    fetchVaultRows(),
    fetchRevenueToTokenHoldersUsd(),
  ]);

  const underlying = vaults.filter((vault) => vault.kind === 'vault');
  const tvlValues = underlying.map((vault) => vault.tvlUsd);
  const tvlUsd = tvlValues.some((value) => typeof value !== 'number')
    ? null
    : (tvlValues as number[]).reduce((sum, value) => sum + value, 0);

  return { tvlUsd, revenueToTokenHoldersUsd, vaults };
}
