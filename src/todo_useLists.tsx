import { TodoReducers } from './todo_reducers';
import { TODO_CHANGE_STATUS } from './todo_constants';
import { ItemProperties } from './todo_types';
import { getItemList, setItemList } from './todo_utils';
import React from 'react';
import { useFetch } from './todo_useFetch';

export interface IUseLists {
  data: ItemProperties[]
  changeState: (id?: string) => void
  changeContent: (id: string, newContent: string) => void
  add: (item: ItemProperties) => void
  deleteItem: (ids?: string[]) => void
  setData: React.Dispatch<React.SetStateAction<ItemProperties[]>>
}

export type UseLists = Readonly<IUseLists>;

export const useLists = (): UseLists => {

  const [data, setData] = React.useState(getItemList());
  const { addTodo, updateTodo, deleteTodo } = useFetch();

  React.useEffect(() => {
    setItemList(data);
  }, [data]);

  const changeState = React.useCallback((id = '') => {
    setData(data => {
      if (id === '') {
        const nextData = data.map(item => TodoReducers(item, TODO_CHANGE_STATUS));
        updateTodo(nextData);
        return nextData;
      }
      const index = data.findIndex(item => item.hashId === id);
      const changedTodo = TodoReducers(data[index], TODO_CHANGE_STATUS);
      updateTodo([changedTodo]);
      return [
        ...data.slice(0, index),
        changedTodo,
        ...data.slice(index + 1),
      ];
    });
  }, [updateTodo]);

  const changeContent = React.useCallback((id: string, content: string) => {
    setData(data => {
      const index = data.findIndex(item => item.hashId === id);
      updateTodo([{
        ...data[index],
        content,
      }]);
      return [
        ...data.slice(0, index),
        {
          ...data[index],
          content,
        },
        ...data.slice(index + 1),
      ];
    });
  }, [updateTodo]);

  const add = React.useCallback((item: ItemProperties) => {
    setData(data => [
      ...data,
      item,
    ]);
    addTodo([item]);
  }, [addTodo]);

  const deleteItem = React.useCallback((ids: string[] = []) => {
    setData(data => {
      if (ids.length === 0) {
        deleteTodo(data);
        return [];
      }
      deleteTodo(data.filter(item => ids.includes(item.hashId)));
      return data.filter(item => !ids.includes(item.hashId));
    });
  }, [deleteTodo]);

  return {
    data,
    changeState,
    changeContent,
    add,
    deleteItem,
    setData,
  };
};