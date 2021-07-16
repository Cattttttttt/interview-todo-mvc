import { STORAGE_LIST, USER_TOKEN } from './mvc_constants';
import { ItemProperties, StorageList } from './mvc_types';
import base64 from 'base-64';

export const getItemList = (): ItemProperties[] => {
  try {
    const tmpObj: StorageList = JSON.parse(base64.decode(localStorage.getItem(STORAGE_LIST) || ''));
    return tmpObj.list || [];
  } catch(e) {
    return [];
  }
};

export const setItemList = (list: ItemProperties[]): void => {
  localStorage.setItem(STORAGE_LIST, base64.encode(JSON.stringify({ list })));
};

export const clearItemList = (): void => {
  localStorage.removeItem(STORAGE_LIST);
};

export const getUserToken = (): string => {
  return localStorage.getItem(USER_TOKEN) || '';
};

export const setUserToken = (token: string): void => {
  localStorage.setItem(USER_TOKEN, token);
};

export const clearUserToken = (): void => {
  localStorage.removeItem(USER_TOKEN);
};

export const checkSync = (): boolean => {
  return !!getUserToken();
};