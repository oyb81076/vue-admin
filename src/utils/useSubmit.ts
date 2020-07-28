import Vue from 'vue';
import { request } from './ajax';

/**
 * @example
 * Vue.extends({
 *   props: ['id'],
 *   data(){ return { state } }
 *   template: `
 *     <form v-loading="form.state.loading" @submit="handleSubmit">
 *       {{form.state.error}}
 *     </form>
 *   `,
 *   computed: {
 *     form(){ return useSubmit('POST','/api/example') }
 *   },
 *   methods: {
 *     handleSubmit(){
 *       this.form.submit(this.state)
 *         .then(()=> this.$router.back())
 *         .catch(asyncError)
 *     }
 *   }
 * })
 */

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
    if (state.loading) { return Promise.reject(new Error('请勿重复提交')); }
    const tx = Date.now();
    state.tx = tx;
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
  // 防止在 data 中被 ob
  return Object.freeze({ state, submit });
}
