import Vue from 'vue';
import errorToString from './errorToString';

export interface SingleState<V> {
  tx: number;
  // 是否正在下载中
  loading: boolean;
  // 是否有错误
  error: string;
  // data
  data: V[];
  // 最后一次获得到数据的时间
  lastModified: number;
}
export interface SingleLoader<V> {
  // 加载值
  load: () => SingleState<V>;
  // 重新加载
  reload: () => SingleState<V>;
  // 设置值
  put: (value: V[]) => void;
}
export default function createBatchLoader<V>(fetchData: () => Promise<V[]>): SingleLoader<V> {
  // 必须要包裹一层, 不然无法跟踪delete事件
  const state = Vue.observable<SingleState<V>>({
    tx: 0, loading: false, error: '', data: [], lastModified: 0,
  });
  const reload = (): SingleState<V> => {
    state.tx += 1;
    state.loading = true;
    state.error = '';
    const { tx } = state;
    fetchData().then((data) => {
      if (tx !== state.tx) { return; }
      state.loading = false;
      state.error = '';
      state.lastModified = Date.now();
      state.data = data;
    }, (err) => {
      if (tx !== state.tx) { return; }
      state.loading = false;
      state.error = errorToString(err);
    });
    return state;
  };
  const load = () => {
    if (state.loading) { return state; }
    return reload();
  };
  const put = (data: V[]) => {
    state.tx += 1;
    state.loading = false;
    state.error = '';
    state.lastModified = Date.now();
    state.data = data;
  };
  return { load, reload, put };
}
