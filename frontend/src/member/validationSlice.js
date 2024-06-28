import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	validState: {
    	password: false,
    	passwordConfirm: false,
    	email: false,
    	name: false,
    },
    messageState: {
    	emailMessage: "",
    	passwordMessage: "",
    	passwordConfirmMessage: "",
    	idDuplicationMessage: "",
    },
    error: null,
};

const validationReducer = createSlice({
	name : "validationReducer",
	initialState,
	reducer: {
		updateValidState : (state, action) => {
			const { name, value } = action.payload;
			state.validState[name] = value;
		},
		updateMessageState : (state, action) => {
			const { name, message } = action.payload;
			state.messageState[name] = message;
		},
	}
});

export const { updateValidState, updateMessageState, updateData } = validationReducer.actions;

export default validationReducer.reducer;