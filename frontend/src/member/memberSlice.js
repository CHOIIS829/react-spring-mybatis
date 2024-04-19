import { createSlice } from "@reduxjs/toolkit";

const init = [{
        id : "gg@hotmail.com",
        pwd : "1234"
    }
]

export const MemberSlice = createSlice({
    name : 'member',
    init,
    reducers: {
    }
});

export default MemberSlice.reducer