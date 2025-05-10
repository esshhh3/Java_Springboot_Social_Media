import { createSlice } from '@reduxjs/toolkit';
import { createReel, getAllReels, getUserReels, likeReel, deleteReel } from './reels.action';

const initialState = {
    reels: [],
    userReels: [],
    loading: false,
    error: null
};

const reelsSlice = createSlice({
    name: 'reels',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Create Reel
            .addCase(createReel.pending, (state) => {
                state.loading = true;
            })
            .addCase(createReel.fulfilled, (state, action) => {
                state.loading = false;
                state.reels.unshift(action.payload);
            })
            .addCase(createReel.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Get All Reels
            .addCase(getAllReels.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllReels.fulfilled, (state, action) => {
                state.loading = false;
                state.reels = action.payload;
            })
            .addCase(getAllReels.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Get User Reels
            .addCase(getUserReels.pending, (state) => {
                state.loading = true;
            })
            .addCase(getUserReels.fulfilled, (state, action) => {
                state.loading = false;
                state.userReels = action.payload;
            })
            .addCase(getUserReels.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Like Reel
            .addCase(likeReel.fulfilled, (state, action) => {
                const index = state.reels.findIndex(reel => reel.id === action.payload.id);
                if (index !== -1) {
                    state.reels[index] = action.payload;
                }
                const userIndex = state.userReels.findIndex(reel => reel.id === action.payload.id);
                if (userIndex !== -1) {
                    state.userReels[userIndex] = action.payload;
                }
            })
            // Delete Reel
            .addCase(deleteReel.fulfilled, (state, action) => {
                state.reels = state.reels.filter(reel => reel.id !== action.payload.id);
                state.userReels = state.userReels.filter(reel => reel.id !== action.payload.id);
            });
    }
});

export default reelsSlice.reducer; 