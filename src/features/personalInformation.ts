import { createSlice } from "@reduxjs/toolkit";

export const personalInformationSlice = createSlice({
    name: "personalInformation",
    initialState: { value: {firstName: "", lastName: "", email: "", prefix: "+421", phone: ""} },
    reducers: {
        submitPersonal: (state, action) => {
            state.value = action.payload;
        },
    }
})

export const {submitPersonal} = personalInformationSlice.actions;

export default personalInformationSlice.reducer;