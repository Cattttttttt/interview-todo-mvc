import React from 'react';
import { Box, CircularProgress, IconButton, InputBase, makeStyles, Paper } from '@material-ui/core';
import { clearUserToken, getUserToken, setUserToken } from './todo_utils';
import { useFetch } from './todo_useFetch';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { SyncDisabledOutlined, SyncOutlined } from '@material-ui/icons';
import { ItemProperties } from './todo_types';
import clsx from 'clsx';

export interface ISyncBarProps {
  data: ItemProperties[]
  setData: React.Dispatch<React.SetStateAction<ItemProperties[]>>
  sync: boolean
  setSync: React.Dispatch<React.SetStateAction<boolean>>
}

export type SyncBarProps = Readonly<ISyncBarProps>;

const useStyles = makeStyles({
  root: {
    borderRadius: 0,
  },
  form: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    flexGrow: 1,
    padding: '5px',
  },
  icon: {

  },
});

const SyncBar = (props: SyncBarProps): JSX.Element => {

  const styles = useStyles();

  const { handleSubmit, reset, control } = useForm<{
    userToken: string
  }>({
    defaultValues: {
      userToken: getUserToken(),
    },
  });
  const { loading, getTodo, createUser, updateTodo, addTodo } = useFetch();

  const onSubmit: SubmitHandler<{ userToken: string }> = async formData => {
    if (props.sync) {
      props.setData([]);
      reset({
        userToken: '',
      });
      props.setSync(false);
      clearUserToken();
      return;
    }
    if (!formData.userToken) {
      formData.userToken = await createUser();
      reset({
        userToken: formData.userToken,
      });
    }
    props.setSync(true);
    setUserToken(formData.userToken);
    const serverData = await getTodo();
    const newData = [...props.data, ...serverData]
      .sort((a, b) => b.updatedAt - a.updatedAt)
      .filter((item, index, arr) => arr.findIndex(value => value.hashId === item.hashId) === index)
      .sort((a, b) => a.updatedAt - b.updatedAt);
    props.setData(newData);

    updateTodo(newData.filter(
      item => props.data.findIndex(v => v.hashId === item.hashId) !== -1 && serverData.findIndex(v => v.hashId === item.hashId) !== -1,
    ));
    addTodo(newData.filter(
      item => props.data.findIndex(v => v.hashId === item.hashId) !== -1 && serverData.findIndex(v => v.hashId === item.hashId) === -1,
    ));
  };


  return (
    <Paper
      elevation={0}
      className={clsx(styles.root)}
    >

      <form
        noValidate
        autoComplete='off'
        onSubmit={handleSubmit(onSubmit)}
        className={clsx(styles.form)}
      >
        <Box
          className={clsx(styles.input)}
        >
          <Controller
            name='userToken'
            control={control}
            defaultValue={getUserToken()}
            render={({ field }) => <InputBase fullWidth {...field} />}
          />
        </Box>

        <Box
          className={clsx(styles.icon)}
        >
          <IconButton
            type='submit'
          >
            {loading 
              ? <CircularProgress size='24px' />
              : (props.sync
                ? <SyncDisabledOutlined />
                : <SyncOutlined />)}
          </IconButton>
        </Box>
      </form>

    </Paper>
  );
};

export default SyncBar;