import { Role } from '@/models';

interface State {
  id: number;
  role: Role;
  token: string;
  exp: number;
}

const KEY = `${process.env.NODE_ENV}_token`;
function empty(): State {
  return {
    id: 0, role: Role.MANAGER, token: '', exp: 0,
  };
}
function parseToken(token: string): State {
  try {
    const value = JSON.parse(atob(token.split('.')[1])) as Omit<State, 'token'>;
    if (Date.now() / 1000 >= value.exp) {
      return empty();
    }
    return { ...value, token };
  } catch (e) {
    console.error(e);
    return empty();
  }
}
export function getAuth(): State {
  const token = localStorage.getItem(KEY);
  if (!token) {
    return empty();
  }
  return parseToken(token);
}
export function removeAuth(): State {
  localStorage.removeItem(KEY);
  return empty();
}

export function createAuth(token: string) {
  if (!token) { return removeAuth(); }
  localStorage.setItem(KEY, token);
  return parseToken(token);
}
