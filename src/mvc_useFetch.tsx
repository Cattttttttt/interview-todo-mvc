import axios from 'axios';
import React from 'react';
import { ItemProperties } from './mvc_types';
import { checkSync, getUserToken } from './mvc_utils';

export const AxiosConfig = {
  baseURL: 'http://localhost:6000',
  timeout: 3000,
};

export const _axios = axios.create(AxiosConfig);

_axios.interceptors.request.use(config => {
  config.headers.common['authorization'] = `Bearer ${getUserToken()}`;
  return config;
}, err => {
  Promise.reject(err);
});

export interface IUserFetch {
  loading: boolean
  addTodo: (todos: ItemProperties[]) => void
  getTodo: () => Promise<ItemProperties[]>
  updateTodo: (todos: ItemProperties[]) => void
  deleteTodo: (todos: ItemProperties[]) => void
  createUser: () => Promise<string>
}

export type UserFetch = Readonly<IUserFetch>;

export const useFetch = (): UserFetch => {

  const [loading, setLoading] = React.useState(false);

  const addTodo = async (todos: ItemProperties[]) => {
    if (!checkSync()) return;
    setLoading(true);
    try {
      await _axios.post('/', {
        list: todos,
      });
      setLoading(false);
    } catch (e) {

      setLoading(false);
    }
  };

  const getTodo = React.useCallback(async (): Promise<ItemProperties[]> => {
    if (!checkSync()) return [];
    setLoading(true);
    try {
      const { data } = await _axios.get<(ItemProperties & { _id: string })[]>('/');
      setLoading(false);
      return data.map(item => ({
        content: item.content,
        status: item.status,
        hashId: item.hashId,
        updatedAt: item.updatedAt,
      }));
    } catch (e) {

      setLoading(false);
      return [];
    }
  }, []);

  const updateTodo = React.useCallback(async (todos: ItemProperties[]) => {
    if (!checkSync()) return;
    setLoading(true);
    try {
      await _axios.put('/', {
        list: todos,
      });
      setLoading(false);
    } catch (e) {

      setLoading(false);
    }
  }, []);

  const deleteTodo = React.useCallback(async (todos: ItemProperties[]) => {
    if (!checkSync()) return;
    setLoading(true);
    try {
      await _axios.put('/delete', {
        list: todos,
      });
      
      setLoading(false);
    } catch (e) {
      
      setLoading(false);
    }   
  }, []);

  const createUser = React.useCallback(async (): Promise<string> => {
    setLoading(true);
    try {
      const { data } = await _axios.get<string>('/user');
      setLoading(false);
      return data;
    } catch (e) {
      
      setLoading(false);
      return '';
    }
  }, []);

  return {
    loading,
    addTodo,
    getTodo,
    updateTodo,
    deleteTodo,
    createUser,
  };
};