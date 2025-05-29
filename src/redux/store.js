import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/slices/authSlice';
import transactionReducer from '../redux/slices/transactionSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    transactions: transactionReducer
  }
});
export default store;