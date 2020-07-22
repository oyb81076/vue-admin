/* eslint-disable @typescript-eslint/no-explicit-any */
import Vue, { ComponentOptions } from 'vue';
import useGetJSON from '@/utils/useGetJSON';
import { Page } from '@/models';
import instance from '@/utils/instance';
import { PageState } from './types';

const DEFAULT_SIZE = 10;
// eslint-disable-next-line import/prefer-default-export
export const pageMixin: ComponentOptions<Vue> = {
  beforeCreate() {
    const options = this.$options;
    if (!options.page) { return; }
    if (!options.computed) { options.computed = {}; }
    if (options.computed.$page) { return; }
    const opts = options.page;
    const loader = useGetJSON<Page<unknown>>();
    const reload = instance<() => void>();
    options.computed.$page = function $page(this: Vue): PageState {
      const { state } = loader;
      let total = state.data && state.data.total;
      const rows = state.data && state.data.rows;
      const size = valueOf(this.$route.query.size, opts.defaultSize || DEFAULT_SIZE);
      const index = valueOf(this.$route.query.index, 0);
      if (!this.$route.query.total && state.loading) {
        // 新的query查询会去掉total缓存
        total = null;
      }
      return {
        loader,
        loading: state.loading,
        error: state.error,
        total,
        rows,
        size,
        current: index + 1,
        reload: reload.instanceOf(() => pageReload.bind(this)),
      };
    };
  },
  watch: {
    '$route.query': {
      handler(this: Vue, qs) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const { query, url } = this.$options.page!;
        const queries = {
          size: this.$page.size,
          index: this.$page.current - 1,
          total: qs.total,
          ...(query ? query.call(this, qs) : qs),
        };
        this.$page.loader.request(url, queries);
      },
      immediate: true,
    },
  },
};
function valueOf(v: unknown, defaultValue: number) {
  if (v === undefined) { return defaultValue; }
  if (typeof v === 'number') { return v; }
  const single = Array.isArray(v) ? v[0] : v;
  const val = parseInt(single, 10);
  return Number.isNaN(val) ? defaultValue : val;
}
function pageReload(this: Vue) {
  const opts = this.$options.page;
  if (!opts) { throw new Error('page options not defined'); }
  const { url, query, defaultSize } = opts;
  const { $route } = this;
  const qs = $route.query;
  const size = valueOf($route.query.size, defaultSize || DEFAULT_SIZE);
  const index = valueOf($route.query.index, 0);
  const queries = {
    size,
    index,
    ...(query ? query.call(this, qs) : qs),
    total: null,
  };
  this.$page.loader.request(url, queries, true);
}
