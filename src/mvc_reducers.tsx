import { ItemProperties } from './mvc_types';
import { TodoAction } from './mvc_types';
import { TodoStatusLists } from './mvc_constants';

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