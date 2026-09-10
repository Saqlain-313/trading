import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import api from "../api";

// ============================================================
// LOGIN
// ============================================================

export const loginUser =
  createAsyncThunk(
    "user/login",

    async (
      formData,
      { rejectWithValue }
    ) => {
      try {
        const response =
          await api.post(
            "/login",
            formData
          );

        const data =
          response.data;

        console.log(
          "LOGIN RESPONSE:",
          data
        );

        // ------------------------------------------------------
        // IMPORTANT
        // Backend Set-Cookie:
        // powerhit=JWT
        //
        // Browser automatically stores it.
        // JavaScript cannot read httpOnly cookie.
        // ------------------------------------------------------

        return data;

      } catch (error) {

        console.error(
          "LOGIN ERROR:",
          error.response?.data ||
            error.message
        );

        return rejectWithValue(
          error.response?.data || {
            message:
              "Something went wrong",
          }
        );
      }
    }
  );

// ============================================================
// REGISTER
// ============================================================

export const Register =
  createAsyncThunk(
    "user/signup",

    async (
      formData,
      { rejectWithValue }
    ) => {
      try {

        const response =
          await api.post(
            "/signup",
            formData
          );

        const data =
          response.data;

        console.log(
          "REGISTER RESPONSE:",
          data
        );

        return data;

      } catch (error) {

        console.error(
          "REGISTER ERROR:",
          error.response?.data ||
            error.message
        );

        return rejectWithValue(
          error.response?.data || {
            message:
              "Something went wrong",
          }
        );
      }
    }
  );

// ============================================================
// GET USER / PROFILE
// ============================================================

export const getUser =
  createAsyncThunk(
    "user/get-user",

    async (
      _,
      { rejectWithValue }
    ) => {

      try {

        console.log(
          "GET USER: REQUESTING /getuser WITH COOKIE"
        );

        const response =
          await api.get(
            "/getuser",
            {
              withCredentials: true,
            }
          );

        const data =
          response.data;

        console.log(
          "GET USER RESPONSE:",
          data
        );

        return data;

      } catch (error) {

        console.error(
          "GET USER ERROR:",
          error.response?.data ||
            error.message
        );

        return rejectWithValue(
          error.response?.data || {
            message:
              "Something went wrong",
          }
        );
      }
    }
  );

// ============================================================
// GET ADMIN
// ============================================================

export const getadmin =
  createAsyncThunk(
    "user/adminget",

    async (
      _,
      { rejectWithValue }
    ) => {

      try {

        const response =
          await api.get(
            "/admin/adminget",
            {
              withCredentials: true,
            }
          );

        const data =
          response.data;

        return data;

      } catch (error) {

        console.error(
          "GET ADMIN ERROR:",
          error.response?.data ||
            error.message
        );

        return rejectWithValue(
          error.response?.data || {
            message:
              "Something went wrong",
          }
        );
      }
    }
  );

// ============================================================
// FORGOT PASSWORD
// ============================================================

export const ForgetPass =
  createAsyncThunk(
    "user/forget",

    async (
      formData,
      { rejectWithValue }
    ) => {

      try {

        const response =
          await api.post(
            "/forgotpassword",
            formData
          );

        return response.data;

      } catch (error) {

        return rejectWithValue(
          error.response?.data || {
            message:
              "Something went wrong",
          }
        );
      }
    }
  );

// ============================================================
// SEND OTP
// ============================================================

export const SendOtp =
  createAsyncThunk(
    "user/sendotp",

    async (
      email,
      { rejectWithValue }
    ) => {

      try {

        const response =
          await api.post(
            "/sendotp",
            email
          );

        return response.data;

      } catch (error) {

        return rejectWithValue(
          error.response?.data || {
            message:
              "Something went wrong",
          }
        );
      }
    }
  );

// ============================================================
// UPDATE USER
// ============================================================

export const updateUser =
  createAsyncThunk(
    "user/update-user",

    async (
      formData,
      { rejectWithValue }
    ) => {

      try {

        const response =
          await api.put(
            "/update-user",
            formData,
            {
              withCredentials: true,
            }
          );

        return response.data;

      } catch (error) {

        return rejectWithValue(
          error.response?.data || {
            message:
              "Something went wrong",
          }
        );
      }
    }
  );

// ============================================================
// LOGOUT
// ============================================================

export const Logout =
  createAsyncThunk(
    "user/logout",

    async (
      _,
      { rejectWithValue }
    ) => {

      try {

        const response =
          await api.get(
            "/logout",
            {
              withCredentials: true,
            }
          );

        return response.data;

      } catch (error) {

        console.error(
          "LOGOUT ERROR:",
          error.response?.data ||
            error.message
        );

        return rejectWithValue(
          error.response?.data || {
            message:
              "Something went wrong",
          }
        );
      }
    }
  );

// ============================================================
// SUPPORT
// ============================================================

export const postSupport =
  createAsyncThunk(
    "support/postSupport",

    async (
      formData,
      { rejectWithValue }
    ) => {

      try {

        const response =
          await api.post(
            "/support",
            formData,
            {
              withCredentials: true,

              headers: {
                "Content-Type":
                  "multipart/form-data",
              },
            }
          );

        return response.data;

      } catch (error) {

        return rejectWithValue(
          error.response?.data || {
            message:
              error.message,
          }
        );
      }
    }
  );

// ============================================================
// INITIAL STATE
// ============================================================

const initialState = {
  user: null,
  userInfo: null,

  loading: false,
  error: null,

  singleadmin: null,
  useraddress: null,
  userDetail: null,
  admininfo: null,

  message: null,
  support: null,
};

// ============================================================
// SLICE
// ============================================================

const userSlice =
  createSlice({

    name: "user",

    initialState,

    reducers: {

      clearError: (
        state
      ) => {
        state.error = null;
      },

      clearUser: (
        state
      ) => {

        state.user = null;
        state.userInfo = null;
        state.userDetail = null;

      },
    },

    extraReducers: (
      builder
    ) => {

      // ======================================================
      // LOGIN
      // ======================================================

      builder

        .addCase(
          loginUser.pending,
          (state) => {

            state.loading = true;
            state.error = null;

          }
        )

        .addCase(
          loginUser.fulfilled,
          (
            state,
            action
          ) => {

            state.loading = false;

            state.user =
              action.payload?.data ||
              null;

            state.userInfo =
              action.payload?.data ||
              null;

            state.message =
              action.payload?.message ||
              null;

          }
        )

        .addCase(
          loginUser.rejected,
          (
            state,
            action
          ) => {

            state.loading = false;

            state.error =
              action.payload;

          }
        );

      // ======================================================
      // REGISTER
      // ======================================================

      builder

        .addCase(
          Register.pending,
          (state) => {

            state.loading = true;
            state.error = null;

          }
        )

        .addCase(
          Register.fulfilled,
          (
            state,
            action
          ) => {

            state.loading = false;

            state.user =
              action.payload?.data ||
              null;

            state.userInfo =
              action.payload?.data ||
              null;

            state.message =
              action.payload?.message ||
              null;

          }
        )

        .addCase(
          Register.rejected,
          (
            state,
            action
          ) => {

            state.loading = false;

            state.error =
              action.payload;

          }
        );

      // ======================================================
      // GET USER
      // ======================================================

      builder

        .addCase(
          getUser.pending,
          (state) => {

            state.loading = true;
            state.error = null;

          }
        )

        .addCase(
          getUser.fulfilled,
          (
            state,
            action
          ) => {

            state.loading = false;

            const profile =
              action.payload
                ?.userInfo ||
              action.payload
                ?.data ||
              null;

            state.userInfo =
              profile;

            state.user =
              profile;

            state.error = null;

            console.log(
              "PROFILE LOADED:",
              profile
            );

          }
        )

        .addCase(
          getUser.rejected,
          (
            state,
            action
          ) => {

            state.loading = false;

            state.user = null;
            state.userInfo = null;

            state.error =
              action.payload;

          }
        );

      // ======================================================
      // GET ADMIN
      // ======================================================

      builder

        .addCase(
          getadmin.pending,
          (state) => {

            state.loading = true;
            state.error = null;

          }
        )

        .addCase(
          getadmin.fulfilled,
          (
            state,
            action
          ) => {

            state.loading = false;

            state.admininfo =
              action.payload?.data ||
              null;

          }
        )

        .addCase(
          getadmin.rejected,
          (
            state,
            action
          ) => {

            state.loading = false;

            state.error =
              action.payload;

          }
        );

      // ======================================================
      // SUPPORT
      // ======================================================

      builder

        .addCase(
          postSupport.pending,
          (state) => {

            state.loading = true;
            state.error = null;

          }
        )

        .addCase(
          postSupport.fulfilled,
          (
            state,
            action
          ) => {

            state.loading = false;

            state.support =
              action.payload;

          }
        )

        .addCase(
          postSupport.rejected,
          (
            state,
            action
          ) => {

            state.loading = false;

            state.error =
              action.payload;

          }
        );

      // ======================================================
      // LOGOUT
      // ======================================================

      builder

        .addCase(
          Logout.fulfilled,
          (state) => {

            state.user = null;
            state.userInfo = null;
            state.userDetail = null;

            state.useraddress = null;
            state.message = null;
            state.error = null;

          }
        )

        .addCase(
          Logout.rejected,
          (
            state,
            action
          ) => {

            state.user = null;
            state.userInfo = null;

            state.error =
              action.payload;

          }
        );
    },
  });

// ============================================================
// EXPORT
// ============================================================

export const {
  clearError,
  clearUser,
} = userSlice.actions;

export default userSlice.reducer;