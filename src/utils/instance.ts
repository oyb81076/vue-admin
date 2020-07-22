export default function instance<T>() {
  let out: T;
  let init = false;
  return {
    instanceOf: (getter: () => T): T => {
      if (!init) {
        out = getter();
        init = true;
        return out;
      }
      return out;
    },
  };
}
