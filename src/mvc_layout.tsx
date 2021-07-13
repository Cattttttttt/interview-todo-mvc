import React from 'react';

import Item from './mvc_item';
import Input from './mvc_input';
import { TODO_STATUS_DEFAULT } from './mvc_constants'
import { Box, Divider } from '@material-ui/core';
import { useLists } from './mvc_useLists';

const Layout = () => {
  const { data: list, add, changeContent, changeState, deleteItem } = useLists();

  const handleSubmit = React.useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      add({
        content: event.currentTarget.value,
        status: TODO_STATUS_DEFAULT,
        id: list.length ? list[list.length - 1].id + 1 : 0,
      });
      event.currentTarget.value = '';
    }
  }, [list])

  const setStatus = React.useCallback((id: number) => {
    return () => {
      changeState(id);
    };
  }, []);

  const setContent = React.useCallback((id: number) => {
    return (event: React.FocusEvent<HTMLInputElement>) => {
      changeContent(id, event.target.value);
    };
  }, []);

  const handleDelete = React.useCallback((id: number) => {
    return () => {
      deleteItem(id)
    };
  }, []);

  return (
    <Box>
      <Input
        handleSubmit={handleSubmit}
      />
      {list.map((item, index) => (
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
    </Box>
  );
};

export default Layout;