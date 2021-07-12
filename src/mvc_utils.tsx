import { STORAGE_LIST } from './mvc_constants';
import { ItemProperties } from './mvc_layout';
import base64 from 'base-64';

export interface IStorageList {
  list?: ItemProperties[]
};

export type StorageList = IStorageList;

export const getItemList = (): ItemProperties[] => {
  try {
    const tmpObj: IStorageList = JSON.parse(base64.decode(localStorage.getItem(STORAGE_LIST) || ''));
    return tmpObj.list || [];
  } catch(e) {
    return [];
  }
};

export const setItemList = (list: ItemProperties[]) => {
  localStorage.setItem(STORAGE_LIST, base64.encode(JSON.stringify({ list })));
};