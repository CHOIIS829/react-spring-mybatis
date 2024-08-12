import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getMember } from "../api/authApi";
import { MemberState, Member } from "../types/member";


const initialState: MemberState = {
  member: null,
  loading: false,
  error: null,
};

export const fetchMemberData = createAsyncThunk<
  Member, 
  void, 
  { rejectValue: string } 
>(
  'api/member',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getMember(); 
      console.log(response);
      return response.data as Member;   
    } catch (error: any) {
      const errorMessage = error.response?.data || "Failed to fetch member data";
      return rejectWithValue(errorMessage);
    }
  }
);

const memberSlice = createSlice({
  name: 'member',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMemberData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMemberData.fulfilled, (state, action: PayloadAction<Member>) => {
        state.loading = false;
        state.member = action.payload;
      })
      .addCase(fetchMemberData.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch member data";
      });
  },
});

export default memberSlice.reducer;
