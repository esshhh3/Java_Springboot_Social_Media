import {createSlice} from '@reduxjs/toolkit';
import { loginUser, registerUser } from './Auth/authActions';

const initialState = {
    jwt: null,
    loading: false,
    error: null,
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
    },
});

export default authSlice.reducer;