import { TodoReducers, TODO_CHANGE_STATUS } from './mvc_reducers';
import { ItemProperties } from './mvc_layout';
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
      return [
        ...data.slice(0, id),
        TodoReducers(data[id], TODO_CHANGE_STATUS),
        ...data.slice(id + 1),
      ]
  });
  }, [TodoReducers]);

  const changeContent = React.useCallback((id: number, content: string) => {
    setData(data => [
      ...data.slice(0, id),
      {
        ...data[id],
        content,
      },
      ...data.slice(id + 1),
    ]);
  }, []);

  const add = React.useCallback((item: ItemProperties) => {
    setData(data => [
      ...data,
      item,
    ]);
  }, []);

  const deleteItem = React.useCallback((id = -1) => {
    setData(data => {
      if (id === -1) return [];
      const target = data.findIndex(item => item.id === id);
      return [
        ...data.slice(0, target),
        ...data.slice(target + 1),
      ]
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