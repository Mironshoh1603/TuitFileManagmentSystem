import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import * as api from "../api";
export const login = createAsyncThunk(
   "auth/login",
   async ({ formValue, navigate, toast }, { rejectWithValue }) => {
      try {
         const response = await api.SignIn(formValue);
         toast.success("Login Successfuly");
         navigate("/");
         return response.data;
      } catch (error) {
         return rejectWithValue(error.response.data);
      }
   }
);

const authSlice = createSlice({
   name: "auth",
   initialState: {
      user: null,
      error: "",
      loading: false,
   },
   reducers: {
      setuser: (state, action) => {
         state.user = action.payload;
      },
      setlogout: (state, action) => {
         localStorage.clear();
         state.user = null;
      },
   },
   extraReducers: {
      [login.pending]: (state, action) => {
         state.loading = true;
      },
      [login.fulfilled]: (state, action) => {
         state.loading = false;
         state.user = action.payload;
         localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
         console.log(action.payload);
      },
      [login.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.message;
      },
   },
});
export const { setuser, setlogout } = authSlice.actions;

export default authSlice.reducer;
