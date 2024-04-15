import { api, API_BASE_URL } from "../../config/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createMessage = createAsyncThunk(
  "message/createMessage",
  async (reqData, { rejectWithValue }) => {
    try {
      const { data } = await api.post(
        `${API_BASE_URL}/api/messages/chat/${reqData.message.chatId}`,
        reqData.message
      );
      console.log("Message Created", data);
      reqData.sendMessageToServer(data);
      return data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const createChat = createAsyncThunk(
  "message/createChat",
  async (chat, { rejectWithValue }) => {
    try {
      const { data } = await api.post(`${API_BASE_URL}/api/chats`, chat);
      console.log("Chat Created", data);
      return data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllChats = createAsyncThunk(
  "message/getAllChats",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`${API_BASE_URL}/api/chats`);
      console.log("Chats Fetched", data);
      return data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
