import { RadioButtonUncheckedOutlined, CheckCircleOutline } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core';
import { TodoStatusType } from './mvc_types';

export const STORAGE_LIST = 'STORAGE_LIST';

export const TODO_CHANGE_STATUS = 'TODO_CHANGE_STATUS';

export const TODO_STATUS_ACTIVE = 'TODO_STATUS_ACTIVE';
export const TODO_STATUS_COMPLETED = 'TODO_STATUS_COMPLETED';
export const TODO_STATUS_DEFAULT = TODO_STATUS_ACTIVE;

export const TodoStatusLists: TodoStatusType[] = [TODO_STATUS_ACTIVE, TODO_STATUS_COMPLETED];
export const TodoStatusLabel = {
  TODO_STATUS_ACTIVE: 'Active',
  TODO_STATUS_COMPLETED: 'Completed',
};

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