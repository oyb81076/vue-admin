import { Request } from 'express';
import { Random } from 'mockjs';
import { Page } from '../src/models';

interface Example {
  id: string;
  name: string;
  managerId: string;
  created: Date;
}

export default {
  'POST /api/example': ({ body }: Request): Page<Example> => ({ id: Random.integer(), ...body }),
  'POST /api/example/:id': ({ body }: Request): Page<Example> => ({ id: Random.integer(), ...body }),
  'DELETE /api/example/:id': () => 1,
  'PUT /api/example/:id': ({ body }: Request): Page<Example> => body,
  'GET /api/example/:id': ({ params: { id } }: Request): Example => ({
    id,
    name: Random.cname(),
    managerId: Random.integer(0, 10).toString(),
    created: new Date(Random.datetime()),
  }),
  'GET /api/example size': ({ query: { size, keywords, total } }: Request): Page<Example> => ({
    total: parseInt(String(total), 10) || Random.integer(0, 1000),
    rows: Array(parseInt(String(size || '10'), 10) || 10).fill(0).map(() => ({
      id: Random.integer(10000000, 100000000 - 1).toString(),
      name: (keywords || '') + Random.cname(),
      managerId: Random.integer(0, 10).toString(),
      created: new Date(Random.datetime()),
    })),
  }),
  'GET /api/example': (): Example[] => Array(20).fill(0).map(() => ({
    id: Random.integer(10000000, 100000000 - 1).toString(),
    managerId: Random.integer(0, 10).toString(),
    name: Random.cname(),
    created: new Date(Random.datetime()),
  })),
};
