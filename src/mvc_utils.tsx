import { STORAGE_LIST } from './mvc_constants';
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

export const setItemList = (list: ItemProperties[]) => {
  localStorage.setItem(STORAGE_LIST, base64.encode(JSON.stringify({ list })));
};