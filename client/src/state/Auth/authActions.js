import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../../config/api";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (loginData, { rejectWithValue }) => {
    try {
      const {data} = await axios.post(
        `${API_BASE_URL}/auth/signup`,
        loginData.data
      );
      localStorage.setItem("token", data.token);
      console.log("Register Successful",data);
      return data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (loginData, { rejectWithValue }) => {
    try {
      const {data} = await axios.post(
        `${API_BASE_URL}/auth/signin`,
        loginData.data
      );
      localStorage.setItem("token", data.token);
      console.log("Login Successful", data);
      return data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
