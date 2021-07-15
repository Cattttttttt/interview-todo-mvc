import Layout from './mvc_layout';
import { Box, makeStyles } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D9D9D9',
    height: '100vh',
  },
});

const App = (): JSX.Element => {
  const styles = useStyles();

  return (
    <Box
      className={clsx(styles.root)}
    >
      <Layout />
    </Box>
  );
};

export default App;