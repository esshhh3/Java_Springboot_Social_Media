import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL, api, setAuthToken } from "../../config/api";

// Register User
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (loginData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${API_BASE_URL}/auth/signup`,
        loginData.data
      );
      localStorage.setItem("token", data.token);
      setAuthToken(data.token);
      console.log("Register Successful", data);
      return data;
    } catch (error) {
      console.log(error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Login User
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (loginData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${API_BASE_URL}/auth/signin`,
        loginData.data
      );
      localStorage.setItem("token", data.token);
      setAuthToken(data.token);
      console.log("Login Successful", data);
      return data;
    } catch (error) {
      console.log(error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Get Profile (authenticated)
export const getUserProfile = createAsyncThunk(
  "auth/getUserProfile",
  async (jwt, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/users/profile`);
      console.log("Profile Fetched", data);
      return data;
    } catch (error) {
      console.log(error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Update Profile (authenticated)
export const updateUserProfile = createAsyncThunk(
  "auth/updateUserProfile",
  async (reqData, { rejectWithValue }) => {
    try {
      const { data } = await api.put(`/users`, reqData);
      console.log("Profile Updated", data);
      return data;
    } catch (error) {
      console.log(error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Search Users (authenticated)
export const searchUsers = createAsyncThunk(
  "auth/searchUsers",
  async (query, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/users/search?query=${query}`);
      console.log("Users Searched", data);
      return data;
    } catch (error) {
      console.log(error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
