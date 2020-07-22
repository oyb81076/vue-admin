import Vue from 'vue';
import { Queries, injectURLQuery } from './urls';
import { getJSON } from './ajax';

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
}
export default function useGetJSON<T>() {
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
  return { state, request, reload };
}
