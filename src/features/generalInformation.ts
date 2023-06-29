import { createSlice } from "@reduxjs/toolkit";

export const generalInformationSlice = createSlice({
    name: "personalInformation",
    initialState: { value: {helpType: "", shelter: {id: NaN, name: ""}, amount: 5} },
    reducers: {
        submitGeneral: (state, action) => {
            state.value = action.payload;
        },
    }
})

export const {submitGeneral} = generalInformationSlice.actions;

export default generalInformationSlice.reducer;