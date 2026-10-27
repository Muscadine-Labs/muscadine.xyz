import type { Metadata } from 'next';
import AppPage from '@/src/components/AppPage';
import { getAppVaults } from '@/src/lib/vaults';

export const metadata: Metadata = {
  title: 'Vaults · Muscadine Labs',
  description:
    'Non-custodial Morpho vaults on Base, with deposits, collateral exposure, APY, and how curation works.',
};

export default async function App() {
  const data = await getAppVaults();
  return <AppPage data={data} />;
}
