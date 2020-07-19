import Vue from 'vue';
import managerLoader from '@/store/managerLoader';
/**
 * @example
 *  <manager-name :id="agent.managerId" />
 */
export default Vue.extend({
  name: 'ManagerName',
  props: {
    id: String,
  },
  render(h) {
    const { id } = this;
    if (!id || id === '0') { return h('span', '-'); }
    const load = managerLoader.load(id);
    if (load.loading) { return h('span', 'Loading...'); }
    if (load.error) { return h('span', load.error); }
    if (load.data) { return h('span', load.data.name); }
    return h('span', '用户不存在');
  },
});
