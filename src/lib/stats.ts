// Live homepage stats. Fetched on the server and cached for REVALIDATE_SECONDS.

export const REVALIDATE_SECONDS = 300;

const MORPHO_GRAPHQL_URL = 'https://api.morpho.org/graphql';
const DEFILLAMA_FEES_URL =
  'https://api.llama.fi/summary/fees/muscadine?dataType=dailyFees&excludeTotalDataChart=true&excludeTotalDataChartBreakdown=true';
const BASE_CHAIN_ID = 8453;

// Underlying Morpho V2 vaults only. Fee wrappers deposit into these, so adding
// them would count the same assets twice.
const UNDERLYING_VAULTS = [
  '0x89712980Cb434eF5aE4AB29349419eb976B0b496', // USDC Prime
  '0x314fD07319ef645bA7D548915CCd91F4788A1839', // USDC Frontier
  '0xD6DCAd2f7Da91FBb27BdA471540d9770c97a5a43', // WETH Prime
  '0x99dcd0D75822BA398F13B2A8852B07c7e137EC70', // cbBTC Prime
];

export interface HomeStats {
  vaultTvlUsd: number | null;
  yieldGeneratedUsd: number | null;
}

async function fetchVaultTvlUsd(): Promise<number | null> {
  const fields = UNDERLYING_VAULTS.map(
    (address, i) =>
      `v${i}: vaultV2ByAddress(address: "${address}", chainId: ${BASE_CHAIN_ID}) { totalAssetsUsd }`
  ).join('\n');

  try {
    const res = await fetch(MORPHO_GRAPHQL_URL, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ query: `{ ${fields} }` }),
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) return null;
    const json = (await res.json()) as {
      data?: Record<string, { totalAssetsUsd: number | null } | null>;
    };
    if (!json.data) return null;
    const values = Object.values(json.data).map((v) => v?.totalAssetsUsd);
    // A partial sum would understate TVL; show nothing instead.
    if (values.some((v) => typeof v !== 'number')) return null;
    return (values as number[]).reduce((sum, v) => sum + v, 0);
  } catch {
    return null;
  }
}

// DefiLlama "Fees" for Muscadine = total yield generated for vault depositors.
async function fetchYieldGeneratedUsd(): Promise<number | null> {
  try {
    const res = await fetch(DEFILLAMA_FEES_URL, {
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) return null;
    const json = (await res.json()) as { totalAllTime?: number | null };
    return typeof json.totalAllTime === 'number' ? json.totalAllTime : null;
  } catch {
    return null;
  }
}

export async function getHomeStats(): Promise<HomeStats> {
  const [vaultTvlUsd, yieldGeneratedUsd] = await Promise.all([
    fetchVaultTvlUsd(),
    fetchYieldGeneratedUsd(),
  ]);
  return { vaultTvlUsd, yieldGeneratedUsd };
}
