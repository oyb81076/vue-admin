import Vue from 'vue';
import type { ElMessageBoxShortcutMethod } from 'element-ui/types/message-box.d';

export async function asyncAlert(message: string, title = '提示'): Promise<void> {
  if (!message) { return; }
  const $alert = Vue.prototype.$alert as ElMessageBoxShortcutMethod;
  await $alert(message, title);
}

export async function asyncError(error: string | Error, title = '错误'): Promise<void> {
  if (!error) { return; }
  const $alert = Vue.prototype.$alert as ElMessageBoxShortcutMethod;
  let message: string;
  if (typeof error === 'string') {
    message = error;
  } else {
    message = error.message;
    console.error(error);
  }
  await $alert(message, title, { type: 'error' });
}

export async function asyncConfirm(content: string, title = '请确认'): Promise<boolean> {
  if (!content) { return true; }
  const fn = Vue.prototype.$confirm as ElMessageBoxShortcutMethod;
  return fn(content, title).then(() => true, () => false);
}
