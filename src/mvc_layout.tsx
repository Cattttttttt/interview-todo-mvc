import React from 'react';

import { v4 as uuid } from 'uuid';
import md5 from 'md5';

import Item from './mvc_item';
import Input from './mvc_input';
import { TodoStatusLabel, TodoStatusLists, TODO_STATUS_DEFAULT } from './mvc_constants';
import { Box, Divider } from '@material-ui/core';
import { useLists } from './mvc_useLists';
import StatusBar from './mvc_status';
import { StatusAction, StatusFilters, TodoFilterType } from './mvc_types';

const Layout = (): JSX.Element => {
  const { data: list, add, changeContent, changeState, deleteItem } = useLists();
  const [filteredList, setFilteredList] = React.useState(list);
  const [curFilter, setCurFilter] = React.useState<TodoFilterType>('All');

  const handleSubmit = React.useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      add({
        content: event.currentTarget.value,
        status: TODO_STATUS_DEFAULT,
        id: md5(uuid() + event.currentTarget.value),
      });
      event.currentTarget.value = '';
    }
  }, [list]);

  const setStatus = React.useCallback((id: string) => {
    return () => {
      changeState(id);
    };
  }, []);

  const setContent = React.useCallback((id: string) => {
    return (event: React.FocusEvent<HTMLInputElement>) => {
      changeContent(id, event.target.value);
    };
  }, []);

  const handleDelete = React.useCallback((id: string) => {
    return () => {
      deleteItem([id]);
    };
  }, []);

  const filters: Partial<StatusFilters> = TodoStatusLists.reduce((pre, cur) => {
    return {
      ...pre,
      [cur]: {
        filter: React.useCallback(() => {
          setCurFilter(cur);
        }, [list]),
        label: TodoStatusLabel[cur],
      },
    };
  }, { 
    All: {
      filter: React.useCallback(() => {
        setCurFilter('All');
      }, [list]),
      label: 'All',
    },
  });

  const actions: StatusAction[] = [
    {
      action: React.useCallback(() => {
        deleteItem(list.reduce<string[]>((pre, cur) => cur.status === 'TODO_STATUS_COMPLETED' ? [...pre, cur.id] : [...pre], ['']));
      }, [list]),
      label: 'Clear completed',
    },
  ];

  React.useEffect(() => {
    switch (curFilter) {
      case 'All': setFilteredList(list);break;
      case 'TODO_STATUS_ACTIVE': setFilteredList(list.filter(item => item.status === 'TODO_STATUS_ACTIVE'));break;
      case 'TODO_STATUS_COMPLETED': setFilteredList(list.filter(item => item.status === 'TODO_STATUS_COMPLETED'));break;
      default: setFilteredList(list);
    }
  }, [curFilter, list]);

  return (
    <Box>
      <Input
        handleSubmit={handleSubmit}
      />
      {filteredList.map((item, index) => (
        <Box
          key={index}
        >
          <Divider />
          <Item 
            content={item.content}
            setContent={setContent}
            status={item.status}
            setStatus={setStatus}
            id={item.id}
            handleDelete={handleDelete}
          />
        </Box>
      ))}
      <Divider />
      {list && <StatusBar 
        curFilter={curFilter}
        itemCount={list.reduce((pre, cur) => pre + (cur.status === TODO_STATUS_DEFAULT ? 1 : 0), 0)}
        filters={filters}
        actions={actions}
      />}
    </Box>
  );
};

export default Layout;