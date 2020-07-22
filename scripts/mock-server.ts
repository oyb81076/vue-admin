import express from 'express';
import { readdirSync } from 'fs';
import { join } from 'path';

// 延迟
const SLEEP = 1000;

const files = readdirSync(join(__dirname, '../mock'));
const mockTS = files.filter((x) => x.endsWith('.mock.ts'));
const mocks = mockTS.map((x) => require(`../mock/${x}`).default);

const app = express();
app.use((req, res, next) => {
  console.log(req.method);
  next();
});
app.patch('/api/test', (req, res) => { console.log('hit'); res.json({}); });
mocks.forEach((routes: Record<string, Function>) => {
  Object.entries(routes).forEach(([route, handler]) => {
    const [method, path, ...query] = route.split(/\s+/);
    const fn = method.toLocaleLowerCase() as 'post' | 'get' | 'delete' | 'put' | 'patch';
    app[fn](path, (req, res, next) => {
      if (query.some((x) => !(x in req.query))) {
        next();
      } else {
        let result: unknown;
        try {
          result = { data: handler(req) };
        } catch (e) {
          result = { error: true, code: 'UNKNOWN', message: e.message };
        }
        setTimeout(() => {
          res.json(result);
        }, SLEEP);
      }
    });
  });
});

app.use((req, res, next) => {
  if (req.url.includes('.')) {
    next();
  } else {
    res.send({ code: 'URL_NOT_FOUND', message: `URL ${req.url} NOT EXITS` });
  }
});
app.use(express.static(join(__dirname, './public')));
app.listen(4000, () => {
  console.log('server start at 4000');
});
