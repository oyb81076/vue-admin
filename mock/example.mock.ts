import { Request } from 'express';
import { Random } from 'mockjs';
import { Page } from '../src/models';
import { Example, ExampleType } from '../src/models/example';

export default {
  'POST /api/example': ({ body }: Request): Page<Example> => ({ id: Random.integer(), ...body }),
  'POST /api/example/:id': ({ body }: Request): Page<Example> => ({ id: Random.integer(), ...body }),
  'DELETE /api/example/:id': () => 1,
  'PUT /api/example/:id': ({ body }: Request): Page<Example> => body,
  'GET /api/example/:id': ({ params: { id } }: Request): Example => ({
    id,
    type: Random.pick([ExampleType.PUBLIC, ExampleType.PROTECTED, ExampleType.PRIVATE]),
    name: Random.cname(),
    managerId: Random.integer(0, 10).toString(),
    created: new Date(Random.datetime()),
    quantity: Random.integer(0, 100),
    disabled: Random.boolean(),
    price: Random.integer(0, 10000),
  }),
  'GET /api/example size': ({ query: { size, keywords, total } }: Request): Page<Example> => ({
    total: parseInt(String(total), 10) || Random.integer(0, 1000),
    rows: Array(parseInt(String(size || '10'), 10) || 10).fill(0).map(() => ({
      id: Random.integer(10000000, 100000000 - 1).toString(),
      type: Random.pick([ExampleType.PUBLIC, ExampleType.PROTECTED, ExampleType.PRIVATE]),
      name: (keywords || '') + Random.cname(),
      managerId: Random.integer(0, 10).toString(),
      quantity: Random.integer(0, 100),
      created: new Date(Random.datetime()),
      disabled: Random.boolean(),
      price: Random.integer(0, 10000),
    })),
  }),
  'GET /api/example': (): Example[] => Array(20).fill(0).map(() => ({
    id: Random.integer(10000000, 100000000 - 1).toString(),
    type: Random.pick([ExampleType.PUBLIC, ExampleType.PROTECTED, ExampleType.PRIVATE]),
    managerId: Random.integer(0, 10).toString(),
    name: Random.cname(),
    created: new Date(Random.datetime()),
    quantity: Random.integer(0, 100),
    disabled: Random.boolean(),
    price: Random.integer(0, 10000),
  })),
};
