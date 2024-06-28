import { configureStore } from "@reduxjs/toolkit";
import validationReducer from "./member/validationSlice";

export const Store = configureStore({
    reducer:{
        validation : validationReducer
    }
}) 
