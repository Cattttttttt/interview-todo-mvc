import Koa from 'koa';
import mongoose from 'mongoose';
import cors from '@koa/cors';
import error from 'koa-json-error';
import logger from 'koa-logger';
import bodyParser from 'koa-bodyparser';

import ServerConfig from './config';
import router from './routers';

const app = new Koa();

app
  .use(cors())
  .use(logger())
  .use(error({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    postFormat: ((_, { stack, ...rest }) => rest),
  }))
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(ServerConfig.server.port, () => {
  mongoose.connect(
    `mongodb://${ServerConfig.database.addr}:${ServerConfig.database.port}/interview-todo-mvc`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    },
  );
  mongoose.connection
    .on('error', console.error.bind(console, 'connection error:'))
    .once('open', () => {
      console.log(`Database connect to mongodb://${ServerConfig.database.addr}:${ServerConfig.database.port}/interview-todo-mvc`);
      console.log(`Server running on localhost:${ServerConfig.server.port}`);
    });
});