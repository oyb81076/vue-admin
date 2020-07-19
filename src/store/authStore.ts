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
export function login(token: string | null): void {
  if (!token) { return; }
  try {
    const { id, exp, role } = JSON.parse(atob(token.split('.')[1])) as Omit<State, 'token'>;
    if (Date.now() / 1000 < exp) {
      state.id = id;
      state.exp = exp;
      state.role = role;
      state.token = token;
    }
  } catch (e) {
    console.error(e);
  }
}
export function logout() {
  state.id = '';
  state.role = ManagerRole.MANAGER;
  state.token = '';
  state.exp = 0;
  localStorage.removeItem(KEY);
}
login(localStorage.getItem(KEY));
