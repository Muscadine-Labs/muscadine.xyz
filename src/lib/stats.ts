import { BASE_CHAIN_ID, REVALIDATE_SECONDS, underlyingVaultAddresses } from '@/src/lib/vaults';

// Live homepage stats. Fetched on the server and cached for REVALIDATE_SECONDS.

export { REVALIDATE_SECONDS };

const MORPHO_GRAPHQL_URL = 'https://api.morpho.org/graphql';

export interface HomeStats {
  vaultTvlUsd: number | null;
}

async function fetchVaultTvlUsd(): Promise<number | null> {
  const fields = underlyingVaultAddresses.map(
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

export async function getHomeStats(): Promise<HomeStats> {
  const vaultTvlUsd = await fetchVaultTvlUsd();
  return { vaultTvlUsd };
}
