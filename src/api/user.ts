/* eslint-disable import/prefer-default-export */
import { User, Role, Page } from '@/models';
import sleep from '@/utils/sleep';

export async function fetchUser(id: number): Promise<User | null> {
  if (!id) { return null; }
  await sleep();
  return {
    id,
    name: '超级管理员',
    role: Role.ROOT,
  };
}
export async function fetchUserPage(): Promise<Page<User>> {
  await sleep(1000);
  return { total: 0, rows: [] };
}
