import { TodoReducers } from './mvc_reducers';
import { TODO_CHANGE_STATUS } from './mvc_constants';
import { ItemProperties } from './mvc_types';
import { getItemList, setItemList } from './mvc_utils';
import React from 'react';

export interface IUseLists {
  data: ItemProperties[]
  changeState: (id?: string) => void
  changeContent: (id: string, newContent: string) => void
  add: (item: ItemProperties) => void
  deleteItem: (ids?: string[]) => void
}

export type UseLists = Readonly<IUseLists>;

export const useLists = (): UseLists => {

  const [data, setData] = React.useState(getItemList());

  React.useEffect(() => {
    setItemList(data);
  }, [data]);

  const changeState = React.useCallback((id = '') => {
    setData(data => {
      if (id === '') {
        return data.map(item => TodoReducers(item, TODO_CHANGE_STATUS));
      }
      const index = data.findIndex(item => item.id === id);
      return [
        ...data.slice(0, index),
        TodoReducers(data[index], TODO_CHANGE_STATUS),
        ...data.slice(index + 1),
      ];
    });
  }, [TodoReducers]);

  const changeContent = React.useCallback((id: string, content: string) => {
    setData(data => {
      const index = data.findIndex(item => item.id === id);
      return [
        ...data.slice(0, index),
        {
          ...data[index],
          content,
        },
        ...data.slice(index + 1),
      ];
    });
  }, []);

  const add = React.useCallback((item: ItemProperties) => {
    setData(data => [
      ...data,
      item,
    ]);
  }, []);

  const deleteItem = React.useCallback((ids: string[] = []) => {
    setData(data => {
      if (ids.length === 0) return [];
      return data.filter(item => !ids.includes(item.id));
    });
  }, []);

  return {
    data,
    changeState,
    changeContent,
    add,
    deleteItem,
  };
};