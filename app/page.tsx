import MuscadineHome from '@/src/components/MuscadineHome';
import { getHomeStats } from '@/src/lib/stats';

export const revalidate = 300;

export default async function Home() {
  const stats = await getHomeStats();
  return <MuscadineHome stats={stats} />;
}
