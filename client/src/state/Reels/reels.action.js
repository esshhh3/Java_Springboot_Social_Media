import { createAsyncThunk } from '@reduxjs/toolkit';
import { api, API_BASE_URL } from "../../config/api";

// Create Reel
export const createReel = createAsyncThunk(
    "reels/createReel",
    async (reelData, { rejectWithValue }) => {
        try {
            const { data } = await api.post(
                `${API_BASE_URL}/api/reels`,
                reelData.data
            );
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Get All Reels
export const getAllReels = createAsyncThunk(
    "reels/getAllReels",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await api.get(`${API_BASE_URL}/api/reels`);
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Get User Reels
export const getUserReels = createAsyncThunk(
    "reels/getUserReels",
    async (userId, { rejectWithValue }) => {
        try {
            const { data } = await api.get(`${API_BASE_URL}/api/reels/user/${userId}`);
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Like Reel
export const likeReel = createAsyncThunk(
    "reels/likeReel",
    async (reelId, { rejectWithValue }) => {
        try {
            const { data } = await api.put(`${API_BASE_URL}/api/reels/like/${reelId}`);
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Delete Reel
export const deleteReel = createAsyncThunk(
    "reels/deleteReel",
    async (reelId, { rejectWithValue }) => {
        try {
            const { data } = await api.delete(`${API_BASE_URL}/api/reels/${reelId}`);
            return { id: reelId, ...data };
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
); 