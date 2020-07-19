export interface Manager {
  id: string;
  name: string;
  role: ManagerRole;
  created: Date | string;
}
export enum ManagerRole {
  MANAGER = 0,
  ROOT = 1,
}
