import Vue from 'vue';
import { request } from './ajax';

export interface GetState<T> {
  tx: number;
  loading: boolean;
  error: string;
  data: T | null;
}
export interface SubmitLoader<Req, Res> {
  state: GetState<Res>;
  submit: (
    payload?: Req,
  ) => Promise<Res>;
}
export default function useSubmit<Req = unknown, Res = Req>(
  method: 'put' | 'post' | 'delete', url: string, credentials = true,
): SubmitLoader<Req, Res> {
  const state = Vue.observable<GetState<Res>>({
    tx: 0, loading: false, error: '', data: null,
  });
  const submit = (payload?: Req): Promise<Res> => {
    state.tx += 1;
    const { tx } = state;
    state.loading = true;
    state.error = '';
    return new Promise((r, j) => {
      request<Res>(method, url, payload, credentials).then((data) => {
        if (tx !== state.tx) { return; }
        state.loading = false;
        state.error = '';
        state.data = data;
        r(data);
      }, (err) => {
        if (tx !== state.tx) { return; }
        state.loading = false;
        state.error = err.message;
        state.data = null;
        j(err);
      });
    });
  };
  return { state, submit };
}
