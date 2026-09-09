

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "./api"; // Axios instance with base URL and credentials

// ===============================
// Thunks (Async Actions)
// ===============================

export const loginUser = createAsyncThunk(
    "user/login",
    async (formData, { rejectWithValue }) => {
      try {
        const response = await api.post("/login", formData, {
          withCredentials: true, // ✅ Allows sending and receiving cookies
        });
  
        const data = response.data;
        console.log(data, "user");
  
        // ✅ Store token in localStorage (Not recommended for auth security)
        if (data.token) {
          localStorage.setItem("token", data.token);
        }
  
        return data;
      } catch (error) {
        return rejectWithValue(
          error.response?.data || { message: "Something went wrong" }
        );
      }
    }
  );

  export const getUser = createAsyncThunk(
    "user/get-user",
    async (_, { rejectWithValue }) => {
      try {
        const response = await api.get("/getuser", {
          withCredentials: true,
        });
        const data = response.data;
        return data;
      } catch (error) {
        return rejectWithValue(
          error.response?.data || { message: "Something went wrong" }
        );
      }
    }
  );

  export const SendOtp = createAsyncThunk(
    "user/sendotp",
    async (email, { rejectWithValue }) => {
      try {
        const response = await api.post("/sendotp", email, {
          withCredentials: true, // ✅ Allows sending and receiving cookies
        });
  
        const data = response.data;
  
        return data;
      } catch (error) {
        return rejectWithValue(
          error.response?.data || { message: "Something went wrong" }
        );
      }
    }
  );

  export const Logout = createAsyncThunk(
    "user/logout",
    async (_, { rejectWithValue }) => {
      try {
        const response = await api.get("/logout", {
          withCredentials: true,
        });
  
        const data = response.data;
  
        return data;
      } catch (error) {
        return rejectWithValue(
          error.response?.data || { message: "Something went wrong" }
        );
      }
    }
  );

// 1. Fetch admin trade result
export const fetchAdminResult = createAsyncThunk(
    "admin/fetchAdminResult", 
    async (data, { rejectWithValue }) => {
        console.log("dataaaaaa",data)
    try {
        const response = await api.post("/admin/adminResult", data, { withCredentials: true });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Something went wrong");
    }
});

export const fetchAdminData = createAsyncThunk(
    "admin/admin/adminget", 
    async (_, { rejectWithValue }) => {
    try {
        const response = await api.get("/admin/adminget", { withCredentials: true });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Something went wrong");
    }
});

// 2. Increase user's money balance
export const increaseMoney = createAsyncThunk("admin/increaseMoney", async (data, { rejectWithValue }) => {
    try {
        const response = await api.post("/admin/increaseMoney", data, { withCredentials: true });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Something went wrong");
    }
});

// 3. Convert a user to admin
export const convertAdmin = createAsyncThunk("admin/convertAdmin", async (data, { rejectWithValue }) => {
    try {
        const response = await api.post("/admin/convertAdmin", data, { withCredentials: true });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Something went wrong");
    }
});

// 4. Create new agent
export const createAgent = createAsyncThunk("admin/createAgent", async (agentForm, { rejectWithValue }) => {
    try {
        const response = await api.post("/admin/createAgent", agentForm, { withCredentials: true });
        return response.data;
    } catch (error) {
        return rejectWithValue({ success: false, message: error?.response?.data?.message || "Something went wrong" });
    }
});

// 5. Fetch all admin data
export const fetchAllAdminData = createAsyncThunk("admin/fetchAllAdminData", async (_, { rejectWithValue }) => {
    try {
        const response = await api.post("/admin/allAdminData", {}, { withCredentials: true });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Something went wrong");
    }
});

// 6. Get pending bet list
export const getPendingBetList = createAsyncThunk("admin/pendingBetlist", async ({ pageno, pageto }, { rejectWithValue }) => {
    try {
        const response = await api.get(`/admin/pendingBetlist?pageno=${pageno}&pageto=${pageto}`, { withCredentials: true });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Something went wrong");
    }
});

// 7. Block or unblock a user
export const blockUser = createAsyncThunk("user/blockUser", async ({ userId, status }, { rejectWithValue }) => {
    try {
        const response = await api.post("/admin/blockUser", { userId, value: status });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Something went wrong");
    }
});

// 8. Approve or reject a withdrawal request
export const approveWithdrawal = createAsyncThunk("user/approveWithdrawal", async ({ orderId, status }, { rejectWithValue }) => {
    try {
        const response = await api.post("/admin/approveWithdrawal", { orderId, status });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Something went wrong");
    }
});

// 9. Approve or reject a recharge request (fixed typo in endpoint)
export const approveRecharge = createAsyncThunk("admin/approveRecharges", async ({ orderId, status }, { rejectWithValue }) => {
    try {
        const response = await api.post("/admin/approveRecharge", { orderId, status }); // fixed endpoint
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Something went wrong");
    }
});

// 10. Get Recharge list (paginated + optional userId)
export const getRechargeList = createAsyncThunk("admin/getRechargeList", async ({ pageno, pageto, userId = "" }, { rejectWithValue }) => {
    try {
        const response = await api.get(`/admin/rechargeList?pageno=${pageno}&pageto=${pageto}&userId=${userId}`, { withCredentials: true });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Something went wrong");
    }
});

// 11. Get Withdrawal list (paginated + optional userId)
export const getWithdrawalList = createAsyncThunk("admin/getWithdrawalList", async ({ pageno, pageto, userId = "" }, { rejectWithValue }) => {
    try {
        const response = await api.get(`/admin/withdrawalList?pageno=${pageno}&pageto=${pageto}&userId=${userId}`, { withCredentials: true });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Something went wrong");
    }
});

// ===============================
// Slice
// ===============================

const adminSlice = createSlice({
    name: "admin",
    initialState: {
        adminResult: null,
        userInfo: null,
        increaseMoneySuccess: false,
        convertAdminSuccess: false,
        blockUserSuccess: false,
        createAgentSuccess: null,
        createAgentMessage: "",
        adminResultData:null,
        PendingBetList: null,
        totalBets: 0,
        totalMoney: 0,
        totalMoneyUp: 0,
        totalMoneyDown: 0,
        allAdminData: null,
        loading: false,
        error: null,
        balance: 0,
        transactions: [],
        approveRechargeSuccess: false,

        // Add recharge & withdrawal sections
        recharge: {
            loading: false,
            data: [],
            length: 0,
            error: null,
        },
        withdrawal: {
            loading: false,
            data: [],
            length: 0,
            error: null,
        },
        
    },
    reducers: {
        // Optional: reset flags after operation
        resetAdminFlags(state) {
            state.increaseMoneySuccess = false;
            state.convertAdminSuccess = false;
            state.blockUserSuccess = false;
            state.createAgentSuccess = null;
            state.approveRechargeSuccess = false;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder

        .addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.data;
            state.userInfo = action.payload.data;
            // console.log("User Info:", state.userInfo);
          })
          .addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          })
                // Get user by ID
      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload.userInfo;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
            // Admin Result
            .addCase(fetchAdminResult.pending, (state) => { state.loading = true; })
            .addCase(fetchAdminResult.fulfilled, (state, action) => {
                state.loading = false;
                state.adminResult = action.payload;
            })
            .addCase(fetchAdminResult.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(fetchAdminData.pending, (state) => { state.loading = true; })
            .addCase(fetchAdminData.fulfilled, (state, action) => {
                state.loading = false;
                state.adminResultData = action.payload.data;
               
            })
            .addCase(fetchAdminData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })


            // Increase Money
            .addCase(increaseMoney.pending, (state) => { state.loading = true; })
            .addCase(increaseMoney.fulfilled, (state, action) => {
                state.loading = false;
                state.increaseMoneySuccess = action.payload.success;
            })
            .addCase(increaseMoney.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Convert Admin
            .addCase(convertAdmin.pending, (state) => { state.loading = true; })
            .addCase(convertAdmin.fulfilled, (state, action) => {
                state.loading = false;
                state.convertAdminSuccess = action.payload.success;
            })
            .addCase(convertAdmin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Block User
            .addCase(blockUser.pending, (state) => { state.loading = true; })
            .addCase(blockUser.fulfilled, (state, action) => {
                state.loading = false;
                state.blockUserSuccess = action.payload.success;
            })
            .addCase(blockUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Create Agent
            .addCase(createAgent.pending, (state) => { state.loading = true; })
            .addCase(createAgent.fulfilled, (state, action) => {
                state.createAgentSuccess = true;
                state.createAgentMessage = action.payload.message;
            })
            .addCase(createAgent.rejected, (state, action) => {
                state.createAgentSuccess = false;
                state.createAgentMessage = action.payload.message;
            })

            // All Admin Data
            .addCase(fetchAllAdminData.pending, (state) => { state.loading = true; })
            .addCase(fetchAllAdminData.fulfilled, (state, action) => {
                state.loading = false;
                state.allAdminData = action.payload;
            })
            .addCase(fetchAllAdminData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Pending Bet List
            .addCase(getPendingBetList.pending, (state) => { state.loading = true; })
            .addCase(getPendingBetList.fulfilled, (state, action) => {
             
                state.loading = false;
                state.PendingBetList = action.payload;
                state.totalBets = action.payload.length || 0;
                state.totalMoney = action.payload.totalMoney || 0;
                state.totalMoneyUp = action.payload.totalMoneyUp || 0;
                state.totalMoneyDown = action.payload.totalMoneyDown || 0;
            })
            .addCase(getPendingBetList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.PendingBetList=0;
                state.totalBets =0;
                state.totalMoney = 0;
                state.totalMoneyUp =  0;
                state.totalMoneyDown =  0;
            })

            // Approve/Reject Withdrawal
            .addCase(approveWithdrawal.pending, (state) => { state.loading = true; })
            .addCase(approveWithdrawal.fulfilled, (state, action) => {
                state.loading = false;
                state.transactions.push(action.payload);
            })
            .addCase(approveWithdrawal.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Approve/Reject Recharge
            .addCase(approveRecharge.pending, (state) => { state.loading = true; })
            .addCase(approveRecharge.fulfilled, (state) => {
                state.loading = false;
                state.approveRechargeSuccess = true;
            })
            .addCase(approveRecharge.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Recharge List
            .addCase(getRechargeList.pending, (state) => {
                state.recharge.loading = true;
                state.recharge.error = null;
            })
            .addCase(getRechargeList.fulfilled, (state, action) => {
                state.recharge.loading = false;
                state.recharge.data = action.payload.data;
                state.recharge.length = action.payload.length;
            })
            .addCase(getRechargeList.rejected, (state, action) => {
                state.recharge.loading = false;
                state.recharge.error = action.payload;
            })

            // Withdrawal List
            .addCase(getWithdrawalList.pending, (state) => {
                state.withdrawal.loading = true;
                state.withdrawal.error = null;
            })
            .addCase(getWithdrawalList.fulfilled, (state, action) => {
                state.withdrawal.loading = false;
                state.withdrawal.data = action.payload.data;
                state.withdrawal.length = action.payload.length;
            })
            .addCase(getWithdrawalList.rejected, (state, action) => {
                state.withdrawal.loading = false;
                state.withdrawal.error = action.payload;
            });
    },
});

// Export reducer and actions
export const { resetAdminFlags } = adminSlice.actions;
export default adminSlice.reducer;




