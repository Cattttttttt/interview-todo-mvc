import * as jwt from 'jsonwebtoken';

import ServerConfig from './config';
import { AsyncFilter } from './types';

export const getToken = (header: string): string => {
  return header.split(' ')[1];
};

export const createToken = (payload: string): string  => {
  return jwt.sign(payload, ServerConfig.token.secret);
};

export const checkToken = (token: string): string => {
  try {
    return jwt.verify(getToken(token), ServerConfig.token.secret) as string;
  } catch (e) {
    return '';
  }
};

export const asyncFilter: AsyncFilter = async (values, fn) => {
  const promises = values.map(fn);
  const booleans = await Promise.all(promises);
  return values.filter((_, i) => booleans[i]);
};