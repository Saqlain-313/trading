

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "./api"; // Axios instance with base URL and credentials

export const createPromocode = createAsyncThunk(
    "admin/createPromocode", 
    async ({code,percent,deposit}, { rejectWithValue }) => {
    try {
        const response = await api.post("/admin/createPromocode", {code,percent,deposit}, { withCredentials: true });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Something went wrong");
    }
});
export const getPromocode = createAsyncThunk(
    "admin/getPromocode", 
    async (_, { rejectWithValue }) => {
    try {
        const response = await api.get("/admin/getPromocode", { withCredentials: true });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Something went wrong");
    }
});

// ===============================

const promoCodeSlice = createSlice({
    name: "promo",
    initialState: {
        successMessage:null,
        loading: false,
        length: 0,
        error: null,
        promocodeData:null
   
        
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
            .addCase(createPromocode.pending, (state) => { state.loading = true;})

            .addCase(createPromocode.fulfilled, (state, action) => {
                state.loading = false;
                state.adminResult = action.payload;
            })
            .addCase(createPromocode.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(getPromocode.pending, (state) => { state.loading = true;})

            .addCase(getPromocode.fulfilled, (state, action) => {
                state.loading = false;
                state.promocodeData = action.payload.data;
            })
            .addCase(getPromocode.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
     },
});

// Export reducer and actions
export const { resetPromoFlags } = promoCodeSlice.actions;
export default promoCodeSlice.reducer;




