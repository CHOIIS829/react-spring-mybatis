import { configureStore } from "@reduxjs/toolkit";
import memberReducer from './member/memberSlice'

export const Store = configureStore({
    reducer:{
        member : memberReducer
    }
}) 
