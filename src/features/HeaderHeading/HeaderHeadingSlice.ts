import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface HeaderHeadingState {
    value: string;
}
interface changeHeadingAction {
    type: string;
    payload: string
}
const initialState: HeaderHeadingState = {
    value: 'Route Heading',
};

const HeaderHeadingSlice = createSlice({
    name: "headerHeading",
    initialState,
    reducers: {
        changeHeading(state: HeaderHeadingState, action: changeHeadingAction) {
            // console.log(action);
            state.value = action?.payload;
        },
    },
});

export const { changeHeading } = HeaderHeadingSlice.actions;
export default HeaderHeadingSlice.reducer;