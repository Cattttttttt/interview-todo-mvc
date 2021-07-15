import { StatusProps, TodoFilterType } from './mvc_types';
import { Box, Button, makeStyles, Paper, Typography } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: '5px',
    paddingRight: '5px',
    borderRadius: 0,
  },
  filters: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  count: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  filter: {
    padding: '2px',
    marginLeft: '1rem',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: '#FFFFFF',
  },
  notCurFilter: {
    '&:hover': {
      borderColor: '#D9D9D9',
      borderRadius: '5px',
    },
  },
  curFilter: {
    borderColor: '#000000',
    borderRadius: '5px',
  },
});

const StatusBar = (props: StatusProps): JSX.Element => {
  const styles = useStyles();

  return (
    <Paper
      elevation={0}
      className={styles.root}
    >

      <Box
        className={styles.count}
      >
        <Typography
          variant="body2"
        >
          {`${props.itemCount} item left`}
        </Typography>
      </Box>

      <Box
        className={styles.filters}
      >
        {(Object.keys(props.filters) as TodoFilterType[]).map((item, index) => {
          return (
            <Box
              onClick={props.filters[item]?.filter}
              key={index}
              className={clsx(styles.filter, props.curFilter === item ? styles.curFilter : styles.notCurFilter)}
            >
              <Typography
                variant="body2"
              >
                {props.filters[item]?.label}
              </Typography>
            </Box>
          );
        })}
      </Box>

      <Box>
        {props.actions.map((item, index) => {
          return (
            <Button
              onClick={item.action}
              key={index}
            >
              <Typography
                variant="body2"
              >
                {item.label}
              </Typography>
            </Button>
          );
        })}
      </Box>
    </Paper>
  );
};

export default StatusBar;