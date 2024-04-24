import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { memberApi } from "../api/memberApi";

export const MemberSlice = createSlice({
  name: "member",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMember.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMember.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchMember.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
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

export const fetchMember = createAsyncThunk("testing", async () => {
  const response = memberApi.memberGet();
  console.log(response);
});

export const memberLogin = createAsyncThunk("login",  (data) => {
  const response = memberApi.memberLogin(data);
  console.log(response);
});

export default MemberSlice.reducer;