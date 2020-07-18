export interface User {
  id: number;
  name: string;
  role: Role;
}
export enum Role {
  MANAGER = 0,
  ROOT = 1,
}
