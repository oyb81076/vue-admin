import Vue from 'vue';
import { Queries, injectURLQuery } from './urls';
import { getJSON } from './ajax';
/**
 * 每次props修改生成一个新的 loader
 * @example
 * Vue.extends({
 *   props: ['id'],
 *   template: `
 *     <div v-loading="getter.state.loading">
 *       {{getter.state.error}}
 *       {{getter.state.data}}
 *     </div>
 *   `,
 *   computed: {
 *     getter(){ return useGet('/api/example/' + this.id) }
 *   }
 * })
 *
 * 使用唯一的loader
 * @example
 * Vue.extends({
 *   props: ['id'],
 *   template: `
 *     <div v-loading="getter.state.loading">
 *       {{getter.state.error}}
 *       {{getter.state.data}}
 *     </div>
 *   `,
 *   computed: {
 *     getter(){ return useGet() }
 *   },
 *   watch: {
 *     id: {
 *       handler(){ this.getter.request('/api/example/' + this.id) },
 *       immediate: true
 *     }
 *   }
 * })
 */

export interface GetState<T> {
  url: string;
  loading: boolean;
  error: string;
  data: T | null;
}
export interface GetLoader<T> {
  state: GetState<T>;
  request: (url: string, query?: Queries, force?: boolean) => GetState<T>;
  reload: () => GetState<T>;
  destroy: () => void;
}
export default function useGet<T>(defaultUrl?: string, defaultQueries?: Queries): GetLoader<T> {
  const state = Vue.observable<GetState<T>>({
    url: '', loading: false, error: '', data: null,
  });
  const reload = (): GetState<T> => {
    if (!state.url) { return state; }
    const { url } = state;
    state.loading = true;
    state.error = '';
    getJSON<T>(url).then((data) => {
      if (url !== state.url) { return; }
      state.loading = false;
      state.error = '';
      state.data = data;
    }, (err) => {
      if (url !== state.url) { return; }
      state.loading = false;
      state.error = err.message;
      state.data = null;
    });
    return state;
  };
  const request = (url: string, query?: Queries, force?: boolean): GetState<T> => {
    const nextURL = injectURLQuery(url, query);
    if (nextURL === state.url && !force) { return state; }
    state.url = nextURL;
    return reload();
  };
  const destroy = () => {
    state.url = '';
    state.loading = false;
    state.error = '';
    state.data = null;
  };
  if (defaultUrl) {
    request(defaultUrl, defaultQueries);
  }
  return {
    state, request, reload, destroy,
  };
}
