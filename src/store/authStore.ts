import { ManagerRole } from '@/models';
import Vue from 'vue';

interface State {
  id: string;
  role: ManagerRole;
  token: string;
  exp: number;
}

const KEY = `${process.env.NODE_ENV}_token`;
export const state = Vue.observable<State>({
  id: '',
  role: ManagerRole.MANAGER,
  token: '',
  exp: 0,
});
export function login(token: string): void {
  if (!token) { return; }
  setState(token);
  localStorage.setItem(KEY, token);
}
export function logout() {
  state.id = '';
  state.role = ManagerRole.MANAGER;
  state.token = '';
  state.exp = 0;
  localStorage.removeItem(KEY);
}

try {
  setState(localStorage.getItem(KEY));
} catch (e) {
  console.error(e);
}

function setState(token: string | null) {
  if (!token) { return; }
  const { id, exp, role } = JSON.parse(atob(token.split('.')[1])) as Omit<State, 'token'>;
  if (Date.now() / 1000 < exp) {
    state.id = id;
    state.exp = exp;
    state.role = role;
    state.token = token;
  }
}
