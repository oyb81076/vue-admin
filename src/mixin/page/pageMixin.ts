/* eslint-disable vue/no-reserved-keys */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Vue, { ComponentOptions } from 'vue';
import useGet, { GetLoader } from '@/utils/useGet';
import { Page } from '@/models';
import { Queries } from '@/utils/urls';
import { PageState } from './types';

// 注意这个写法多个页面是, 前后页, 可能会公用一个 loader 的
interface Data {
  _url: string;
  _defaultSize: number;
  _loader: GetLoader<Page<unknown>>;
  _reload: () => void;
  _query?: (this: Vue, queries: Record<string, string | (string | null)[]>) => Queries;
}
// eslint-disable-next-line import/prefer-default-export
export const pageMixin: ComponentOptions<Vue> = {
  data(): Data {
    const options = this.$options.page;
    return Object.freeze({
      _loader: useGet<Page<unknown>>(),
      _reload: reload.bind(this),
      _url: options?.url || '',
      _defaultSize: options?.defaultSize || 10,
      _query: options?.query,
    });
  },
  computed: {
    $page(this: Vue & Data): PageState {
      const { _loader, _defaultSize, _reload } = this.$data as Data;
      const { query } = this.$route;
      const { data, loading, error } = _loader.state;
      const total = !data || (!query.total && loading) ? null : data.total;
      const rows = data && data.rows;
      const size = valueOf(query.size, _defaultSize);
      const index = valueOf(query.index, 0);
      return {
        loading,
        error,
        total,
        rows,
        size,
        current: index + 1,
        reload: _reload,
      };
    },
  },
  watch: {
    '$route.query': {
      handler(this: Vue, qs) {
        const { _url, _loader, _query } = this.$data as Data;
        if (!_url) { return; }
        const queries = {
          size: this.$page.size,
          index: this.$page.current - 1,
          total: qs.total,
          ...(_query ? _query.call(this, qs) : qs),
        };
        _loader.request(_url, queries);
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
const reload = function pageReload(this: Vue) {
  const {
    _url, _query, _defaultSize, _loader,
  } = this.$data as Data;
  if (!_url) { return; }
  const { $route } = this;
  const qs = $route.query;
  const size = valueOf($route.query.size, _defaultSize);
  const index = valueOf($route.query.index, 0);
  const queries = {
    size,
    index,
    ...(_query ? _query.call(this, qs) : qs),
    total: null,
  };
  _loader.request(_url, queries, true);
};
