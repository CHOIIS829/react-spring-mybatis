import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getMember } from "../api/authApi";


//this will fetch user info if token excist
export const fetchMemberData = createAsyncThunk(
    'user/fetchUserData',
    async (_, { rejectWithValue }) => {
      try {
        const response = await getMember();
        return response.data;
      } catch (error : any) {
        return rejectWithValue(error.response.data);
      }
    }
);

const memberSlice = createSlice({
    name : 'member',
    initialState: {
        member : null,
        loading : false, 
        error : null         
    },
    reducers: {

    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchMemberData.pending, (state)=>{
          state.loading = true;
          state.error = null;
        })
    }
})

