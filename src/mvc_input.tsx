import { Box, InputBase, makeStyles, Paper } from '@material-ui/core';
import clsx from 'clsx';
import { InputProps } from './mvc_types';

const useStyles = makeStyles({
  root: {
    width: '30vw',
    borderRadius: 0,
    lineHeight: '1.5rem',
  },
  inputContainer: {
    paddingLeft: '5px',
    paddingRight: '5px',
  },
  input: {
    fontSize: '1.5rem',
  },
});

const Input = (props: InputProps) => {

  const styles = useStyles();

  return (
    <Paper 
      elevation={0}
      className={clsx(styles.root)}
    >
      <Box
        className={clsx(styles.inputContainer)}
      >
        <InputBase 
          fullWidth
          className={clsx(styles.input)}
          onKeyDown={props.handleSubmit}
        />
      </Box>
    </Paper>
  )
};

export default Input;