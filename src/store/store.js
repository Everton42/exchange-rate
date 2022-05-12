import { configureStore } from '@reduxjs/toolkit';
import { ratesReducer } from './rates';
import { userReducer } from './user';

const reducer = {
  user: userReducer,
  rates: ratesReducer,
};
export const store = configureStore({ reducer });
