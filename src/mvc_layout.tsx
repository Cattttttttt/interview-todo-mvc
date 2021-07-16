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
import SyncBar from './mvc_sync';
import { getUserToken } from './mvc_utils';

const Layout = (): JSX.Element => {
  const { data: list, add, changeContent, changeState, deleteItem, setData } = useLists();
  const [sync, setSync] = React.useState(!!getUserToken());
  const [filteredList, setFilteredList] = React.useState(list);
  const [curFilter, setCurFilter] = React.useState<TodoFilterType>('All');

  const handleSubmit = React.useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      add({
        content: event.currentTarget.value,
        status: TODO_STATUS_DEFAULT,
        hashId: md5(uuid()),
        updatedAt: Date.now(),
      });
      event.currentTarget.value = '';
    }
  }, [add]);

  const setStatus = React.useCallback((id: string) => {
    return () => {
      changeState(id);
    };
  }, [changeState]);

  const setContent = React.useCallback((id: string) => {
    return (event: React.FocusEvent<HTMLInputElement>) => {
      changeContent(id, event.target.value);
    };
  }, [changeContent]);

  const handleDelete = React.useCallback((id: string) => {
    return () => {
      deleteItem([id]);
    };
  }, [deleteItem]);

  const filters: Partial<StatusFilters> = TodoStatusLists.reduce((pre, cur) => {
    return {
      ...pre,
      [cur]: {
        filter: () => {
          setCurFilter(cur);
        },
        label: TodoStatusLabel[cur],
      },
    };
  }, { 
    All: {
      filter: () => {
        setCurFilter('All');
      },
      label: 'All',
    },
  });

  const actions: StatusAction[] = [
    {
      action: () => {
        deleteItem(list.reduce<string[]>((pre, cur) => cur.status === 'TODO_STATUS_COMPLETED' ? [...pre, cur.hashId] : [...pre], ['']));
      },
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
            id={item.hashId}
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
      <Divider />
      <SyncBar
        data={list}
        setData={setData}
        sync={sync}
        setSync={setSync}
      />
    </Box>
  );
};

export default Layout;