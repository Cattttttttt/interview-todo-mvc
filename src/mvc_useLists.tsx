import { TodoReducers } from './mvc_reducers';
import { TODO_CHANGE_STATUS } from './mvc_constants';
import { ItemProperties } from './mvc_types';
import { getItemList, setItemList } from './mvc_utils';
import React from 'react';

export const useLists = () => {

  const [data, setData] = React.useState(getItemList());

  React.useEffect(() => {
    setItemList(data);
  }, [data]);

  const changeState = React.useCallback((id = -1) => {
    setData(data => {
      if (id === -1) {
        return data.map(item => TodoReducers(item, TODO_CHANGE_STATUS));
      }
      const index = data.findIndex(item => item.id === id);
      return [
        ...data.slice(0, index),
        TodoReducers(data[index], TODO_CHANGE_STATUS),
        ...data.slice(index + 1),
      ]
  });
  }, [TodoReducers]);

  const changeContent = React.useCallback((id: number, content: string) => {
    setData(data => {
      const index = data.findIndex(item => item.id === id);
      return [
      ...data.slice(0, index),
      {
        ...data[index],
        content,
      },
      ...data.slice(index + 1),
    ]});
  }, []);

  const add = React.useCallback((item: ItemProperties) => {
    setData(data => [
      ...data,
      item,
    ]);
  }, []);

  const deleteItem = React.useCallback((ids: number[] = []) => {
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
  }
};