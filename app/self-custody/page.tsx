import type { Metadata } from 'next';
import SelfCustodyPage from '@/src/components/SelfCustodyPage';

export const metadata: Metadata = {
  description:
    'How to hold your own Bitcoin and crypto: kinds of wallets, seed backups, everyday habits, and tools for Bitcoin and DeFi.',
};

export default function SelfCustody() {
  return <SelfCustodyPage />;
}
