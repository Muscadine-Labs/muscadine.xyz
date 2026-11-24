import type { Metadata } from 'next';
import AppPage from '@/src/components/AppPage';

export const metadata: Metadata = {
  description:
    'Non-custodial Morpho vaults on Base, set up for our own funds. Deposit access may be restricted; yields are not guaranteed.',
};

export default function App() {
  return <AppPage />;
}
