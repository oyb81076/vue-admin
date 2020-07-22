import Vue from 'vue';
import errorToString from './errorToString';

export interface Load<K, V> {
  // 数据读取的KEY
  key: K;
  // 是否正在下载中
  loading: boolean;
  // 是否有错误
  error: string;
  // data
  data: V | null;
  // 最后一次获得到数据的时间
  lastModified: number;
}
type State<K extends string | number, V> = Partial<Record<K, Load<K, V>>>;
export interface Loader<K, V> {
  // 加载值
  load: (key: K) => Load<K, V>;
  // 重新加载
  reload: (key: K) => void;
  // 设置值
  put: (value: V) => void;
  putAll: (values: V[]) => void;
  // 清空值
  remove: (key: K) => void;
  removeAll: () => void;
}
export default function createBatchLoader<K extends string | number, V>(
  fetchByKeys: (keys: K[]) => Promise<V[]>,
  keyGetter: (data: V) => K,
): Loader<K, V> {
  // 必须要包裹一层, 不然无法跟踪delete事件
  const root = Vue.observable<{ state: State<K, V> }>({ state: {} });
  const future = new Set<K>();
  let timer = 0;
  const fetchArray = () => {
    timer = 0;
    if (future.size === 0) { return; }
    const keys = Array.from(future);
    future.clear();
    fetchByKeys(keys).then((res) => {
      const array = res.map((value) => ({ key: keyGetter(value), value }));
      injectStateValues(root.state, keys, array);
    }, (err) => {
      const error = errorToString(err);
      injectStateError(root.state, keys, error);
    });
  };
  const startTimer = () => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = window.setTimeout(fetchArray, 10);
  };
  const load = (key: K): Load<K, V> => {
    let v = root.state[key] as Load<K, V> | undefined;
    if (!v) {
      future.add(key);
      v = injectStateLoading(root.state, key);
      startTimer();
    }
    return v;
  };
  const reload = (key: K) => {
    if (!future.has(key)) {
      future.add(key);
      startTimer();
      injectStateLoading(root.state, key);
    }
  };
  const removeAll = () => {
    Vue.set(root, 'state', {});
  };
  const put = (value: V) => {
    const key = keyGetter(value);
    future.delete(key);
    injectStateValue(root.state, key, value);
  };
  const putAll = (values: V[]) => {
    const array = values.map((value) => ({ key: keyGetter(value), value }));
    if (future.size) {
      array.forEach(({ key }) => future.delete(key));
    }
    array.forEach(({ key, value }) => injectStateValue(root.state, key, value));
  };
  const remove = (key: K) => {
    if (root.state[key]) {
      Vue.delete(root.state, key);
    }
  };
  return {
    load, reload, put, putAll, remove, removeAll,
  };
}

function injectStateLoading<K extends string | number, V>(state: State<K, V>, key: K): Load<K, V> {
  const value = state[key] as Load<K, V>;
  if (value) {
    value.loading = true;
    return value;
  }
  return set(state, key, {
    key, loading: true, error: '', data: null, lastModified: 0,
  });
}

function injectStateError<K extends string | number, V>(
  state: State<K, V>, keys: K[], error: string,
) {
  const lastModified = Date.now();
  keys.forEach((key) => {
    const value = state[key];
    if (value) {
      value.loading = false;
      value.error = error;
      value.data = null;
      value.lastModified = lastModified;
    } else {
      set(state, key, {
        key, loading: false, error, data: null, lastModified,
      });
    }
  });
}
function injectStateValue<K extends string | number, V>(
  state: State<K, V>,
  key: K,
  data: V,
): Load<K, V> {
  const value = state[key] as Load<K, V>;
  if (value) {
    value.loading = false;
    value.error = '';
    value.data = data;
    value.lastModified = Date.now();
    return value;
  }
  return set(state, key, {
    key, loading: false, error: '', data, lastModified: Date.now(),
  });
}
function injectStateValues<K extends string | number, V>(
  state: State<K, V>,
  keys: K[],
  array: Array<{ key: K; value: V }>,
) {
  if (keys.length === 1 && array.length === 1 && keys[0] === array[0].key) {
    injectStateValue(state, array[0].key, array[0].value);
  } else {
    const undo = new Set(keys);
    const lastModified = Date.now();
    array.forEach(({ key, value: data }) => {
      const value = state[key];
      undo.delete(key);
      if (value) {
        value.loading = false;
        value.error = '';
        value.data = data;
        value.lastModified = lastModified;
      } else {
        set(state, key, {
          key, loading: false, error: '', data, lastModified,
        });
      }
    });
    undo.forEach((key) => {
      const value = state[key];
      if (value) {
        value.loading = false;
        value.error = '';
        value.data = null;
        value.lastModified = lastModified;
      } else {
        set(state, key, {
          key, loading: false, error: '', data: null, lastModified,
        });
      }
    });
  }
}
function set<K extends string | number, V>(
  state: State<K, V>, key: K, value: Load<K, V>,
): Load<K, V> {
  return Vue.set(state, key, value);
}
