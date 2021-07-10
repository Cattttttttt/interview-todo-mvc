import React from 'react';
import { Box, Checkbox, IconButton, InputBase, makeStyles, Paper, TextField, Typography } from '@material-ui/core';
import { CheckCircleOutline, ClearOutlined, RadioButtonUncheckedOutlined } from '@material-ui/icons';
import clsx from 'clsx';

export interface IItemProps {
  id: number
  content: string
  setContent?: (id: number) => (event: React.FocusEvent<HTMLInputElement>) => void
  status: boolean
  setStatus: (id: number) => (event: React.ChangeEvent<HTMLInputElement>) => void
  handleDelete: (id: number) => () => void
}

export type ItemProps = Readonly<IItemProps>;

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
    transition: 'all 0.4s'
  },
  textOnCompleted: {
    color: '#D9D9D9',
    textDecoration: 'line-through solid #D9D9D9 2px',
    transition: 'all 0.4s'
  },
  input: {
    borderStyle: 'solid',
    borderWidth: '2px',
    borderColor: '#D9D9D9',
    lineHeight: '1.5rem',
    fontSize: '1.5rem',
  }
})

const Item = (props: ItemProps) => {

  const [edit, setEdit] = React.useState(false);
  const styles = useStyles()

  return (
    <Paper 
      elevation={0}
      className={clsx(styles.root)}
    >
      <Box>
        <Checkbox
          checked={props.status}
          onChange={props.setStatus(props.id)}
          icon={<RadioButtonUncheckedOutlined />}
          checkedIcon={<CheckCircleOutline />}
        />
      </Box>

      <Box
        onDoubleClick={event => {
          props.setContent && setEdit(true);
          event.currentTarget
        }}
        className={clsx(styles.text, props.status && styles.textOnCompleted)}
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