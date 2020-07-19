import createBatchLoader from '@/utils/createBatchLoader';
import { fetchManagers } from '@/api';

const managerLoader = createBatchLoader(fetchManagers, (x) => x.id);
export default managerLoader;
