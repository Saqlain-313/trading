

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "./api"; // Axios instance with base URL and credentials

export const createLeaderBoard = createAsyncThunk(
    "admin/createLeaderBoard", 
    async (formData, { rejectWithValue }) => {
    try {
        const response = await api.post("/admin/addLeaderboard", formData, { withCredentials: true });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Something went wrong");
    }
});
export const getLeaderBoard = createAsyncThunk(
    "admin/getLeaderBoard", 
    async (_, { rejectWithValue }) => {
    try {
        const response = await api.get("/admin/getLeader", { withCredentials: true });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Something went wrong");
    }
});


// ===============================

const leaderSlice = createSlice({
    name: "leader",
    initialState: {
        successMessage:null,
        loading: false,
        length: 0,
        error: null,
        LeaderBoardData:null       
    },
    reducers: {
        // Optional: reset flags after operation
        resetAdminFlags(state) {
            state.successMessage = false;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Admin Result
            .addCase(createLeaderBoard.pending, (state) => { state.loading = true;})

            .addCase(createLeaderBoard.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(createLeaderBoard.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getLeaderBoard.pending, (state) => { state.loading = true;})

            .addCase(getLeaderBoard.fulfilled, (state, action) => {
                state.loading = false;
                state.LeaderBoardData = action.payload.data;
            })
            .addCase(getLeaderBoard.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
             
            })

       
     },
});

// Export reducer and actions
export const { resetPromoFlags } = leaderSlice.actions;
export default leaderSlice.reducer;




