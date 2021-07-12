import { ItemProperties } from "./mvc_layout";
import { RadioButtonUncheckedOutlined, CheckCircleOutline } from '@material-ui/icons';
import { Box, makeStyles, styled } from "@material-ui/core";

export const TODO_CHANGE_STATUS = 'TODO_CHANGE_STATUS';
export type TodoAction = typeof TODO_CHANGE_STATUS;

export const TODO_STATUS_ACTIVE = 'TODO_STATUS_ACTIVE';
export const TODO_STATUS_COMPLETED = 'TODO_STATUS_COMPLETED';
export const TODO_STATUS_DEFAULT = TODO_STATUS_ACTIVE;

export const TodoStatusLists: TodoStatusType[] = [TODO_STATUS_ACTIVE, TODO_STATUS_COMPLETED];

export const TodoStatusComponentMap = {
  TODO_STATUS_ACTIVE: <RadioButtonUncheckedOutlined />,
  TODO_STATUS_COMPLETED: <CheckCircleOutline />,
};

export const TodoStatusTextMap = makeStyles({
  root: {
    flexGrow: 1,
    wordBreak: 'break-all',
    transition: 'all 0.4s',
  },
  [TODO_STATUS_ACTIVE]: {},
  [TODO_STATUS_COMPLETED]: {
    color: '#D9D9D9',
    textDecoration: 'line-through solid #D9D9D9 2px',
    transition: 'all 0.4s',
  },
});

export type TodoStatusType = keyof typeof TodoStatusComponentMap;

export const TodoReducers = (state: ItemProperties, action: TodoAction) => {
  switch (action) {
    case "TODO_CHANGE_STATUS": {
      return {
        ...state,
        status: TodoStatusLists[(TodoStatusLists.findIndex(item => item === state.status) + 1) % TodoStatusLists.length],
      };
    };
    default: return state;
  };
};