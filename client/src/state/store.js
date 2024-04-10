import {createSlice} from '@reduxjs/toolkit';
import { loginUser, registerUser, getUserProfile, updateUserProfile, searchUsers } from './Auth/authActions';

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
    extraReducers: (builder)=>{
        builder.addCase(registerUser.pending,(state,action)=>{
            return {...state,loading:true,error:null};
        });
        builder.addCase(registerUser.fulfilled,(state,action)=>{
            return {...state,loading:false,jwt:action.payload,error:null};
        });
        builder.addCase(registerUser.rejected,(state,action)=>{
            return {...state,loading:false,error:action.payload};
        });
        builder.addCase(loginUser.pending, (state, action) => {
          return { ...state, loading: true, error: null };
        });
        builder.addCase(loginUser.fulfilled, (state, action) => {
          return { ...state, loading: false, jwt: action.payload, error: null };
        });
        builder.addCase(loginUser.rejected, (state, action) => {
          return { ...state, loading: false, error: action.payload };
        });
        builder.addCase(getUserProfile.pending, (state, action) => {
          return { ...state, loading: true, error: null };
        });
        builder.addCase(getUserProfile.fulfilled, (state, action) => {
          return { ...state, loading: false, user: action.payload, error: null };
        });
        builder.addCase(getUserProfile.rejected, (state, action) => {
          return { ...state, loading: false, error: action.payload };
        });
        builder.addCase(updateUserProfile.pending, (state, action) => {
          return { ...state, loading: true, error: null };
        });
        builder.addCase(updateUserProfile.fulfilled, (state, action) => {
          return { ...state, loading: false, user: action.payload, error: null };
        });
        builder.addCase(updateUserProfile.rejected, (state, action) => {
          return { ...state, loading: false, error: action.payload };
        }),
        builder.addCase(searchUsers.pending, (state, action) => {
          return { ...state, loading: true, error: null };
        }),
        builder.addCase(searchUsers.fulfilled, (state, action) => {
          return { ...state, loading: false, users: action.payload, error: null };
        }),
        builder.addCase(searchUsers.rejected, (state, action) => {
          return { ...state, loading: false, error: action.payload };
        });
    },
});

export default authSlice.reducer;