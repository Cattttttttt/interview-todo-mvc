import Router from 'koa-router';
import { AddTodo, CreateUser, DeleteTodo, GetTodoList, UpdateTodo } from './controllers';

const router = new Router();

router
  .get('/', GetTodoList)
  .post('/', AddTodo)
  .put('/', UpdateTodo)
  .put('/delete', DeleteTodo)
  .get('/user', CreateUser);

export default router;    