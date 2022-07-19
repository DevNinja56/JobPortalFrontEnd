import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserDecodeTokken {
    email: string;
    exp: number;
    fullName: string;
    iat: number;
    id: string;
}
interface UserTokkenState {
    userTokken: UserDecodeTokken;
}
interface UserTokkenStateAction {
    type: string;
    payload: UserDecodeTokken;
}
const initialState: UserTokkenState = {
    userTokken: {
        email: 'example@mail.com',
        exp: 123,
        fullName: 'User Name',
        iat: 123,
        id: 'string-I'
    }
};

const UserTokkenSlice = createSlice({
    name: "UserInfoTokken",
    initialState,
    reducers: {
        SetUserTokken(state: UserTokkenState, action: UserTokkenStateAction) {
            // console.log(action);
            state.userTokken = action?.payload;
        },
    },
});

export const { SetUserTokken } = UserTokkenSlice.actions;
export default UserTokkenSlice.reducer;