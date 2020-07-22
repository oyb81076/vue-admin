import createBatchLoader from '@/utils/createBatchLoader';
import { Manager } from '@/models';
import { getJSON } from '@/utils/ajax';

async function fetchManagers(keys: string[]): Promise<Manager[]> {
  return getJSON<Manager[]>('/api/manager', { ids: keys.join(',') });
}
const managerLoader = createBatchLoader(fetchManagers, (x) => x.id);
export default managerLoader;
