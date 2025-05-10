import { createSlice } from '@reduxjs/toolkit';
import { loginUser, registerUser, getUserProfile, updateUserProfile, searchUsers } from './authActions';

const initialState = {
    jwt: null,
    loading: false,
    error: null,
    user: null,
    users: [],
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                return { ...state, loading: true, error: null };
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                return { ...state, loading: false, jwt: action.payload, error: null };
            })
            .addCase(registerUser.rejected, (state, action) => {
                return { ...state, loading: false, error: action.payload };
            })
            .addCase(loginUser.pending, (state) => {
                return { ...state, loading: true, error: null };
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                return { ...state, loading: false, jwt: action.payload, error: null };
            })
            .addCase(loginUser.rejected, (state, action) => {
                return { ...state, loading: false, error: action.payload };
            })
            .addCase(getUserProfile.pending, (state) => {
                return { ...state, loading: true, error: null };
            })
            .addCase(getUserProfile.fulfilled, (state, action) => {
                return { ...state, loading: false, user: action.payload, error: null };
            })
            .addCase(getUserProfile.rejected, (state, action) => {
                return { ...state, loading: false, user: null, error: action.payload };
            })
            .addCase(updateUserProfile.pending, (state) => {
                return { ...state, loading: true, error: null };
            })
            .addCase(updateUserProfile.fulfilled, (state, action) => {
                return { ...state, loading: false, user: action.payload, error: null };
            })
            .addCase(updateUserProfile.rejected, (state, action) => {
                return { ...state, loading: false, error: action.payload };
            })
            .addCase(searchUsers.pending, (state) => {
                return { ...state, loading: true, error: null };
            })
            .addCase(searchUsers.fulfilled, (state, action) => {
                return { ...state, loading: false, users: action.payload, error: null };
            })
            .addCase(searchUsers.rejected, (state, action) => {
                return { ...state, loading: false, error: action.payload };
            });
    }
});

export default authSlice.reducer; 