import { Manager, ManagerRole, Page } from '@/models';
import sleep from '@/utils/sleep';

const managers = Array(100)
  .fill(0)
  .map((_, i) => String(i))
  .map((id): Manager => ({
    id,
    name: `name ${id}`,
    role: ManagerRole.MANAGER,
    created: new Date(Math.random() * 100000),
  }));

export async function fetchManager(id: string): Promise<Manager | null> {
  if (!id) { return null; }
  await sleep();
  return managers.find((x) => x.id === id) || null;
}

export async function fetchManagerPage(
  query: { index: number; size: number },
): Promise<Page<Manager>> {
  await sleep(1000);
  return {
    total: managers.length,
    rows: managers.slice(query.index * query.size, (query.index + 1) * query.size),
  };
}

export async function fetchManagers(id: string[]): Promise<Manager[]> {
  await sleep(1000);
  return id.map((s) => managers.find((x) => x.id === s)).filter(Boolean) as Manager[];
}
