import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const MemberReducer = createSlice({
  name: "member",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(memberLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(memberLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(memberLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

const server = "http://localhost:8080"


export const memberLogin = createAsyncThunk("login",  async(data) => {
  const response = await axios.post(server + '/api/member/login', data)
  return response;
});

export default MemberReducer.reducer;
