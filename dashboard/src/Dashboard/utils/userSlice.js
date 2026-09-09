import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/api";

// Async Thunks for each route
export const getAllUser = createAsyncThunk('getalluser', async (_, { rejectWithValue }) => {
    try {
        const { data } = await api.get(`/admin/allUsers`, { withCredentials: true });
        return data.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Something went wrong");
    }
});

//Agent 
export const allAgentUser = createAsyncThunk('getAllAgent', async (_, { rejectWithValue }) => {
  try {
      const { data } = await api.post(`/admin/allAgent`, { withCredentials: true });
      return data.data;
  } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
  }
});

export const getBetList = createAsyncThunk(
    'admin/bet_list',
    async ({ pageno, pageto }, { rejectWithValue }) => {
        try {
            const response = await api.get(`/admin/betlist?pageno=${pageno}&pageto=${pageto}`, { withCredentials: true });
            console.log("responseresponse",response);
            
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Something went wrong");
        }
    }
);

export const getPendingBetList = createAsyncThunk('admin/pendingBetlist', async (_, { rejectWithValue }) => {
    try {
        const response = await api.get(`/admin/pendingBetlist`, { withCredentials: true });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Something went wrong");
    }
});

export const postUserInfo = createAsyncThunk('admin/userInfo', async (userId, { rejectWithValue }) => {
    try {
        const response = await api.post(`/admin/userInfo`, { userId }, { withCredentials: true });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Something went wrong");
    }
});

export const postUserRecharge = createAsyncThunk(
  "admin/userRecharge",
  async ({ userId, pageno, pageto }, { rejectWithValue }) => {
    console.log("userId, pageno, pageto",userId, pageno, pageto)
      try {
          const response = await api.post(
              `/admin/userRecharge?pageno=${pageno}&pageto=${pageto}`,
              { userId },
              { withCredentials: true }
          );
          console.log("API Response:", response.data); // Log the response
          return response.data;
      } catch (error) {
          console.error("API Error:", error.response?.data || error.message); // Log the error
          return rejectWithValue(error.response?.data || "Something went wrong");
      }
  }
);
export const postUserWithdrawal = createAsyncThunk('admin/userWithdrawal', async (withdrawalData, { rejectWithValue }) => {
    try {
        const response = await api.post(`/admin/userWithdrawal`, withdrawalData, { withCredentials: true });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Something went wrong");
    }
});

export const postUserBet = createAsyncThunk('admin/userBet', async (userId, { rejectWithValue }) => {
    try {
        const response = await api.post(`/admin/userBet`, { userId }, { withCredentials: true });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Something went wrong");
    }
});

export const getPendingRecharge = createAsyncThunk('admin/pendingRecharge', async (_, { rejectWithValue }) => {
    try {
        const response = await api.get(`/admin/pendingRecharge`, { withCredentials: true });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Something went wrong");
    }
});

export const getRechargeList = createAsyncThunk('admin/rechargeList', async (userId, { rejectWithValue }) => {
    try {
        const response = await api.get(`/admin/rechargeList?userId=${userId}`, { withCredentials: true });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Something went wrong");
    }
});

export const getPendingWithdrawal = createAsyncThunk('admin/pendingWithdrawal', async (_, { rejectWithValue }) => {
    try {
        const response = await api.get(`/admin/pendingWithdrawal`, { withCredentials: true });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Something went wrong");
    }
});

export const getWithdrawalList = createAsyncThunk('admin/withdrawalList', async (_, { rejectWithValue }) => {
    try {
        const response = await api.get(`/admin/withdrawalList`, { withCredentials: true });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Something went wrong");
    }
});

export const postApproveWithdrawal = createAsyncThunk('admin/approveWithdrawal', async (withdrawalData, { rejectWithValue }) => {
    try {
        const response = await api.post(`/admin/approveWithdrawal`, withdrawalData, { withCredentials: true });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Something went wrong");
    }
});

// Slices for each route
const userSlice = createSlice({
    name: "admin",
    initialState: {
        loading: false,
        error: null,
        betList: [],
        pendingBetList: [],
        userInfo: null,
        rechargeList: [],
        withdrawalList: [],
        pendingRecharge: [],
        pendingWithdrawal: [],
        userBet: [],
        allUsers: [],
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllUser.fulfilled, (state, action) => {
                state.loading = false;
                state.allUsers = action.payload;
            })
            .addCase(getAllUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })




            .addCase(allAgentUser.pending, (state) => {
              state.loading = true;
              state.error = null;
          })
          .addCase(allAgentUser.fulfilled, (state, action) => {
              state.loading = false;
              state.AllAgent = action.payload;
          })
          .addCase(allAgentUser.rejected, (state, action) => {
              state.loading = false;
              state.error = action.payload;
          })
          




            .addCase(getBetList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getBetList.fulfilled, (state, action) => {
                state.loading = false;
                state.betList = action.payload.data;
            })
            .addCase(getBetList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getPendingBetList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getPendingBetList.fulfilled, (state, action) => {
                state.loading = false;
                state.pendingBetList = action.payload.data;
            })
            .addCase(getPendingBetList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(postUserInfo.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(postUserInfo.fulfilled, (state, action) => {
                state.loading = false;
                state.userInfo = action.payload.data;
            })
            .addCase(postUserInfo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(postUserRecharge.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(postUserRecharge.fulfilled, (state, action) => {
                state.loading = false;
                state.rechargeList = action.payload.data;
            })
            .addCase(postUserRecharge.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(postUserWithdrawal.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(postUserWithdrawal.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(postUserWithdrawal.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(postUserBet.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(postUserBet.fulfilled, (state, action) => {
                state.loading = false;
                state.userBet = action.payload.data;
            })
            .addCase(postUserBet.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;



            })
            .addCase(getPendingRecharge.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getPendingRecharge.fulfilled, (state, action) => {
                state.loading = false;
                state.pendingRecharge = action.payload.data;
            })
            .addCase(getPendingRecharge.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;




            })
            .addCase(getRechargeList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getRechargeList.fulfilled, (state, action) => {
                state.loading = false;
                state.rechargeList = action.payload.data;
            })
            .addCase(getRechargeList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getPendingWithdrawal.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getPendingWithdrawal.fulfilled, (state, action) => {
                state.loading = false;
                state.pendingWithdrawal = action.payload.data;
            })
            .addCase(getPendingWithdrawal.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getWithdrawalList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getWithdrawalList.fulfilled, (state, action) => {
                state.loading = false;
                state.withdrawalList = action.payload.data;
            })
            .addCase(getWithdrawalList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(postApproveWithdrawal.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(postApproveWithdrawal.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(postApproveWithdrawal.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default userSlice.reducer;