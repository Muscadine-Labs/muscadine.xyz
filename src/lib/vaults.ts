// Curated Morpho V2 vaults on Base.

export const REVALIDATE_SECONDS = 300;

export const BASE_CHAIN_ID = 8453;

const MORPHO_GRAPHQL_URL = 'https://api.morpho.org/graphql';

export type VaultStrategy = 'Prime' | 'Frontier';

export interface VaultConfig {
  name: string;
  address: string;
  strategy: VaultStrategy;
}

export const VAULTS: readonly VaultConfig[] = [
  { name: 'Muscadine USDC Prime', address: '0x89712980Cb434eF5aE4AB29349419eb976B0b496', strategy: 'Prime' },
  { name: 'Muscadine USDC Frontier', address: '0x314fD07319ef645bA7D548915CCd91F4788A1839', strategy: 'Frontier' },
  { name: 'Muscadine WETH Prime', address: '0xD6DCAd2f7Da91FBb27BdA471540d9770c97a5a43', strategy: 'Prime' },
  { name: 'Muscadine cbBTC Prime', address: '0x99dcd0D75822BA398F13B2A8852B07c7e137EC70', strategy: 'Prime' },
];

export interface VaultRow {
  name: string;
  address: string;
  strategy: VaultStrategy;
  network: string;
  assetSymbol: string | null;
  /** Total deposits in the vault asset (human units). */
  totalAssets: number | null;
  apy: number | null;
  tvlUsd: number | null;
}

export interface AppVaults {
  vaults: VaultRow[];
}

function toTokenAmount(raw: number | string | null | undefined, decimals: number | null | undefined): number | null {
  if (raw === null || raw === undefined || typeof decimals !== 'number') return null;
  const value = Number(raw);
  return Number.isFinite(value) ? value / 10 ** decimals : null;
}

async function fetchVaultRows(): Promise<VaultRow[]> {
  const fields = VAULTS.map(
    (vault, i) =>
      `v${i}: vaultV2ByAddress(address: "${vault.address}", chainId: ${BASE_CHAIN_ID}) { name totalAssets totalAssetsUsd netApy chain { network } asset { symbol decimals } }`
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
          totalAssets: number | string | null;
          totalAssetsUsd: number | null;
          netApy: number | null;
          chain: { network: string | null } | null;
          asset: { symbol: string | null; decimals: number | null } | null;
        } | null
      >;
    };
    if (!json.data) throw new Error('morpho');
    return VAULTS.map((vault, i) => {
      const row = json.data?.[`v${i}`];
      // Spot net APY, after fees.
      const apy = row?.netApy;
      return {
        name: row?.name?.trim() || vault.name,
        address: vault.address,
        strategy: vault.strategy,
        network: row?.chain?.network?.trim() || 'Base',
        assetSymbol: row?.asset?.symbol ?? null,
        totalAssets: toTokenAmount(row?.totalAssets, row?.asset?.decimals),
        apy: typeof apy === 'number' ? apy * 100 : null,
        tvlUsd: typeof row?.totalAssetsUsd === 'number' ? row.totalAssetsUsd : null,
      };
    });
  } catch {
    return VAULTS.map((vault) => ({
      name: vault.name,
      address: vault.address,
      strategy: vault.strategy,
      network: 'Base',
      assetSymbol: null,
      totalAssets: null,
      apy: null,
      tvlUsd: null,
    }));
  }
}

export async function getAppVaults(): Promise<AppVaults> {
  return { vaults: await fetchVaultRows() };
}
