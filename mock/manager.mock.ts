import { Request } from 'express';
import { Random } from 'mockjs';
import { Manager, ManagerRole, Page } from '../src/models';
import { randomError } from './utils';

export default {
  'GET /api/manager/:id': ({ params: { id } }: Request): Manager => ({
    id,
    role: Random.pick([ManagerRole.MANAGER, ManagerRole.ROOT]),
    name: Random.cname(),
    created: Random.date(),
  }),
  'GET /api/manager ids': ({ query: { ids } }: Request): Manager[] => {
    if (typeof ids !== 'string') {
      throw new Error('query ids should be string');
    }
    return ids.split(',').filter(Boolean).map((id) => ({
      id,
      role: Random.pick([ManagerRole.MANAGER, ManagerRole.ROOT]),
      name: Random.cname(),
      created: Random.date(),
    }));
  },
  'GET /api/manager size': ({ query: { size, keywords, total } }: Request): Page<Manager> => {
    randomError();
    return {
      total: parseInt(String(total), 10) || 1000,
      rows: Array(parseInt(String(size), 10) || 10).fill(0).map(() => ({
        id: Random.integer(10000000).toString(),
        role: Random.pick([ManagerRole.MANAGER, ManagerRole.ROOT]),
        name: String(keywords || '') + Random.cname(),
        created: new Date(Random.datetime()),
      })),
    };
  },
  'GET /api/manager': (): Manager[] => Array(10).fill(0).map(() => ({
    id: Random.integer(10000000).toString(),
    role: Random.pick([ManagerRole.MANAGER, ManagerRole.ROOT]),
    name: Random.cname(),
    created: new Date(Random.datetime()),
  })),
};
