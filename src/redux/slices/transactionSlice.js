// frontend/src/redux/slices/transactionSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { refreshAccessToken } from './authSlice'; // To handle token expiry

const BACKEND_URL = 'https://finace-server.vercel.app'; // NOT `/api`

// Axios instance with interceptors for JWT
const axiosInstance = axios.create({
    baseURL: BACKEND_URL,
});

// Request interceptor to attach JWT token
axiosInstance.interceptors.request.use(
    (config) => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.accessToken) {
            config.headers['Authorization'] = `Bearer ${user.accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor to handle token expiry and refresh
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        // If the error is 401 (Unauthorized) and it's not a refresh token request
        if (error.response.status === 401 && !originalRequest._retry && error.response.data.message === 'Token expired, please refresh token or re-login.') {
            originalRequest._retry = true; // Mark as retried
            try {
                const store = window.reduxStore; // Access the store, assuming it's available globally or passed
                if (store) {
                    const result = await store.dispatch(refreshAccessToken());
                    if (result.meta.requestStatus === 'fulfilled') {
                        // New access token obtained, retry original request
                        const newAccessToken = result.payload;
                        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                        return axiosInstance(originalRequest);
                    }
                }
            } catch (refreshError) {
                // If refresh fails, redirect to login (handled by authSlice)
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);


// Async Thunks
export const fetchTransactions = createAsyncThunk(
    'transactions/fetchTransactions',
    async (filters = {}, thunkAPI) => {
        try {
            const { search, type, category, startDate, endDate, page, limit } = filters;
            // Create a new URLSearchParams object to handle undefined/null filters cleanly
            const queryParams = new URLSearchParams();
            if (search) queryParams.append('search', search);
            if (type && type !== 'All') queryParams.append('type', type);
            if (category && category !== 'All') queryParams.append('category', category);
            if (startDate) queryParams.append('startDate', startDate);
            if (endDate) queryParams.append('endDate', endDate);
            if (page) queryParams.append('page', page);
            if (limit) queryParams.append('limit', limit);

            // Construct the URL with query parameters
            const url = `/transactions/getData?${queryParams.toString()}`;

            const response = await axiosInstance.get(url);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);
export const addTransaction = createAsyncThunk(
    'transactions/addTransaction',
    async (transactionData, thunkAPI) => {
        try {
            const response = await axiosInstance.post('/transactions', transactionData);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const updateTransaction = createAsyncThunk(
    'transactions/updateTransaction',
    async (transactionData, thunkAPI) => {
        try {
            const response = await axiosInstance.put(`/transactions/${transactionData.id}`, transactionData);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const deleteTransaction = createAsyncThunk(
    'transactions/deleteTransaction',
    async (id, thunkAPI) => {
        try {
            await axiosInstance.delete(`/transactions/${id}`);
            return id; // Return the ID of the deleted transaction
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

const transactionSlice = createSlice({
    name: 'transactions',
    initialState: {
        items: [],
        totalIncome: 0,
        totalExpense: 0,
        balance: 0,
        isLoading: false,
        error: null,
        totalPages: 1,
        currentPage: 1,
        totalItems: 0,
    },
    reducers: {
        // Can add a reducer to manually clear errors or transaction data
        clearTransactions: (state) => {
            state.items = [];
            state.totalIncome = 0;
            state.totalExpense = 0;
            state.balance = 0;
            state.isLoading = false;
            state.error = null;
            state.totalPages = 1;
            state.currentPage = 1;
            state.totalItems = 0;
        },
        clearTransactionError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch Transactions
            .addCase(fetchTransactions.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchTransactions.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = action.payload.transactions;
                state.totalPages = action.payload.totalPages;
                state.currentPage = action.payload.currentPage;
                state.totalItems = action.payload.totalItems;

                // Calculate summary from the fetched data
                state.totalIncome = action.payload.transactions
                    .filter(t => t.type === 'Income')
                    .reduce((sum, t) => sum + t.amount, 0);
                state.totalExpense = action.payload.transactions
                    .filter(t => t.type === 'Expense')
                    .reduce((sum, t) => sum + t.amount, 0);
                state.balance = state.totalIncome - state.totalExpense;
            })
            .addCase(fetchTransactions.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                state.items = []; // Clear items on error
                state.totalIncome = 0;
                state.totalExpense = 0;
                state.balance = 0;
            })
            // Add Transaction
            .addCase(addTransaction.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(addTransaction.fulfilled, (state, action) => {
                state.isLoading = false;
                // Optionally, re-fetch transactions or optimistically update state
                // For simplicity, we'll re-fetch in App component after save.
                // state.items.unshift(action.payload); // Add new transaction to top
            })
            .addCase(addTransaction.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // Update Transaction
            .addCase(updateTransaction.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateTransaction.fulfilled, (state, action) => {
                state.isLoading = false;
                // Optionally, re-fetch transactions or optimistically update state
                // state.items = state.items.map(t => t._id === action.payload._id ? action.payload : t);
            })
            .addCase(updateTransaction.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // Delete Transaction
            .addCase(deleteTransaction.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteTransaction.fulfilled, (state, action) => {
                state.isLoading = false;
                // Optionally, re-fetch transactions or optimistically update state
                // state.items = state.items.filter(t => t._id !== action.payload);
            })
            .addCase(deleteTransaction.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { clearTransactions, clearTransactionError } = transactionSlice.actions;
export default transactionSlice.reducer;