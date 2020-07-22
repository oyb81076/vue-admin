import { Manager } from '@/models';
import createSingleLoader from '@/utils/createSingleLoader';
import { getJSON } from '@/utils/ajax';
import managerLoader from './managerLoader';

async function fetchManagers(): Promise<Manager[]> {
  const managers = await getJSON<Manager[]>('/api/manager');
  managerLoader.putAll(managers);
  return managers;
}
const managersLoader = createSingleLoader(fetchManagers);
export default managersLoader;
