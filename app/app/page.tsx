import type { Metadata } from 'next';
import AppPage from '@/src/components/AppPage';
import { getAppVaults } from '@/src/lib/vaults';

export const metadata: Metadata = {
  description:
    'Non-custodial Morpho vaults on Base: deposits, APY, and how the vaults work.',
};

export default async function App() {
  const data = await getAppVaults();
  return <AppPage data={data} />;
}
