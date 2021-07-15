import Koa from 'koa';
import { TodoModel } from './models';
import { asyncFilter, checkToken, createToken } from './utils';
import { v4 as uuid } from 'uuid';
import { AddTodoBody, DeleteTodoBody, UpdateTodoBody } from './types';

export const GetTodoList: Koa.Middleware = async (ctx, next) => {
  const userToken = checkToken(ctx.request.headers.authorization || '');
  const data = await TodoModel.find({
    user: userToken,
  }).lean();
  ctx.body = data;
  ctx.status = 200;
  await next();
};

export const AddTodo: Koa.Middleware = async (ctx, next) => {
  const userToken = checkToken(ctx.request.headers.authorization || '');
  if (userToken) {
    try {
      const saveData = await asyncFilter(
        (ctx.request.body as AddTodoBody).list,
        async item => {
          const cnt = await TodoModel.count({ hashId: item.hashId, user: userToken });
          return cnt === 0;
        },
      )
        .then(data => data.map(item => ({
          ...item,
          user: userToken,
        })));
      await TodoModel.create(saveData);
      ctx.status = 201;
    } catch (e) {
      ctx.status = 500;
    }
  } else {
    ctx.status = 403;
  }
  await next();
};

export const DeleteTodo: Koa.Middleware = async (ctx, next) => {
  const userToken = checkToken(ctx.request.headers.authorization || '');
  if (userToken) {
    try {
      await asyncFilter(
        (ctx.request.body as DeleteTodoBody).list,
        async item => {
          const cnt = await TodoModel.count({ hashId: item.hashId, user: userToken });
          return cnt === 1;
        },
      )
        .then(data => data.map(async item => {
          await TodoModel.deleteOne({ hashId: item.hashId });
        }));
      ctx.status = 201;
    } catch (e) {
      ctx.status = 500;
    }
  } else {
    ctx.status = 403;
  }
  await next();
};

export const UpdateTodo: Koa.Middleware = async (ctx, next) => {
  const userToken = checkToken(ctx.request.headers.authorization || '');
  if (userToken) {
    try {
      await asyncFilter(
        (ctx.request.body as UpdateTodoBody).list,
        async item => {
          const cnt = await TodoModel.count({ hashId: item.hashId, user: userToken });
          return cnt === 1;
        },
      )
        .then(data => data.map(async item => {
          await TodoModel.updateOne(
            { hashId: item.hashId }, 
            {
              ...item,
              user: userToken,
            },
          );
        }));
      ctx.status = 201;
    } catch (e) {
      ctx.status = 500;
    }
  } else {
    ctx.status = 403;
  }
  await next();
};

export const CreateUser: Koa.Middleware = (ctx, next) => {
  ctx.body = createToken(uuid());
  ctx.status = 200;
  return next();
};