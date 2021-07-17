import { ItemProperties } from './todo_types';
import { TodoAction } from './todo_types';
import { TodoStatusLists } from './todo_constants';

export const TodoReducers = (state: ItemProperties, action: TodoAction): ItemProperties => {
  switch (action) {
    case 'TODO_CHANGE_STATUS': {
      return {
        ...state,
        status: TodoStatusLists[(TodoStatusLists.findIndex(item => item === state.status) + 1) % TodoStatusLists.length],
      };
    }
    default: return state;
  }
};