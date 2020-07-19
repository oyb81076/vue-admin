import Vue from 'vue';

interface GetState<T> {
  url: string;
  loading: boolean;
  error: string;
  data: T | null;
}
export default function useGetJSON<T>(defaultURL = '', defaultData: T | null = null) {
  const state = Vue.observable<GetState<T>>({
    url: '', loading: false, error: '', data: defaultData,
  });
  const reload = (): GetState<T> => {
    if (!state.url) { return state; }
    const { url } = state;
    state.loading = true;
    state.error = '';
    setTimeout(() => {
      if (url !== state.url) {
        // abort
        return;
      }
      state.loading = false;
      state.error = `GET ${url} failed at ${new Date()}`;
      state.data = null;
    }, 1000);
    return state;
  };
  const request = (nextURL: string): GetState<T> => {
    if (nextURL === state.url) { return state; }
    state.url = nextURL;
    return reload();
  };
  if (defaultURL) {
    request(defaultURL);
  }
  return {
    state,
    request,
    reload,
  };
}
