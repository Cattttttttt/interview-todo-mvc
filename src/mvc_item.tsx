import React from 'react';
import { Box, IconButton, InputBase, makeStyles, Paper, Typography } from '@material-ui/core';
import { ClearOutlined } from '@material-ui/icons';
import clsx from 'clsx';
import { TodoStatusComponentMap, TodoStatusTextMap } from './mvc_constants';
import { ItemProps } from './mvc_types';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    width: '30vw',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 0,
  },
  text: {
    flexGrow: 1,
    wordBreak: 'break-all',
    transition: 'all 0.4s',
  },
  textOnCompleted: {
    color: '#D9D9D9',
    textDecoration: 'line-through solid #D9D9D9 2px',
    transition: 'all 0.4s',
  },
  input: {
    borderStyle: 'solid',
    borderWidth: '2px',
    borderColor: '#D9D9D9',
    lineHeight: '1.5rem',
    fontSize: '1.5rem',
  },
});

const Item = (props: ItemProps): JSX.Element => {

  const [edit, setEdit] = React.useState(false);
  const styles = useStyles();
  const statusStyles = TodoStatusTextMap();

  return (
    <Paper 
      elevation={0}
      className={clsx(styles.root)}
    >
      <Box>
        <IconButton
          onClick={props.setStatus(props.id)}
        >
          {TodoStatusComponentMap[props.status]}
        </IconButton>
      </Box>

      <Box
        onDoubleClick={() => {
          props.setContent && setEdit(true);
        }}
        className={clsx(statusStyles.root, statusStyles[props.status])}
      >
        {!edit 
          ? (
            <Typography
              variant="h5"
            >
              {props.content}
            </Typography>
          ) : (
            <InputBase
              autoFocus
              fullWidth
              defaultValue={props.content}
              className={clsx(styles.input)}
              onBlur={(event: React.FocusEvent<HTMLInputElement>) => {
                setEdit(false);
                props.setContent && props.setContent(props.id)(event);
              }}
            />
          )}
      </Box>

      <Box>
        <IconButton
          onClick={props.handleDelete(props.id)}
        >
          <ClearOutlined />
        </IconButton>
      </Box>
    </Paper>
  );
};

export default Item;