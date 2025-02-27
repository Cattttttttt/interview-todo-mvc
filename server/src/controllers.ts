import Koa from 'koa';
import { TodoModel } from './models';
import { asyncFilter, checkToken, createToken } from './utils';
import { v4 as uuid } from 'uuid';
import Joi from 'joi';
import { AddTodoBody, DeleteTodoBody, ItemProperties, TodoStatus, UpdateTodoBody } from './types';

export const listPropertiesSchema = Joi.object<ItemProperties, false, ItemProperties>({
  hashId: Joi.string().required(),
  content: Joi.string().required(),
  status: Joi.string().valid(...TodoStatus).required(),
  updatedAt: Joi.number().required(),
});

export const requestBodySchema = Joi.object({
  list: Joi.array().items(listPropertiesSchema),
});

export const GetTodoList: Koa.Middleware = async (ctx, next) => {
  const userToken = checkToken(ctx.request.headers.authorization || '');
  const data = await TodoModel.find({
    user: userToken,
  }).select({ hashId: 1, content: 1, status: 1, updatedAt: 1 }).lean();
  ctx.body = data;
  ctx.status = 200;
  await next();
};

export const AddTodo: Koa.Middleware = async (ctx, next) => {
  const userToken = checkToken(ctx.request.headers.authorization || '');
  const res = requestBodySchema.validate(ctx.request.body);
  if (res.error) {
    ctx.body = res.error.message;
    ctx.status = 400;
  } else if (userToken) {
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
  const res = requestBodySchema.validate(ctx.request.body);
  if (res.error) {
    ctx.body = res.error.message;
    ctx.status = 400;
  } else if (userToken) {
    try {
      await asyncFilter(
        (ctx.request.body as DeleteTodoBody).list,
        async item => {
          const cnt = await TodoModel.count({ hashId: item.hashId, user: userToken });
          return cnt === 1;
        },
      )
        .then(data => data.map(async item => {
          await TodoModel.deleteOne({ hashId: item.hashId, user: userToken });
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
  const res = requestBodySchema.validate(ctx.request.body);
  if (res.error) {
    ctx.body = res.error.message;
    ctx.status = 400;
  } else if (userToken) {
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
            { hashId: item.hashId, user: userToken }, 
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